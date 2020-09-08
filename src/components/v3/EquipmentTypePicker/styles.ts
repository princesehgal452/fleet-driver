const styles = (theme) => ({
  root: {
    maxHeight: 175,
    overflowY: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      width: 0,
      background: 'transparent',
    },
  },
  equipment: {
    marginBottom: 14,
  },
  equipmentIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  equipmentLabel: {
    color: theme.custom.colors.night,
    fontSize: 14,
    textAlign: 'center',
  },
  equipmentLabelActive: {
    color: theme.custom.colors.tree,
    fontWeight: 500,
  },
});

export default styles;
