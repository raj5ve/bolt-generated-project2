import { AppShell, Navbar, Header, Burger, MediaQuery, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import Navigation from './Navigation';
import TopBar from './TopBar';

export default function Layout({ children }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          paddingLeft: 'var(--mantine-navbar-width)',
          paddingRight: 0,
          paddingTop: 60,
          paddingBottom: 0,
          minHeight: '100vh',
          [theme.fn.smallerThan('sm')]: {
            paddingLeft: 0
          }
        }
      }}
      navbarOffsetBreakpoint="sm"
      navbar={
        <>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Navbar
              p="md"
              hidden={!opened}
              width={{ base: 220 }}
              height="100vh"
              sx={{ position: 'fixed' }}
            >
              <Navigation />
            </Navbar>
          </MediaQuery>
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Navbar
              p="md"
              width={{ base: 220 }}
              height="100vh"
            >
              <Navigation />
            </Navbar>
          </MediaQuery>
        </>
      }
      header={
        <Header height={60} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <TopBar />
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
