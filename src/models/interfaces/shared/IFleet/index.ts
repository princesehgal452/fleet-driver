export interface IFleet {
  carrierName: string;
  freightDispatcherEnabled: boolean;
  address: string[];
  dotNumber?: string;
  geotabIntegration?: IGeotabIntegration;
}

interface IGeotabIntegrationServiceAccount {
  password: number;
  server: string;
  username: string;
}

interface IGeotabIntegration {
  geotabIntegrationServiceAccount?: IGeotabIntegrationServiceAccount;
}
