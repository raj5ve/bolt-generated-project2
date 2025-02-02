import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  button: {
    display: 'block',
    width: '100%',
    padding: 0,
    margin: 0,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    font: 'inherit',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}));

export default function UnstyledButton({ children, ...props }) {
  const { classes } = useStyles();
  return (
    <button className={classes.button} type="button" {...props}>
      {children}
    </button>
  );
}
