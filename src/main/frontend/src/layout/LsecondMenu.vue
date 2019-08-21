/* @二级导航组件
 * @Author: mikey.zhz
 * @Date: 2019-05-21 13:42:17 
 * @Last Modified time: 2019-05-21 13:10:04
 */

<template>
    <section class="menu-container">
        <div>

            <div class="menu-panel">
                <div class="search">
                    <i class="win win-el-icon-search"></i>
                    <input type="text" class="searchInput" placeholder="请输入关键词" v-model.trim="serverValue" @input="setSearchMenuItem(serverValue)" v-winfocus />
                </div>
                <div class="menu-second">
                    <dl class="second-menu-floor" v-for="(item) in layoutReqVO.secondMenus[layoutReqVO.firstMenuIndex]" :key="item.id" v-show="item.children && item.children.length > 0">
                        <div>{{layoutReqVO.firstIndex}}</div>
                        <dt>{{item.menuName}}</dt>
                        <dd v-for="(menuItem) in item.children" :key="menuItem.menuName" @click="gotoMenuPath(menuItem,item)">
                            <span :class="['el-icon-s-goods','win',menuItem.menuIcon]" :style="{'marginRight':'10px','paddingLeft':'10px'}"></span>
                            <span :class="{'noAddress':!menuItem.menuAddress}">{{menuItem.menuName}}</span>
                            <i @click.stop="handleToggleFast(menuItem)" v-if="!menuItem.collect" class="startImg">
                                <img src="../assets/image/start.png" width="14" height="14" />
                            </i>
                            <i :class="['icon-11','win','win-star' ,{'active':menuItem.collect}]" @click.stop="handleToggleFast(menuItem)" v-else></i>
                            <!-- <i :class="['icon-11','win','win-star' ,{'active':menuItem.collect}]" @click.stop="handleToggleFast(menuItem)"></i> -->
                        </dd>
                    </dl>
                </div>

                <span class="close icon-2" @click="closeSecondMenus">✖</span>

            </div>
        </div>
    </section>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import { LayoutReqVO } from "./vo/LayoutVO";

@Component({})
export default class SecondMenus extends Vue {
    serverValue: string = "";
    // storageMenus;
    @Prop()
    layoutReqVO: LayoutReqVO;

    /**
     *添加菜单到快速导航栏
     * */
    @Emit("toggleFastItem")
    handleToggleFast(item) {
        return item;
    }

    /**
     *
     *跳转点击菜单
     *
     * */
    @Emit("gotoPath")
    gotoMenuPath(item) {
        return item;
    }

    /**
     *关闭当前菜单
     *
     * */
    close() {
        this.closeSecondMenus();
    }

    /**
     *菜单查询
     *
     * */

    setSearchMenuItem(searchValue) {
        this.layoutReqVO.secondMenus[
            this.layoutReqVO.firstMenuIndex
        ] = this.layoutReqVO.storageMenus[this.layoutReqVO.firstMenuIndex];
        let searchArray = [];
        this.layoutReqVO.secondMenus[this.layoutReqVO.firstMenuIndex].forEach(
            (item, pareIndex) => {
                item.children.forEach((element, index) => {
                    if (element.menuName.indexOf(searchValue) >= 0) {
                        let searchItem = {
                            ...element,
                            parentMenuName: item.menuName,
                            parentfirstId: item.parentId
                        };
                        searchArray.push(searchItem);
                    } else if (
                        element.firstPy.indexOf(searchValue.toLowerCase()) >= 0
                    ) {
                        let searchItem = {
                            ...element,
                            parentMenuName: item.menuName,
                            parentfirstId: item.parentId
                        };
                        searchArray.push(searchItem);
                    }
                });
            }
        );
        if (!searchArray.length) {
            return;
        }
        let d = {};
        searchArray.forEach(item => {
            if (!d[item.parentId]) {
                d[item.parentId] = {
                    parentId: item.parentfirstId,
                    menuName: item.parentMenuName,
                    id: item.parentId,
                    children: [item]
                };
            } else {
                d[item.parentId].children.push(item);
            }
        });
        let lastSearchArray = [];
        let f = Object.keys(d);
        f.forEach(item => {
            lastSearchArray.push(d[item]);
        });
        this.layoutReqVO.secondMenus[
            this.layoutReqVO.firstMenuIndex
        ] = lastSearchArray;
        this.$forceUpdate();
    }

