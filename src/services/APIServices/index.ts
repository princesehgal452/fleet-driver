import { sleep } from '../../utils/utility';
import { ApiFail } from '../../utils/ErrorService';


export const fetchRetry = async (url: RequestInfo, options?: RequestInit, n: number = 5): Promise<Response> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw response;
    }
    return response;
  } catch (error) {
    if (n === 1) {
      ApiFail(error);
      throw error;
    } else if (error.status && error.status <= 500) {
      throw error;
    }
    await sleep(1000);
    return await fetchRetry(url, options, n - 1);
  }
};
