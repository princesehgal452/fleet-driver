import { DocumentKeys, InteractionEventTypes } from '../../../../services/constants';


interface IInteractionMetadata {
  requestedTimestamp?: number;
  type?: DocumentKeys;
  url?: string;
}

export interface IInteraction {
  eventType: InteractionEventTypes;
  userType: 'driver' | 'broker';
  matchId: string;
  displayName: string;
  firebaseUID: string;
  mcNumber: string;
  email: string;
  phone: string;
  timestamp: number;
  price?: number;
  unit?: string;
  flatRate?: boolean;
  truckId?: string;
  metadata?: IInteractionMetadata;
}
