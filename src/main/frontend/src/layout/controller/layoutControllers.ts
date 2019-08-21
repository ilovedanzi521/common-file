import Vue from "vue";
import { Component } from "vue-property-decorator";
import LayoutService from "../service/layoutService";
import { LayoutReqVO } from "../vo/LayoutVO";
import { WinRspType } from "../../page/common/enum/BaseEnum";
import { WinResponseData } from "../../page/common/vo/BaseVO";
import pinyin from "convertPinyin";
import Header from "../Lheader.vue";
import Aside from "../Laside.vue";
import Meun from "../LMenu.vue";
import Fast from "../LFast.vue";
import Main from "../Lmain.vue";
import Footer from "../Lfooter.vue";
import PassWord from "../Lpassword.vue";
import SecondMenu from "../LsecondMenu.vue";
import Tabs from "../Ltab.vue";
import Lock from "../Llock.vue";
import Ltab from "../Ltab.vue";
import Lmask from "../Lmark.vue";
import BaseController from "../../page/common/controller/BaseController";

@Component({
    components: {
        Header,
        Aside,
        Meun,
        SecondMenu,
        Fast,
        Main,
        Footer,
        PassWord,
        Tabs,
        Lock,
        Ltab,
        Lmask
    }
})
export default class LayoutController extends BaseController {
    $router;
    tabIndex = 1;
    layoutReqVO: LayoutReqVO = new LayoutReqVO();

    /**加载一级二级菜单 */

    async getMenuList() {
        var menuTreeParam = { userId: localStorage.getItem("userName") };
        let result = await LayoutService.menuTree(menuTreeParam);
        let firstMenus = result.data; //获取一级菜单
        this.layoutReqVO.firstMents = firstMenus.map(item => {
            return {
                menuName: item.menuName,
                id: item.id,
                menuIcon: item.menuIcon || "icon-33"
            };
        });

        // 加载用户最近访问菜单

        let lasterVisitMenus = await LayoutService.lasterVisitMenu();
        lasterVisitMenus.data[0].id = 0;
        lasterVisitMenus.data[0].menuIcon =
            lasterVisitMenus.data[0].menuIcon || "icon-33";
        //添加最近访问一级菜单
        this.layoutReqVO.firstMents = [
            lasterVisitMenus.data[0],
            ...this.layoutReqVO.firstMents
        ];

        //添加最近访问一级菜单
        let storageArray = [];
        firstMenus.forEach(next => {
            if (next.children) {
                next.children.forEach(next2 => {
                    if (!storageArray[next2.parentId]) {
                        storageArray[next2.parentId] = [];
                        let storageArea = {
                            parentId: next2.parentId,
                            menuName: next2.menuName,
                            id: next2.id,
                            // children: next2.children,
                            children: next2.children.map(item => {
                                return {
                                    ...item,
                                    firstPy: this.toPinyinFirst(item.menuName)
                                };
                            }),
                            menuAddress: next2.menuAddress
                        };
                        storageArray[next2.parentId].push(storageArea);
                    } else {
                        let storageArea = {
                            parentId: next2.parentId,
                            menuName: next2.menuName,
                            id: next2.id,
                            // children: next2.children,
                            children: next2.children.map(item => {
                                return {
                                    ...item,
                                    firstPy: this.toPinyinFirst(item.menuName)
                                };
                            }),
                            menuAddress: next2.menuAddress
                        };
                        storageArray[next2.parentId].push(storageArea);
                    }
                });
            }
        });

        this.layoutReqVO.secondMenus = storageArray;
        this.layoutReqVO.secondMenus[0] = lasterVisitMenus.data[0].children;
        console.log(this.layoutReqVO.secondMenus);
    }
    /**
     *添加最近访问
     */
    // async addVisitMenu(menuId) {
    //     let lasterVisitMenus = await LayoutService.addVisitMenu({ menuId });
    //     console.log(lasterVisitMenus);
    // }

    /**
     *增加最近访问区Item
     */
    async addLasterVisitMenuItem(menu) {
        await LayoutService.addVisitMenu({ menuId: menu.id });
        let lasterVisitMenus = await LayoutService.lasterVisitMenu();
        this.layoutReqVO.secondMenus[0] = lasterVisitMenus.data[0].children;
    }

    /**
     *加载快速导航区
     */
    async getFastList() {
        let fastMenus = await LayoutService.collectMenus({});
        fastMenus.data.forEach(item => {
            if (!item.menuIcon) {
                item.menuIcon = "icon-33";
            }
        });
        this.layoutReqVO.fastMenus = fastMenus.data;
    }

