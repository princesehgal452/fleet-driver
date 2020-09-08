import { DocumentStatus } from '../../../../services/constants';


export interface IMatchDocument {
  url: string;
  status: DocumentStatus;
}

export interface IMatchDocuments {
  tender?: IMatchDocument;
  invoice?: IMatchDocument;
  pod?: IMatchDocument;
}
