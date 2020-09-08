import Load from '.';
import { mockLoadData } from '../../interfaces/shared/INotificationData';


describe('Load Model', () => {
  let load: Load;
  beforeEach(() => {
    load = new Load(mockLoadData);
  });
  test('Load model is defined', () => {
    expect(load).toBeDefined();
  });
  test('Contact email computed returns same email as postedBy.email', () => {
    const testEmail = 'justin@fleetops.com';
    load = new Load({
      ...mockLoadData,
      postedBy: {
        ...mockLoadData.postedBy,
        email: testEmail,
      },
    });
    expect(load.contact.email).toBe(testEmail);
    const emptyEmail = '';
    load = new Load({
      ...mockLoadData,
      postedBy: {
        ...mockLoadData.postedBy,
        email: emptyEmail,
      },
    });
    expect(load.contact.email).toBe(emptyEmail);
  });
  test('Contact email computed returns empty string if postedBy.email is blacklisted by business logic ',
    () => {
      const testEmail = 'donotsendemail@posteverywhere.com';
      load = new Load({
        ...mockLoadData,
        postedBy: {
          ...mockLoadData.postedBy,
          email: testEmail,
        },
      });
      expect(load.contact.email).toBeFalsy();
    });
  test('Returns flatRate if available', () => {
    const flatPrice = 3213;
    load = new Load({
      ...mockLoadData,
      payload: {
        ...mockLoadData.payload,
        loadPay: {
          ...mockLoadData.payload.loadPay,
          amount: flatPrice,
        },
      },
    });
    expect(load.flatRate).toBeTruthy();
    expect(load.flatRate && load.flatRate.amount).toBe(flatPrice);
  });
  test('Returns flatRate as null if price is estimated', () => {
    const flatPrice = 2131;
    load = new Load({
      ...mockLoadData,
      payload: {
        ...mockLoadData.payload,
        loadPay: {
          ...mockLoadData.payload.loadPay,
          amount: flatPrice,
          priceIsEstimated: true,
        },
      },
    });
    expect(load.flatRate).toBeFalsy();
  });
});
