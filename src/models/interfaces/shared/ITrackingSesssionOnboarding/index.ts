import { ITrackingCarrier } from '../ITrackingCarrier';
import { ITrackingIntegration } from '../ITrackingSession';


export interface IPartnerOnboarding {
  onboardingId: string;
  status: 'ACCEPTED' | 'REJECTED' | 'PENDING';
  carrier: ITrackingCarrier;
  integration: ITrackingIntegration;
  timestamp: number;
}
