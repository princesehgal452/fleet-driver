const styles = (theme) => ({
  root: {
    margin: '10px',
    padding: '6px 0 0 0',
    borderRadius: '2px',
    backgroundColor: theme.custom.colors.white,
    boxShadow: '0 0 10px 0 rgba(0,0,0,0.12), 0 24px 25px 0 rgba(0,0,0,0.07)',
  },
  iconContainer: {
    justifyContent: 'flex-end',
  },
  listItem: {
    padding: '16px 14px',
  },
  listItemText: {
    lineHeight: '16px',
    fontSize: 14,
    color: theme.custom.colors.night,
  },
  logout: {
    lineHeight: '16px',
    fontSize: 14,
    color: theme.custom.colors.night,
    fontWeight: 500,
  },
});

export default styles;
