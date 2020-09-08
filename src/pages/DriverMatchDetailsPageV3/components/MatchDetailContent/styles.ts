import { ITheme } from "theme/ITheme";

export const mapHeight = '200px';

export const styles = (theme: ITheme) => ({
  certifiedLogo: {
    position: 'fixed',
    top: 46,
    left: theme.spacing(2),
    zIndex: 100,
    maxHeight: 40
  },
  map: {
    height: mapHeight,
    position: 'sticky',
    top: 65,
  },
  mapLoading: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