    /**
     *点击菜单面板的菜单跳转到页面，并添加一个tab
     */
    gotoPath(menu) {
        var menuAddress = menu.menuAddress;

        if (!menuAddress) {
            return;
        }
        // console.log(menu);
        //增加一个最近访问
        this.addLasterVisitMenuItem(menu);
        // 同步vuex
        this.$store.commit("setMenuAddress", {
            menuAddress: menuAddress
        });
        this.addTab(menu);
        this.$router.push({
            name: "directional",
            params: { address: menuAddress }
        });
    }
    /**
     *切换收藏快速菜单
     */
    async toggleFastItem(item) {
        if (item.collect) {
            this.$set(item, "collect", 0);
            let result = await LayoutService.deleteCollectMenuByMenuId(item.id);
        } else {
            this.$set(item, "collect", 1);
            if (!item.menuIcon) {
                this.$set(item, "menuIcon", "icon-33");
            }
            this.layoutReqVO.fastMenus = [item, ...this.layoutReqVO.fastMenus];
            await LayoutService.addCollectmenu({ menuId: item.id });
        }
        this.getFastList();
        this.getMenuList();
    }

    /**
     *删除快速导航区
     */
    async deleteFastItem(id) {
        this.layoutReqVO.fastMenus = this.layoutReqVO.fastMenus.filter(
            item => item.id !== id
        );
        let storageArray = [];
        this.layoutReqVO.secondMenus.forEach(item => {
            storageArray.push(JSON.stringify(item));
        });
        let result = await LayoutService.deleteCollectmenu(id);
        this.getMenuList();
    }

    /**
     *修改密码
     */

    modifyPassWord(params) {
        LayoutService.modifyPassword(params).then(
            (winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    this.layoutReqVO.passwordController = false;
                    this.successMessage("修改密码成功");
                } else {
                    this.errorMessage(winResponseData.msg);
                }
            }
        );
    }

    /**
     *点击导航菜单切换菜单面板
     */

    changeSecondMenu(id) {
        this.layoutReqVO.firstMenuIndex = id;
    }

    closeSecondMenus() {
        this.layoutReqVO.secondMeunIsOpen = false;
    }

    /***添加tab */
    addTab(targetName) {
        let findItem = this.layoutReqVO.tabs.filter(
            item => item.id == targetName.id
        );
        if (findItem[0]) {
            this.layoutReqVO.editableTabsValue2 = findItem[0].name;
            return;
        }
        let newTabName = ++this.tabIndex + "";
        this.layoutReqVO.tabs.push({
            ...targetName,
            name: newTabName
        });
        this.layoutReqVO.editableTabsValue2 = newTabName;
        //点击增加一个最近访问菜单
        this.layoutReqVO.secondMenus[0];
    }

    /***锁频 */
    handleLockScreen(loginPassword) {
        let option = {
            loginPassword: loginPassword
        };
        LayoutService.lockScreen(option).then(
            (winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    localStorage.setItem("lockName", Math.random() * 54 + "");
                    this.layoutReqVO.nameLock = localStorage.getItem(
                        "lockName"
                    );
                    this.successMessage("锁屏成功");
                    this.inFullCreeen();
                } else {
                    this.errorMessage(winResponseData.msg);
                }
            }
        );
    }
    /***解屏 */
    handleSolutionScreen(loginPassword) {
        let option = {
            loginPassword: loginPassword
        };
        LayoutService.solutionScreen(option).then(
            (winResponseData: WinResponseData) => {
                if (WinRspType.SUCC == winResponseData.winRspType) {
                    localStorage.removeItem("lockName");
                    this.layoutReqVO.nameLock = "";
                    this.layoutReqVO.lockisOpen = false;
                    this.successMessage("解屏成功");
                } else {
                    this.errorMessage(winResponseData.msg);
                }
            }
        );
    }

    /***关闭锁屏面板 */
    closeLock() {
        this.layoutReqVO.lockisOpen = false;
    }

    /***全屏功能*/
    inFullCreeen() {
        if (document.body.requestFullscreen) {
            document.body.requestFullscreen();
        }
    }

    /***关闭所用功能*/
    closeAllPanle(res: boolean) {
        this.layoutReqVO.otherPanel = false;
        this.layoutReqVO.secondMeunIsOpen = false;
        this.layoutReqVO.stwichController.switchsScondMeunIsDetailed = false;
        this.layoutReqVO.secondMenus = [...this.layoutReqVO.storageMenus];
        this.layoutReqVO.firstMenuIndex = "";
    }

    /** 获取汉字首字母*/
    toPinyinFirst(value) {
        let d = pinyin(value);
        let pinyinFirst = "";
        d.forEach(element => {
            pinyinFirst += element.substring(0, 1);
        });
        return pinyinFirst;
    }

    /***页面初始化功能*/
    mounted() {
        // 开发环境
        if ("development" === process.env.NODE_ENV) {
            return;
        }

        // var authorization: string =
        localStorage.getItem("Authorization");
        // if (!authorization) {
        //     this.$router.push({
        //         path: "/login"
        //     });
        //     return;
        // }

        this.$store.commit("setMenuAddress", {
            menuAddress: this.layoutReqVO.tabs[0].menuAddress
        });

        // 页面加载首页路由
        this.$router.push({
            name: "directional",
            params: { address: this.layoutReqVO.tabs[0].menuAddress }
        });

        this.layoutReqVO.userName = localStorage.getItem("userName");

        //加载快捷菜单
        this.getFastList();
        //加载用户菜单
        this.getMenuList();
    }
}
