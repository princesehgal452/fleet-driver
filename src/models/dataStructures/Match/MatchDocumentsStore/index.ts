import { action, computed, observable } from 'mobx';
import { IMatchDocuments } from '../../../interfaces/shared/IMatchDocuments';
import Match from '../index';
import StoreBase from '../../../../DriverApp/store/StoreBase';
import MatchDocumentStore from './MatchDocumentStore';
import { DocumentKeys, DocumentStatus } from '../../../../services/constants';


export default class MatchDocumentsStore extends StoreBase {
  @observable tender?: MatchDocumentStore;
  @observable invoice?: MatchDocumentStore;
  @observable pod?: MatchDocumentStore;

  @observable parentMatch: Match;

  constructor(parentMatch: Match, documents?: IMatchDocuments) {
    super();
    this.parentMatch = parentMatch;
    if (documents && Object.keys(documents).length > 0) {
      const { tender, invoice, pod } = documents;
      if (tender) {
        this.tender = new MatchDocumentStore(tender, DocumentKeys.TENDER, this);
      }
      if (invoice) {
        this.invoice = new MatchDocumentStore(invoice, DocumentKeys.INVOICE, this);
      }
      if (pod) {
        this.pod = new MatchDocumentStore(pod, DocumentKeys.POD, this);
      }
    }
  }

  @computed get hasSomeDocuments() {
    return Boolean(this.tender || this.invoice || this.pod);
  }

  @action.bound
  addMatchDocumentStore(documentKey: DocumentKeys) {
    this[documentKey] = new MatchDocumentStore({ url: '', status: DocumentStatus.PENDING }, documentKey, this);
    return this[documentKey];
  }

  @action.bound
  downloadAllDocuments = async () => {
    return Promise.all([
      this.tender && this.tender.downloadDocument(),
      this.invoice && this.invoice.downloadDocument(),
      this.pod && this.pod.downloadDocument(),
    ]);
  };
}

