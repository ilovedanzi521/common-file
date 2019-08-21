/* @全局左侧边框组件
 * @Author: mikey.zhz
 * @Date: 2019-05-21 13:42:17 
 * @Last Modified time: 2019-05-21 13:10:04
 */

<template>

    <section class="aside-container">
        <div>
            <p :class="['icon','win' ,item.menuIcon, {'active':item.id===layoutReqVO.firstMenuIndex}]" v-for="(item,index) in layoutReqVO.firstMents" :key="index" @mouseover="handleSecondMeunOpen(item.id)"></p>
        </div>
    </section>

</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { LayoutReqVO } from "./vo/LayoutVO";
// import { BaseConst } from "@win-frond-frameworks/trade-biz";
import _ from "lodash";
import { setTimeout, clearTimeout } from "timers";

@Component({})
export default class FristMenus extends Vue {
    // s = BaseConst.Add;
    time;
    isFirstOpen: Boolean = false;
    @Prop()
    layoutReqVO: LayoutReqVO;
    handleSecondMeunOpen(id) {
        // if (this.time) {
        //     clearTimeout(this.time);
        // }
        // if (this.layoutReqVO.secondMeunIsOpen) {
        //     this.layoutReqVO.firstMenuIndex = id;
        //     return;
        // }
        // // 判读鼠标第一次进入的状态值，是否展开menu
        // this.time = setTimeout(() => {
        //     this.layoutReqVO.firstMenuIndex = id;
        //     this.layoutReqVO.secondMeunIsOpen = true;
        //     this.isFirstOpen = true;
        // }, 300);
        this.layoutReqVO.firstMenuIndex = id;
        this.layoutReqVO.secondMeunIsOpen = true;
    }
    firstMenuIsOpen() {
        if (this.layoutReqVO.secondMeunIsOpen) {
            this.isFirstOpen = false;
            return;
        }
        if (this.isFirstOpen) {
            return;
        } else {
            clearTimeout(this.time);
            this.isFirstOpen = false;
        }
    }
}

// };
</script>

<style lang="scss" scoped>
@import "../assets/style/element.scss";
.aside-container {
    position: absolute;
    left: 0;
    top: 48px;
    bottom: 0;
    width: 70px;
    background: $color-assist;
    text-align: center;
    font-size: 20px;
    z-index: 2;
    .icon {
        height: 52px;
        line-height: 52px;
        cursor: pointer;
        //hover 后加
        // &:hover{
        //   background: #1F2640;
        //   &::before{
        //     color:$color-orange;
        //   }
        // }
        &::before {
            color: #adb5bb;
        }
        &.active {
            background: #1f2640;
            &::before {
                color: $color-orange;
            }
        }
    }
    .menu-first {
        position: absolute;
        left: 70px;
        top: 0;
        bottom: 0;
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
            &.active {
                color: $color-orange;
                background: #1f2640;
                .icon-14::before {
                    color: $color-orange;
                }
            }
        }
    }
}
</style>
