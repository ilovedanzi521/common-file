/* @ 产品管理页面状态管理
 * @Author: lixiuquan
 * @Date: 2019-06-23 14:01:33
 * @Last Modified by: lixiuquan
 * @Last Modified time: 2019-06-23 19:34:05
 */

const state = {
    // 点击的目录
    mandator: {
        type: 0,
        company: 0,
        firstMandator: 0,
        secondMandator: 0,
        firstMandatorList: []
    },
    // 展示更多产品控制
    showMore: {
        flag: false,
        offsetTop: 0
    },
    // 产品信息
    prodInfo: {
        fundNo: -1,
        fundCode: "",
        fundName: ""
    }
};

const mutations = {
    // tslint:disable-next-line: no-shadowed-variable
    setMandator(state, payload) {
        state.mandator = {
            type: 0,
            company: 0,
            firstMandator: 0,
            secondMandator: 0,
            firstMandatorList: []
        };
        if (payload.hasOwnProperty("type")) {
            state.mandator.type = payload.type;
        }
        if (payload.hasOwnProperty("company")) {
            state.mandator.company = payload.company;
        }
        if (payload.hasOwnProperty("firstMandator")) {
            state.mandator.firstMandator = payload.firstMandator;
        }
        if (payload.hasOwnProperty("secondMandator")) {
            state.mandator.secondMandator = payload.secondMandator;
        }
        if (payload.hasOwnProperty("firstMandatorList")) {
            state.mandator.firstMandatorList = payload.firstMandatorList;
        }
    },
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
    setProdInfo(state, payload) {
        state.prodInfo = {
            fundNo: 0,
            fundCode: "",
            fundName: ""
        };
        if (payload.hasOwnProperty("fundNo")) {
            state.prodInfo.fundNo = payload.fundNo;
        }
        if (payload.hasOwnProperty("fundCode")) {
            state.prodInfo.fundCode = payload.fundCode;
        }
        if (payload.hasOwnProperty("fundName")) {
            state.prodInfo.fundName = payload.fundName;
        }
    }
};

const getters = {
    // tslint:disable-next-line: no-shadowed-variable
    getMandator: (state: any) => {
        return state.mandator;
    }
};

const actions = {
    setMandatorAction(context, value) {
        context.commit("setMandator", value);
    }
};

export default {
    state,
    mutations,
    getters,
    actions
};
