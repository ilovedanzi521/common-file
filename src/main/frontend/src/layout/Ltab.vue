<template>
    <div class="tabContaner">
        <el-tabs v-model="layoutReqVO.editableTabsValue2" type="card" closable @tab-remove="removeTab" @tab-click="clickTab" @contextmenu.prevent.native="otherPanle">
            <el-tab-pane v-for="(item) in layoutReqVO.tabs" :key="item.id" :label="item.menuName" :name="item.name">
            </el-tab-pane>
        </el-tabs>
        <div class="more">
            <span class="more-text">更多</span><i class="el-icon-arrow-down"></i>
            <div class="other">
                <p @click="closeOther(layoutReqVO.editableTabsValue2)">关闭其他</p>
                <p @click="closeAll">关闭全部</p>
            </div>
        </div>
        <div class="otherMore" :style="{'left':moreLeft}" v-if="layoutReqVO.otherPanel">
            <p @click="closeOther(tabindex)">关闭其他</p>
            <p @click="closeAll">关闭全部</p>
        </div>
    </div>
</template>

 <script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import { LayoutReqVO } from "./vo/LayoutVO";
class TabItem {
    title: string;
    path: string;
}

@Component({})
export default class Tab extends Vue {
    @Prop({})
    layoutReqVO: LayoutReqVO;
    moreLeft = "10px";
    tabindex = "";

    /**删除tab */
    removeTab(targetName) {
        let tabs = this.layoutReqVO.tabs;
        let iGotoPath: boolean = false;
        if (targetName == this.layoutReqVO.editableTabsValue2) {
            iGotoPath = true;
        }
        let activeName = this.layoutReqVO.editableTabsValue2;
        if (activeName === targetName) {
            tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                    let nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                        activeName = nextTab.name;
                    }
                }
            });
        }
        this.layoutReqVO.editableTabsValue2 = activeName;
        if (targetName == "1") {
            return;
        }
        this.layoutReqVO.tabs = tabs.filter(tab => tab.name !== targetName);
        if (iGotoPath) {
            let lastIndex = this.layoutReqVO.tabs.length - 1;
            this.$store.commit("setMenuAddress", {
                menuAddress: this.layoutReqVO.tabs[lastIndex].menuAddress
            });
            this.$router.push({
                name: "directional",
                params: {
                    address: this.layoutReqVO.tabs[lastIndex].menuAddress
                }
            });
        }
        this.layoutReqVO.otherPanel = false;
    }
    /**点击tab进行事件 */
    clickTab() {
        let pathMenu = this.layoutReqVO.tabs.filter(
            item => item.name == this.layoutReqVO.editableTabsValue2
        );

        this.$store.commit("setMenuAddress", {
            menuAddress: pathMenu[0].menuAddress
        });
        this.$router.push({
            name: "directional",
            params: { address: pathMenu[0].menuAddress }
        });
    }
    /**点击关闭其他 */
    closeOther(number) {
        if (this.layoutReqVO.tabs.length == 1) {
            return;
        }
        let tabs = this.layoutReqVO.tabs;
        this.layoutReqVO.tabs = tabs.filter((tab, index) => {
            if (index == 0) {
                return tab;
            }
            this.layoutReqVO.otherPanel = false;

            return tab.name == number;
        });
        let lastIndex = this.layoutReqVO.tabs.length - 1;

        this.$store.commit("setMenuAddress", {
            menuAddress: this.layoutReqVO.tabs[lastIndex].menuAddress
        });
        this.$router.push({
            name: "directional",
            params: {
                address: this.layoutReqVO.tabs[lastIndex].menuAddress
            }
        });
    }

    /**点击关闭全部 */
    closeAll() {
        if (this.layoutReqVO.tabs.length == 1) {
            return;
        }

        let tabs = this.layoutReqVO.tabs;
        this.layoutReqVO.tabs = tabs.filter((tab, index) => {
            return tab.name == "1";
        });
        this.layoutReqVO.editableTabsValue2 = "1";
        this.layoutReqVO.otherPanel = false;
        let firstAddress = this.layoutReqVO.tabs[0].menuAddress;
        // 返回首页
        this.$store.commit("setMenuAddress", {
            menuAddress: firstAddress
        });
        this.$router.push({
            name: "directional",
            params: { address: firstAddress }
        });
    }

    otherPanle(e) {
        let tabId = e.target.id;
        if (!e.target.id) {
            return;
        }
        this.moreLeft = e.clientX + "px";
        this.tabindex = tabId.split("-")[1];
        this.layoutReqVO.editableTabsValue2 = this.tabindex;
        if (this.tabindex == "1") {
            return;
        }

        this.layoutReqVO.otherPanel = true;
    }
}
</script>
<style lang="scss" scoped>
.tabContaner {
    position: absolute;
    width: 100%;
    z-index: 1;
    top: 47px;
    left: 0;
    .more {
        position: absolute;
        display: inline-block;
        cursor: pointer;
        padding: 6px 16px;
        text-align: center;
        background: #68718e;
        border-radius: 4px;
        right: 0;
        top: 2px;
        color: #fff;
        .more-text {
            display: inline-block;
            vertical-align: middle;
            margin-right: 8px;
        }

        .other {
            position: absolute;
            display: none;
            left: 0;
            top: 28px;
            text-align: center;
            border-radius: 4px;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            overflow: hidden;
            p {
                padding: 6px 14px;
                background: #68718e;
                box-sizing: border-box;
                color: #fff;
                &:hover {
                    color: #ff900d;
                }
            }
            &::after {
                // content: "";
                // position: absolute;
                // top: -17px;
                // left: 10px;
                // width: 0;
                // height: 0;
                // border: 10px solid transparent;
                // border-bottom-color: #444e69;
            }
        }
        &:hover .other {
            display: inline-block;
        }
    }

    .otherMore {
        position: fixed;
        display: inline-block;
        top: 100px;
        left: 20px;
        cursor: pointer;
        z-index: 9;
        p {
            padding: 6px 14px;
            background: #444e69;
            box-sizing: border-box;
            color: #fff;
            &:hover {
                color: #ff900d;
            }
        }
        &:after {
            content: "";
            position: absolute;
            top: -17px;
            left: 10px;
            width: 0;
            height: 0;
            border: 10px solid transparent;
            border-bottom-color: #444e69;
        }
    }
}
</style>