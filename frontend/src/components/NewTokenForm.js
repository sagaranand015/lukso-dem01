import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from './Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from './hook-form';

// backend imports
import { CreateStoreUniversalProfile, ConnectStoreUPToSelectedAddress } from '../lukso/universal_profiles';
import { GetGlobalState } from '../globalState';

// ----------------------------------------------------------------------

export default function NewTokenForm() {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const NewStoreSchema = Yup.object().shape({
    tokenName: Yup.string().required('Store Name is required'),
    tokenDesc: Yup.string(),
    tokenSymbol: Yup.string(),

  });

  const defaultValues = {
    tokenName: '',
    tokenDesc: '',
    tokenSymbol: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewStoreSchema),
    defaultValues,
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = async (data) => {

    setIsSubmitting(true);

    const state = GetGlobalState();
    
    if(!state.selectedAddress) {
      console.log("Wallet has not been connected. Please connect wallet first!");
      alert("Wallet has not been connected. Please connect wallet first!");
      setIsSubmitting(false);
    }
    else if(!state.selectedStore) {
      console.log("Please select a store before proceeding to create a token");
      alert("Please select a store before proceeding to create a token");
      setIsSubmitting(false);
    }
    else {
      console.log("token to be created here...");
      setIsSubmitting(false);
      // const storeUPContract = await CreateStoreUniversalProfile(state.selectedAddress, data);
      // console.log("Store UP has been created: ", storeUPContract.LSP0ERC725Account.address);

      // alert("Store UP has been created. Connecting now...");

      // const updateTxn = await ConnectStoreUPToSelectedAddress(storeUPContract.LSP0ERC725Account.address, data);

      // setIsSubmitting(false);
      // navigate('/dashboard/stores', { replace: true });
    }
    
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>

        <RHFTextField name="tokenName" label="Token Name" />

        <RHFTextField name="tokenSymbol" label="Token Symbol" />

        <RHFTextField name="tokenDesc" label="Token Description" />

      </Stack>

      <LoadingButton fullWidth size="large" type="submit" loading={isSubmitting} variant="contained"  sx={{ my: 4 }}>
        Create Token
      </LoadingButton>
    </FormProvider>
  );
}
