import { useNavigate } from "react-router-dom";
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppActionWidget,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

// async function _initialiseStoreTokenDetails() {
//   const storeContract = await GetStoreContract();
//   const [name, symbol, storeTokenBalance] = await GetStoreTokenDetails(this.state.selectedAddress);
//   this.setState({ storeContact: storeContract,  storeTokenData: { name, symbol}, storeTokenBalance: storeTokenBalance.toNumber()});
// }

// async function _initialiseStoresubscriptionTokenDetails() {
//   const subContract = await GetStoreSubscriptionContract();
//   const [name, symbol, subTokenBalance] = await GetStoreSubscriptionTokenDetails(this.state.selectedAddress);
//   this.setState({ subscriptionContract: subContract,  subscriptionTokenData: { name, symbol}, subscriptionTokenBalance: subTokenBalance.toNumber()});
// }

// async function _refreshAllTokenBalances() {
//   await this._refreshStoreTokenBalance();
//   await this._refreshStoresubscriptionTokenBalance();
// }

// async function _refreshStoreTokenBalance() {
//   if(!this.state.selectedAddress) {
//     console.log("No Address, connect wallet please...");
//     return;
//   }
//   else if(!this.state.storeContact || !this.state.storeTokenData) {
//     console.log("No Store Contract or token connected, please try again...");
//     return;
//   }
//   const storeTokenBalance = await this.state.storeContact.balanceOf(this.state.selectedAddress);
//   this.setState({
//     storeTokenBalance: storeTokenBalance.toNumber()
//   });
//   return this.state.storeTokenBalance;
// }

// async function _refreshStoresubscriptionTokenBalance() {
//   if(!this.state.selectedAddress) {
//     console.log("No Address, connect wallet please...");
//     return;
//   }
//   else if(!this.state.subscriptionContract || !this.state.subscriptionTokenData) {
//     console.log("No Store subscription Contract or token connected, please try again...");
//     return;
//   }
//   const subTokenBalance = await this.state.subscriptionContract.balanceOf(this.state.selectedAddress);
//   this.setState({
//     subscriptionTokenBalance: subTokenBalance.toNumber()
//   });
//   return this.state.subscriptionTokenBalance;
// }

// let state = {
//   // keeping a handle to the contract itself
//   storeContact: undefined,
//   // The info of the token (i.e. It's Name and symbol)
//   storeTokenData: undefined,
//   // The user's address and balance
//   selectedAddress: undefined,
//   storeTokenBalance: undefined,
//   // The ID about transactions being sent, and any possible error with them
//   txBeingSent: undefined,
//   transactionError: undefined,
//   networkError: undefined,
// }

export default function DashboardApp() {
  const theme = useTheme();

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Welcome to D-Dawg!
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppActionWidget icon={'ant-design:appstore-filled'} btnText="Manage your Stores" path="/dashboard/stores" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppActionWidget icon={'ant-design:usb-filled'} btnText="Manage your Subscriptions" path="/dashboard/products" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppActionWidget icon={'ant-design:sound-filled'} btnText="Give Feedback" path="/dashboard/user" />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
