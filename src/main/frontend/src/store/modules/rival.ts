/*
 * @Descripttion:
 * @Author: zoujian
 * @Date: 2019-07-12 17:08:40
 * @LastEditors: zoujian
 * @LastEditTime: 2019-07-13 10:26:24
 */
const state = {
    rivalInfo: {
        rivalNo: "",
        rivalName: ""
    },
    // 展示更多交易对手信息控制
    showMore: {
        flag: false,
        offsetTop: 0
    }
};

const mutations = {
    // tslint:disable-next-line: no-shadowed-variable
    setShowMore(state, payload) {
        state.showMore = {
            flag: false,
            offsetTop: 0
        };
        if (payload.hasOwnProperty("flag")) {
            state.showMore.flag = payload.flag;
        }
        if (payload.hasOwnProperty("offsetTop")) {
            state.showMore.offsetTop = payload.offsetTop;
        }
    },
    // tslint:disable-next-line: no-shadowed-variable
    setRivalInfo(state, payload) {
        state.rivalInfo = {
            rivalNo: "",
            rivalName: ""
        };
        if (payload.hasOwnProperty("rivalNo")) {
            state.rivalInfo.rivalNo = payload.rivalNo;
        }
        if (payload.hasOwnProperty("rivalName")) {
            state.rivalInfo.rivalName = payload.rivalName;
        }
    }
};

const actions = {};
export default {
    state,
    mutations,
    actions
};
