/* @全局main组件
 * @Author: mikey.zhz
 * @Date: 2019-05-21 13:42:17 
 * @Last Modified time: 2019-05-21 13:10:04
 */
<template>
    <section class="main-container" @click="closeMenusPanle">
        <slot></slot>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";

@Component({})
export default class Main extends Vue {
    @Emit("closeMenusPanle")
    closeMenusPanle() {
        return false;
    }
}
</script>
</script>

<style lang="scss" scoped>
@import "../assets/style/element.scss";
.main-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 84px;
    bottom: 0;
    background: $color-main2;
    padding: 0 0 0 0;
    overflow: hidden;
    box-sizing: border-box;
    cursor: pointer;
}
</style>
