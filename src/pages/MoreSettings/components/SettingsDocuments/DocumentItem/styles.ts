const styles = (theme) => ({
  document: {
    display: 'flex',
    flexDirection: 'column',
    width: 86,
    height: 102,
    alignItems: 'center',
    paddingTop: 18,
    borderRadius: 8,
    marginBottom: theme.spacing(1),
  },
  documentActive: {
    backgroundColor: theme.custom.colors.tree,
    borderColor: theme.custom.colors.tree,
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
  label: {
    marginTop: theme.spacing(1),
    color: theme.custom.colors.night,
    fontSize: 9,
    textAlign: 'center',
  },
  labelActive: {
    color: theme.custom.colors.white,
  },
});

export default styles;
