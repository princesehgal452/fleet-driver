const styles = (theme) => ({
  root: {
    margin: '10px',
    padding: '6px 0',
  },
  iconContainer: {
    justifyContent: 'flex-end',
  },
  listItemText: {
    fontSize: 14,
  },
  documentIcon: {
    width: 40,
    height: 40,
    color: theme.custom.colors.treeLight,
    backgroundColor: theme.custom.colors.stoneMedium,
  },
  badge: {
    width: 13,
    height: 13,
    backgroundColor: theme.custom.colors.treeLight,
  },
  badgeIcon: {
    width: 11,
    height: 11,
    color: theme.custom.colors.white,
  },
  document: {
    display: 'flex',
    width: 86,
    height: 102,
    justifyContent: 'center',
    paddingTop: 18,
    borderRadius: 8,
  },
});

export default styles;
