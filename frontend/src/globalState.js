let state = {
    selectedAddress: undefined,
    selectedProfile: undefined,
    allStoreAddresses: undefined,
    allStores: [],
    selectedStore: undefined,
}


export function GetGlobalState() {
    return state;
}

export function UpdateState(newState) {
    state = newState;
}

export function UpdateSelectedProfileInState(selectedProfile) {
    state.selectedProfile = selectedProfile;
}

export function UpdateSelectedAddressInState(addr) {
    state.selectedAddress = addr;
}

export function UpdateAllStoreAddresses(storeUPAddresses) {
    state.allStoreAddresses = storeUPAddresses;
}

export function AddStoreDetailsToState(store) {
    state.allStores.push(store);
}

export function UpdateAllStoreDetails(allStores) {
    state.allStores = allStores;
}