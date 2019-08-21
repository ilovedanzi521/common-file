// import { getUserOrders, getDetailOrders } from '@/services/order';

const state = {
    menuAddress: ""
};

const mutations = {
    setMenuAddress(state: any, payload: any) {
        if (payload.hasOwnProperty("menuAddress")) {
            state.menuAddress = payload.menuAddress;
        }
    }
};

const actions = {};

export default {
    state,
    mutations,
    actions
};
