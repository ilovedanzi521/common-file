import {
    BaseReqVO,
    BaseRepVO,
    WinResponseData
} from "../../page/common/vo/BaseVO";

interface FristMenus {
    id: string;
    menuName: string;
    menuIcon: string;
    menuAddress: string;
}

interface FastMenus {
    id: string;
    menuId: string;
    menuName: string;
    menuAddress: string;
    menuIcon: string;
    parentId: string;
}

interface Tabs {
    menuName: string;
    menuAddress: string;
    id: string;
    name: string;
}

interface SwitchController {
    switchsScondMeunIsDetailed: boolean;
}

export class LayoutReqVO extends BaseReqVO {
    userName: string = "某某";
    firstMenuIndex: string = "0";
    secondMeunIsOpen: boolean = false;
    luserInfoOpen: boolean = false;
    lockisOpen: boolean = false;
    otherPanel: boolean = false;
    nameLock: string = ""; //用户锁频参数
    storageMenus: any[] = [];
    firstMents: FristMenus[] = [
        // { menuIcon: "icon-35", menuName: "产品2", id: "222" }
    ];
    fastMenus: FastMenus[] = [
        {
            id: "1",
            menuId: "2",
            menuIcon: "icon-35",
            menuName: "资产配置",
            menuAddress: "/",
            parentId: ""
        },
        {
            id: "2",
            menuId: "2",
            menuIcon: "icon-28",
            menuName: "风险管理",
            menuAddress: "/",
            parentId: ""
        },
        {
            id: "3",
            menuId: "2",
            menuIcon: "icon-13",
            menuName: "系统运作",
            menuAddress: "/",
            parentId: ""
        },
        {
            id: "4",
            menuId: "2",
            menuIcon: "icon-9",
            menuName: "衍生品",
            menuAddress: "/",
            parentId: ""
        },
        {
            id: "15",
            menuId: "2",
            menuIcon: "icon-33",
            menuName: "组合管理",
            menuAddress: "/",
            parentId: ""
        }
    ];
    secondMenus: any[] = [
        [
            {
                menuName: "列表3",
                id: 11,
                children: [
                    {
                        parentIndex: "11",
                        menuIcon: "icon-35",
                        menuName: "资产配置1",
                        collect: 0,
                        id: 111,
                        path: "/home"
                    },

                    {
                        parentIndex: "11",
                        menuIcon: "icon-35",
                        menuName: "资产配置21",
                        collect: 0,
                        id: 111,
                        path: "/home"
                    },
                    {
                        parentIndex: "11",
                        menuIcon: "icon-35",
                        menuName: "资产配置22",
                        collect: 0,
                        id: 11661,
                        path: "/home"
                    }
                ]
            },

            {
                menuName: "列表一",
                id: 113,
                children: [
                    {
                        parentIndex: "11",
                        menuIcon: "icon-35",
                        menuName: "资产配置1",
                        collect: 0,
                        id: 1161,
                        path: "/home"
                    },

                    {
                        parentIndex: "11",
                        menuIcon: "icon-35",
                        menuName: "资产配置21",
                        collect: 0,
                        id: 1171,
                        path: "/home"
                    },
                    {
                        parentIndex: "11",
                        menuIcon: "icon-35",
                        menuName: "资产配置22",
                        collect: 0,
                        id: 116861,
                        path: "/home"
                    }
                ]
            }
        ]
    ];

    activeTabId: string = "2222";

    tabs: Tabs[] = [
        {
            menuName: "首页",
            menuAddress: "#/home",
            id: "2222",
            name: "1"
        }
    ];
    editableTabsValue2 = "1";

    stwichController: SwitchController = {
        switchsScondMeunIsDetailed: false
    };
    passwordController: boolean = false;
}
