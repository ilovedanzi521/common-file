<template>
    <div class="container">
        <!--头部--->
        <Header :layoutReqVO="layoutReqVO" :inFullCreeen="inFullCreeen"></Header>
        <Ltab :layoutReqVO="layoutReqVO"></Ltab>
        <!---快速区域---->
        <!--tab-@deleteFastItem删除快速键事件----->
        <Fast :layoutReqVO="layoutReqVO" @deleteFastItem="deleteFastItem" @gotoPath="gotoPath"></Fast>
        <!---快速区域---->
        <!--头部--->
        <!--侧边栏--->
        <transition name="hide">

            <Lmask @closeAll="closeAllPanle" v-if="layoutReqVO.secondMeunIsOpen"></Lmask>

        </transition>
        <transition name="fade">

            <Aside :layoutReqVO="layoutReqVO" v-if="layoutReqVO.secondMeunIsOpen"></Aside>

        </transition>
        <!--一级菜单-@changeSecondMenu点击切换面板事件--->
        <transition name="fade">
            <Meun :layoutReqVO="layoutReqVO" @changeSecondMenu="changeSecondMenu" v-if="layoutReqVO.secondMeunIsOpen"></Meun>
        </transition>

        <!--二级菜单-@gotoPath跳转到选中的路由事件-@toggleFastItem切换添加删除快速键的事件----->
        <transition name="fade">
            <div v-if="layoutReqVO.stwichController.switchsScondMeunIsDetailed" class="secondMeun">
                <SecondMenu :layoutReqVO="layoutReqVO" @gotoPath="gotoPath" @toggleFastItem="toggleFastItem"></SecondMenu>
            </div>
        </transition>
        <!--二级菜单-->

        <!--侧边栏--->
        <!--右侧主边内容-@closeMenusPanle点击body关闭菜单面板-->
        <Main>
            <!--路由页面切换--->
            <transition name="fade">
                <router-view @closeAll="closeAllPanle"></router-view>
            </transition>
            <!--路由页面切换--->
            <!--底部--->
            <Footer></Footer>
            <!--底部--->
        </Main>
        <!--右侧主边内容--->
        <!--修改密码--->
        <PassWord :layoutReqVO="layoutReqVO" @modifyPassWord="modifyPassWord"></PassWord>
        <!--修改密码--->
        <!--锁频--->
        <Lock :layoutReqVO="layoutReqVO" @handleSubmitLock="handleLockScreen" @handleSolutionLock="handleSolutionScreen" @closeLock="closeLock" :inFullCreeen="inFullCreeen"></Lock>

        <!--锁频--->

    </div>
</template>
<script lang="ts">
import LayoutController from "./controller/layoutControllers";
import "./style/style.scss";
export default class Layout extends LayoutController {}
</script>
<style lang="scss" scoped>
@import "../assets/style/element.scss";
</style>