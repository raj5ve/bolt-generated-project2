export const createServiceStyles = (theme) => ({
  wrapper: {
    minHeight: 'calc(100vh - 60px)',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.gray[0]
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto'
  },
  stepContent: {
    maxWidth: 800,
    margin: '0 auto'
  },
  mobileProgress: {
    marginBottom: theme.spacing.xl
  },
  packageCard: {
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.gray[3]}`
  },
  fullWidthMobile: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%'
    }
  }
});
