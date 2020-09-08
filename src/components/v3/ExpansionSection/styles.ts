
const styles = (theme) => ({
  root: {
    border: `1px solid ${theme.custom.colors.steel}`,
    margin: '16px 0',
    borderRadius: 12,
    boxShadow: 'none',
    '&:before': {
      opacity: 0,
    },
  },
  heading: {
    color: theme.custom.colors.nightDark,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '19px',
  },
  expandSummary: {
    padding: '0 20px',
  },
  expandSummaryContent: {
    margin: '14px 0',
  },
  expandSummaryIcon: {
    paddingLeft: 0,
  },
  noPadding: {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export default styles;
