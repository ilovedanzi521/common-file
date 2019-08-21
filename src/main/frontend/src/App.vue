/* @网站的.vue文件入口
 * @Author: mikey.zhz 
 * @Date: 2019-05-22 09:02:56 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-30 23:03:26
 */
<template>
    <section>
        <router-view></router-view>
    </section>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class App extends Vue {}
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
