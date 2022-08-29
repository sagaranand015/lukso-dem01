import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import { GetConnectedWalletUPData, GetUPData } from '../lukso/universal_profiles';

import PRODUCTS from '../_mock/products';
import { GetGlobalState, UpdateAllStoreAddresses } from '../globalState';


export default function Stores() {

  const state = GetGlobalState();
  const allStoreAddr = [];
  const allStores = [];
  // const allStoreGrid = [];
  const [allStoreGrid, setAllStoreGrid] = useState([]);
  const [gridOk, setGridOk] = useState(false);

  // useEffect(() => {
  //   while(gridOk) {
      
  //   }
  // }, []);

  async function PopulateAllStoresGrid() {
    allStoreAddr.forEach(storeAddr => {
      try {
        const reqs = GetUPData(storeAddr).then(res => {
          if(res) {
            console.log("======== resp is: ", res.value.LSP3Profile.name);
            allStores.push({
              'id': storeAddr,
              'name': res.value.LSP3Profile.name,
              'cover': '/static/mock-images/stores/store_placeholder.jpg',
            });
            setGridOk(true);
          }
        });
      }
      catch(error) {
        console.error(error);
      }
    });
    console.log("all stores are: ", allStores);
  }

  async function GetAllStoreAddresses() {

    if(!state.selectedAddress) {
      alert("Please connect wallet to see stores here...");
      return;
    }

    const connectedProfileData = state.selectedProfile;
    console.log("selected profile data is: ", connectedProfileData.links);
    connectedProfileData.links.forEach(addr => {
      allStoreAddr.push(addr.title);
    });

    UpdateAllStoreAddresses(allStoreAddr);
    PopulateAllStoresGrid();
  }

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  GetAllStoreAddresses();

  return (
    <Page title="Stores">
        <Container>

          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Stores
            </Typography>
            <Button variant="contained" component={RouterLink} to="/dashboard/newstore" startIcon={<Iconify icon="eva:plus-fill" />}>
              Create New Store
            </Button>
          </Stack>

          <ProductList products={allStoreGrid} />
          {/* <ProductCartWidget /> */}
        </Container>
      </Page>
  );
  
}
