/* @全局头部组件
 * @Author: mikey.zhz
 * @Date: 2019-05-21 13:42:17 
 * @Last Modified time: 2019-05-21 13:10:04
 */

<template>
    <section class="header-container">
        <div class="logo-container">
            <span @mouseenter="handleOpenMenu" @mouseleave="handleCloseMenu" class="win win-more"></span>
            <!-- <img src="../assets/image/logo.png" width="33" height="35" @mouseenter="handleOpenMenu" @mouseleave="handleCloseMenu"> -->
            <span class="logo-text">赢 · 投资</span>
        </div>
        <div class="user-container">
            <!-- <span :class="['has', 'icon-22']" @click="handleOpenCard"></span> -->
            <span :class="['icon','win', 'win-lock']" @click="handleLocking">
                <i>锁屏</i>
            </span>
            <span :class="['icon', 'win','win-mask']" @click="handlefullScree">
                <i>全屏</i>
            </span>
            <span class="user-img">
                <img src="../assets/image/user.png" width="28" height="28">
            </span>
            <span class="user" @click="operationUser">用户_操作员</span>
            <i class="more-userinfo"></i>
        </div>
        <!---消息区域---->
        <div class="card-container" v-if="cavrIsOpen">
            <Cavr></Cavr>
        </div>
        <transition name="hide">
            <div class="userInfo-container" v-if="layoutReqVO.luserInfoOpen">
                <LuserInfo @modifyPassWord="modifyPassWord" :userInfoOpen="luserInfoOpen" @closeUserInfo="closeUserInfo"></LuserInfo>
            </div>
        </transition>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Fast from "./LFast.vue";
import Cavr from "./Lcard.vue";
import LuserInfo from "./LuserInfo.vue";
import { LayoutReqVO } from "./vo/LayoutVO";
import { setTimeout, clearTimeout } from "timers";
@Component({ components: { Fast, Cavr, LuserInfo } })
export default class Header extends Vue {
    // d: string = "12121313121";
    cavrIsOpen: boolean = false;
    luserInfoOpen: boolean = false;
    passWordOpen: boolean = false;
    isMenuOpen: boolean = false;
    time;
    @Prop()
    layoutReqVO: LayoutReqVO;
    @Prop()
    inFullCreeen: Function;

    //切换消息框开关
    handleOpenCard() {
        this.cavrIsOpen = !this.cavrIsOpen;
    }

    handleOpenMenu() {
        if (this.time) {
            clearTimeout(this.time);
        }
        if (this.layoutReqVO.secondMeunIsOpen) {
            return;
        }
        this.time = setTimeout(() => {
            this.layoutReqVO.secondMeunIsOpen = true;
            this.isMenuOpen = true;
        }, 500);
    }

    handleCloseMenu() {
        if (!this.isMenuOpen) {
            clearTimeout(this.time);
        }
    }
    operationUser() {
        this.layoutReqVO.luserInfoOpen = !this.layoutReqVO.luserInfoOpen;
    }
    modifyPassWord() {
        this.layoutReqVO.passwordController = true;
        this.luserInfoOpen = false;
    }
    closeUserInfo() {
        this.layoutReqVO.luserInfoOpen = false;
    }
    handleLocking() {
        this.layoutReqVO.lockisOpen = true;
    }
    handlefullScree() {
        this.inFullCreeen();
    }
}
</script>
<style lang="scss" scoped>
@import "../assets/style/element.scss";
.header-container {
    position: absolute;
    display: flex;
    left: 0;
    right: 0;
    top: 0;
    height: 48px;
    padding: 0 40px 0 16px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: $color-assist;
    padding-left: 16px;
    .logo-container {
        img,
        span {
            display: inline-block;
            vertical-align: middle;
            cursor: pointer;
            &.logo-text {
                margin-left: 22px;
                font-size: 22px;
                color: $color-white;
            }
        }
    }
    .user-container {
        span {
            display: inline-block;
            vertical-align: middle;
            cursor: pointer;
            &.icon-22 {
                position: relative;
                height: 10px;
                padding-right: 20px;
                font-size: 14px;
                border-right: 1px solid #707070;
                &.has::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: 18px;
                    width: 6px;
                    height: 6px;
                    background: $color-red;
                    border-radius: 50%;
                }
            }
            .el-icon-lock {
                &::after {
                    color: #fff;
                }
            }
            &.user-img {
                width: 28px;
                height: 28px;
                margin: 0 12px;
                border-radius: 50%;
            }
            &.user {
                font-size: 12px;
                color: $color-font6;
            }
            & + .more-userinfo {
                height: 0;
                width: 0;
                border: 6px solid transparent;
                border-top-color: #444e69;
                z-index: 9999;
                position: absolute;
                top: 22px;
                right: 22px;
                cursor: pointer;
            }
        }
    }
    .card-container {
        position: fixed;
        top: 40px;
        right: 106px;
        z-index: 100;
    }
    .userInfo-container {
        position: fixed;
        top: 60px;
        right: 26px;
        z-index: 100;
    }
    .icon {
        position: relative;
        display: inline-block;
        margin-right: 10px;
        color: #fff;
        font-size: 14px;
        z-index: 99;
        i {
            display: none;

            position: absolute;
            top: 24px;
            left: -6px;
            width: 30px;
            padding: 6px 10px;
            border-radius: 4px;
            background: #444e69;
            color: #fff;
            font-size: 12px;
            font-style: normal;
            &::after {
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
        &:hover i {
            display: inline-block;
        }
    }
    .win-more {
        display: inline-block;
        vertical-align: middle;
        &:hover {
            &::before {
                color: #ff900d;
            }
        }
        &::before {
            color: #adb5bb;
            font-size: 17px;
        }
    }
}
</style>
