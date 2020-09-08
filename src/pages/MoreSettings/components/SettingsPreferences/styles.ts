const styles = (theme) => ({
  root: {
    margin: theme.typography.pxToRem(10),
    padding: theme.typography.pxToRem(16),
    borderRadius: '2px',
    backgroundColor: theme.custom.colors.white,
    boxShadow: '0 0 10px 0 rgba(0,0,0,0.12), 0 24px 25px 0 rgba(0,0,0,0.07)',
  },
  iconContainer: {
    justifyContent: 'flex-end',
  },
  listItemText: {
    fontSize: 14,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.custom.colors.white,
  },
});

export default styles;
