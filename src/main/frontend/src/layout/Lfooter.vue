/* @全局底部组件
 * @Author: mikey.zhaopeng 
 * @Date: 2019-05-31 00:48:32 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-07-15 09:41:19
 */


<template>
    <footer class="footer-container">
        <span class="transaction-time">交易日期 ：{{init}}</span>
    </footer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Footer extends Vue {
    date: Date = new Date();
    get init() {
        this.date = new Date();
        //年
        var year = this.date.getFullYear();
        //月
        var month = this.date.getMonth() + 1;
        //日
        var day = this.date.getDate();
        //时
        var hh = this.date.getHours();
        //分
        var mm = this.date.getMinutes();
        //秒
        var ss = this.date.getSeconds();
        // var rq=year+"年"+month+"月"+day+"日"+hh+":"+mm+":"+ss;
        var data = year + "年" + month + "月" + day + "日";
        return data;
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/element.scss";
.footer-container {
    position: absolute;
    bottom: 0;
    height: 22px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-right: 16px;
    background: $color-footer-bg;
    .transaction-time {
        display: inline-block;
        vertical-align: middle;
        font-size: 12px;
        color: $color-font6;
    }
}
</style>