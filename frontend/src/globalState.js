let state = {
    selectedAddress: undefined,
    selectedProfile: undefined,
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