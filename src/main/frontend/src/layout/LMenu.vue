/* @二级导航组件
 * @Author: mikey.zhz
 * @Date: 2019-05-21 13:42:17 
 * @Last Modified time: 2019-05-21 13:10:04
 */

<template>
    <section class="menu-container">
        <ul class="menu-first">
            <li :class="{'active':layoutReqVO.firstMenuIndex===item.id}" v-for="( item,index ) in layoutReqVO.firstMents" :key="item.id" @mouseenter="handleChangeTab(item.id,index)">
                <span>{{item.menuName}}</span>
                <i class="icon-14"></i>
            </li>
        </ul>
        <!-- <span class="icon_panel"></span> -->
    </section>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import { LayoutReqVO } from "./vo/LayoutVO";
import { setTimeout, clearTimeout } from "timers";

@Component({})
export default class SecondMenus extends Vue {
    time;
    isSecondOpen: Boolean = false;
    @Prop()
    layoutReqVO: LayoutReqVO;
    /**
     *切换菜单
     * * */
    @Emit("changeSecondMenu")
    handleChangeTab(id) {
        if (this.time) {
            clearTimeout(this.time);
        }
        // // if (this.layoutReqVO.stwichController.switchsScondMeunIsDetailed) {
        // //     this.layoutReqVO.firstMenuIndex = id;
        // //     return id;
        // // }
        // //判断鼠标第一次进入二级目录的状态
        // this.time = setTimeout(() => {
        //     this.layoutReqVO.firstMenuIndex = id;
        //     this.layoutReqVO.stwichController.switchsScondMeunIsDetailed = true;
        //     this.isSecondOpen = true;
        //     return id;
        // }, 300);
        this.layoutReqVO.firstMenuIndex = id;
        this.layoutReqVO.stwichController.switchsScondMeunIsDetailed = true;
        return id;
    }
    secondIsClose() {
        console.log(1111);
        if (this.isSecondOpen) {
            return;
        } else {
            clearTimeout(this.time);
            this.isSecondOpen = false;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/element.scss";
.menu-container {
    position: absolute;
    left: 70px;
    top: 48px;
    bottom: 22px;
    width: 130px;
    z-index: 4;
    .icon_panel {
        position: absolute;
        width: 15px;
        height: 25px;
        line-height: 25px;
        background: #57607d;
        right: 0px;
        top: 50%;
        margin-top: -18px;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }
    .menu-first {
        position: absolute;
        left: 0;
        top: 0;
        bottom: -36px;
        width: 130px;
        background: #0a0f0e;
        li {
            display: flex;
            height: 52px;
            padding-right: 18px;
            justify-content: space-between;
            align-items: center;
            text-align: left;
            color: #adb5bb;
            font-size: 14px;
            box-sizing: border-box;
            cursor: pointer;
            .icon-14::before {
                color: transparent;
            }
            &.active {
                background: #1f2640;
                color: $color-orange;
                .icon-14::before {
                    color: $color-orange;
                }
            }
        }
    }

    .menu-panel {
        position: absolute;
        width: 788px;
        left: 130px;
        top: 0;
        bottom: 0;
        padding: 85px 51px;
        background: #1f2640;
        box-sizing: border-box;
        .lately {
            dt {
                margin-bottom: 16px;
                font-size: 16px;
                color: $color-orange;
            }
            dd {
                display: inline-block;
                margin: 0 130px 10px 0;
                vertical-align: middle;
                font-size: 14px;
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
            margin-top: 48px;
            overflow: hidden;
            .second-menu-floor {
                float: left;
                margin-right: 130px;
                &:last-of-type {
                    margin-right: 0;
                }
                dt {
                    margin-bottom: 16px;
                    font-size: 16px;
                    color: $color-orange;
                    cursor: pointer;
                }
                dd {
                    margin-bottom: 24px;
                    font-size: $font-size4;
                    cursor: pointer;
                    color: $color-white;
                    cursor: pointer;
                    span,
                    i {
                        display: inline-block;
                        vertical-align: middle;
                        &.icon-11 {
                            &::before {
                                opacity: 0;
                            }
                        }
                        &.icon-11.active {
                            + span {
                                color: $color-orange;
                            }
                            &::before {
                                opacity: 1;
                                color: $color-orange;
                            }
                        }
                    }
                    &:hover {
                        span {
                            color: $color-orange;
                        }
                        .icon-11 {
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
        top: 24px;
        right: 18px;
        color: #1f2640;
        cursor: pointer;
        &:hover {
            color: $color-orange;
        }
    }
}
</style>
