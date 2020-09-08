import { Tutorial } from '../../../../services/constants';


export interface ITutorial {
  [Tutorial.MY_LOADS_PAGE]?: boolean;
  [Tutorial.RAL_PAGE]?: boolean;
  [Tutorial.SEARCH_PAGE]?: boolean;
  [Tutorial.SETTINGS_PAGE]?: boolean;
}
