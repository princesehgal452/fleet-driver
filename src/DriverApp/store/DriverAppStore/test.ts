import { DriverAppStore } from './index';


describe('Driver App Store', () => {
  let driverAppStore: DriverAppStore;
  beforeEach(() => {
    driverAppStore = new DriverAppStore();
  });
  test('Child stores are defined', () => {
    expect(driverAppStore.matchStore).toBeDefined();
    expect(driverAppStore.searchStore).toBeDefined();
    expect(driverAppStore.truckStore).toBeDefined();
    expect(driverAppStore.userStore).toBeDefined();
  });
  test('Coordinates get updated after async download', async () => {
    expect(driverAppStore.userStore.currentCoordinates.lat).toBeFalsy();
    expect(driverAppStore.userStore.currentCoordinates.lng).toBeFalsy();
    await driverAppStore.userStore.downloadCurrentCoordinatesAsync();
    expect(driverAppStore.userStore.currentCoordinates.lat).toBeTruthy();
    expect(driverAppStore.userStore.currentCoordinates.lng).toBeTruthy();
  });
  // test('Coordinates get updated when accessed via computed', () => {
  //   expect(driverAppStore.getCurrentCoordinates).toBe({ lat: null, lng: null });
  // });
});
