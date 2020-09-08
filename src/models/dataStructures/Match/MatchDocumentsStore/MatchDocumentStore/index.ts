import { action, computed, observable } from 'mobx';
import { IMatchDocument } from '../../../../interfaces/shared/IMatchDocuments';
import MatchDocumentsStore from '..';
import StoreBase from '../../../../../DriverApp/store/StoreBase';
import { DocumentKeys, DocumentStatus } from '../../../../../services/constants';
import { getMatchDocument } from '../../../../../services/APIServices/GetMatchDocument';
import { patchMatchDocumentAction } from '../../../../../services/APIServices/PatchMatchDocumentAction';
import { putMatchDocuments } from '../../../../../services/APIServices/PutMatchDocuments';
import { blobToFile } from '../../../../../utils/utility';


export default class MatchDocumentStore extends StoreBase {
  @observable url: string;
  @observable status: DocumentStatus;
  @observable documentKey: DocumentKeys;
  @observable blob?: Blob | undefined;
  @observable blobFile?: File;
  @observable objectURL?: string;
  @observable type?: string;
  @observable parentMatchDocumentsStore: MatchDocumentsStore;

  constructor(matchDocument: IMatchDocument, documentKey: DocumentKeys, parentMatchDocumentsStore: MatchDocumentsStore) {
    super();
    this.url = matchDocument.url;
    this.status = matchDocument.status;
    this.documentKey = documentKey;
    this.parentMatchDocumentsStore = parentMatchDocumentsStore;
  }

  @computed get pending() {
    return this.status === DocumentStatus.PENDING;
  }

  @computed get accepted() {
    return this.status === DocumentStatus.ACCEPTED;
  }

  @computed get rejected() {
    return this.status === DocumentStatus.REJECTED;
  }

  // @computed get hadDocument() {
  //   const interaction = this.parentMatchDocumentsStore.parentMatch.getFirstInteractionOfType(new Set([InteractionEventTypes.DOC_SAVE]));
  //   if (interaction && interaction.metadata) {
  //     return interaction.metadata.type === this.documentKey;
  //   }
  //   return false;
  // }

  @computed get hasDocument() {
    return Boolean(this.blob && this.objectURL && this.type);
  }

  @action.bound
  setDownloadedDocument(blob: Blob) {
    this.blob = blob;
    this.objectURL = URL.createObjectURL(blob);
    const type = this.url.toLowerCase().split('.').pop(); // get extension
    this.type = type;
    if (blob && type) {
      this.blobFile = blobToFile(blob, type);
    }
  }

  @action.bound
  setStatus(newStatus: DocumentStatus) {
    this.status = newStatus;
  }

  @action.bound
  setURL(newURL: string) {
    this.url = newURL;
  }

  @action.bound
  downloadDocument = async () => {
    // Dont download this document has already been downloaded.
    if (this.hasDocument) {
      return;
    }
    const { parentMatch: { matchId, rootStore: { snackbarStore: { enqueueSnackbarStore } } } } = this.parentMatchDocumentsStore;
    try {
      this.setLoading(true);
      const blob = await getMatchDocument(this.documentKey, matchId);
      this.setDownloadedDocument(blob);
    } catch (error) {
      enqueueSnackbarStore(
        'Sorry, there was an error downloading your document', { variant: 'error' });
    } finally {
      this.setLoading(false);
    }
  };

  @action.bound
  uploadMatchDocument = async (file: File) => {
    const { parentMatch: { matchId, rootStore: { snackbarStore: { enqueueSnackbarStore } } } } = this.parentMatchDocumentsStore;
    try {
      this.setLoading(true);
      const matchData = await putMatchDocuments(matchId, this.documentKey, file);
      const newDocumentObject = matchData.documents && matchData.documents[this.documentKey];
      if (newDocumentObject) {
        const blob = new Blob([file], { type: file.name.toLowerCase().split('.').pop() });
        this.setDownloadedDocument(blob);
        this.setStatus(newDocumentObject.status);
        this.setURL(newDocumentObject.url);
      }
    } catch (error) {
      enqueueSnackbarStore(
        `Sorry, there was an error uploading your ${this.documentKey}`, { variant: 'error' });
    } finally {
      this.setLoading(false);
    }
  };

  @action.bound
  actionDocument = async (action: 'accept' | 'reject') => {
    const { parentMatch: { matchId, rootStore: { snackbarStore: { enqueueSnackbarStore } } } } = this.parentMatchDocumentsStore;
    try {
      this.setLoading(true);
      const matchData = await patchMatchDocumentAction(this.documentKey, matchId, action);
      const newDocumentObject = matchData.documents && matchData.documents[this.documentKey];
      if (newDocumentObject) {
        this.setStatus(newDocumentObject.status);
      }
    } catch (error) {
      enqueueSnackbarStore(
        `Sorry, there was an error ${action}ing your document`, { variant: 'error' });
      throw error;
    } finally {
      this.setLoading(false);
    }
  };
}
