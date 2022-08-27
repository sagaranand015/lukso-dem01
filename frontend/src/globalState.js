const state = {
    selectedAddress: undefined
}

export function GetGlobalState() {
    return state;
}

export function UpdateSelectedAddress(addr) {
    state.selectedAddress = addr;
}