    closeSecondMenus() {
        this.layoutReqVO.stwichController.switchsScondMeunIsDetailed = false;
        this.layoutReqVO.secondMeunIsOpen = false;
        this.layoutReqVO.secondMenus = [...this.layoutReqVO.storageMenus];
    }

    mounted() {
        this.layoutReqVO.storageMenus = [...this.layoutReqVO.secondMenus];
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/element.scss";
.menu-container {
    overflow-y: auto;
    &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #535353;
    }
    &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #ededed;
    }

    .menu-panel {
        position: relative;
        max-width: 800px;
        left: 0;
        top: 0;
        bottom: 0;
        padding: 12px 34px 12px 50px;
        background: #1f2640;
        box-sizing: border-box;
        z-index: 1;
        .lately {
            dt {
                margin-bottom: 16px;
                font-size: 12px;
                font-weight: bolder;
                color: $color-orange;
            }
            dd {
                display: inline-block;
                margin: 0 130px 10px 0;
                vertical-align: middle;
                font-size: 12px;
                color: $color-white;
                cursor: pointer;
                &:hover {
                    color: $color-orange;
                }
                &:last-of-type {
                    margin-right: 0;
                }
            }
        }
        .menu-second {
            margin-top: 42px;
            // overflow: hidden;
            .second-menu-floor {
                float: left;
                width: 200px;
                box-sizing: border-box;
                margin-right: 30px;
                &:last-of-type {
                    margin-right: 0;
                }
                dt {
                    margin-bottom: 16px;
                    font-size: 14px;
                    color: #fff;
                    font-weight: bold;
                }
                dd {
                    position: relative;
                    left: -10px;
                    margin-bottom: 2px;
                    height: 32px;
                    line-height: 32px;
                    font-size: 14px;
                    .startImg {
                        display: none;
                        position: absolute;
                        right: 12px;
                        top: 2px;
                    }
                    // background: red;
                    cursor: pointer;
                    color: #adb5bb;
                    cursor: pointer;
                    & span.noAddress {
                        color: #999;
                        &:hover {
                            color: #999;
                            & + .win-star {
                                &::before {
                                    opacity: 1;
                                }
                            }
                        }
                    }
                    span,
                    i {
                        display: inline-block;
                        vertical-align: middle;

                        &.win-star {
                            position: absolute;
                            right: 12px;
                            top: -1px;

                            &::before {
                                opacity: 0;
                            }
                        }
                        &.win-star.active {
                            + span {
                                color: $color-orange;
                            }
                            &::before {
                                opacity: 1;
                                font-size: 12px;
                                color: $color-orange;
                            }
                        }
                    }
                    &:hover {
                        .startImg {
                            display: inline-block;
                        }
                        background: #0b1431;
                        span {
                            color: $color-orange;
                        }
                        .win-star {
                            &::before {
                                opacity: 1;
                            }
                        }
                    }
                }
            }
        }
    }

    .close {
        position: absolute;
        top: 8px;
        right: 22px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        &:hover {
            color: $color-orange;
        }
    }
    .search {
        width: 80%;
        height: 26px;
        margin-top: 14px;
        // background: red;
        border-bottom: 1px solid #adb5bb;
        .win-el-icon-search {
            display: inline-block;
            vertical-align: middle;
            margin-right: 6px;
            font-size: 24px;
            font-size: 24px;
            margin-top: -7px;
            &::before {
                color: #848993;
            }
        }
        .searchInput {
            display: inline-block;
            width: 70%;
            vertical-align: middle;
            height: 26px;
            line-height: 26px;
            color: #adb5bb;
            border: none;
            margin-top: -10px;
            background: transparent;
        }
    }
}
</style>
