import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';

// mock
import account from '../../_mock/account';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import navConfig from './NavConfig';

import { GetGlobalState, UpdateSelectedAddress } from '../../globalState';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

// export async function ConnectWallet() {
//   // This method is run when the user clicks the Connect. It connects the
//   // dapp to the user's wallet, and initializes it.

//   // To connect to the user's wallet, we have to run this method.
//   // It returns a promise that will resolve to the user's address.
//   const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
//   console.log("Connected address is:", selectedAddress);

//   state.selectedAddress = selectedAddress;
//   setAddrSelected(state.selectedAddress);

//   console.log("=== final state is: ", state);

//   // this.setState({
//   //   selectedAddress
//   // }, () => {
//   //   // initialize store contract and store token details
//   //   // _initialiseStoreTokenDetails();
//   //   // this._initialiseStoresubscriptionTokenDetails();
//   //   // this._refreshAllTokenBalances();
//   // });

// }

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {

  const state = GetGlobalState();
  const [addrSelected, setAddrSelected] = useState(state.selectedAddress);

  async function ConnectWallet() {
    const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log("Connected address is:", selectedAddress);  
    state.selectedAddress = selectedAddress;
    setAddrSelected(state.selectedAddress);
    UpdateSelectedAddress(selectedAddress);
  }

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContentWithoutWalletConnect = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>
      <Box sx={{ mt: 2.5, mb: 5 }} textAlign="center">
        <Button target="_blank" 
          variant="contained" size="large" onClick={() => ConnectWallet()}>
          Connect Wallet
        </Button>
      </Box>
      <NavSection navConfig={navConfig} state={state} />

    </Scrollbar>
  );

  const renderContentWithWalletConnect = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>
      <Box sx={{ mt: 2.5, mb: 5 }} textAlign="center">
        <Button target="_blank" 
          variant="contained" size="large" color="success">
          Wallet Connected
        </Button>
      </Box>
      <NavSection navConfig={navConfig} state={state} />

    </Scrollbar>
  );

  if(!state.selectedAddress) {
    return (
      <RootStyle>
        {!isDesktop && (
          <Drawer
            open={isOpenSidebar}
            onClose={onCloseSidebar}
            PaperProps={{
              sx: { width: DRAWER_WIDTH },
            }}
          >
            {renderContentWithoutWalletConnect}
          </Drawer>
        )}
  
        {isDesktop && (
          <Drawer
            open
            variant="persistent"
            PaperProps={{
              sx: {
                width: DRAWER_WIDTH,
                bgcolor: 'background.default',
                borderRightStyle: 'dashed',
              },
            }}
          >
             {renderContentWithoutWalletConnect}
          </Drawer>
        )}
      </RootStyle>
    );
  }
  

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContentWithWalletConnect}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
         {renderContentWithWalletConnect}
        </Drawer>
      )}
    </RootStyle>
  );

}
