/* @card组件
 * @Author: mikey.zhz
 * @Date: 2019-05-21 13:42:17 
 * @Last Modified time: 2019-05-21 13:10:04
 * @props:[messageTitle:string[标题],messageList:Array(消息栏循环的内容,ex:[{id:1,title:"关于赢投资平台",time:"2019.05.27"}]]
 * @无callback
 */)

<template>
    <section class="card-container">
        <div class="header">
            <span>{{messageTitle}}</span>
            <span class="more">查看全部</span>
        </div>
        <div class="content" v-for="item in messageList" :key="item.id">
            <p class="title">{{item.title}}</p>
            <p class="time">发布时间:{{item.time}}</p>
        </div>
    </section>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class Card extends Vue {
    @Prop()
    messageTitle: string;

    @Prop({
        default() {
            return [
                { title: "首页", time: "2019-05-31 13:18:07" },
                { title: "分控管理1", time: "2019-05-31 13:18:07" },
                { title: "分控管理2", time: "2019-05-31 13:18:07" },
                { title: "分控管理3", time: "2019-05-31 13:18:07" },
                { title: "分控管理4", time: "2019-05-31 13:18:07" },
                { title: "分控管理5", time: "2019-05-31 13:18:07" }
            ];
        }
    })
    messageList: Array<string>;
}
</script>

<style lang="scss" scoped>
@import "../assets/style/element.scss";
.card-container {
    width: 416px;
    background: #323952;
    box-sizing: border-box;
    .header {
        display: flex;
        justify-content: space-between;
        height: 46px;
        line-height: 46px;
        padding: 0 24px 0 20px;
        color: $color-white;
        font-size: 14px;
        text-align: justify-content;
        .more {
            color: $color-red;
            cursor: pointer;
        }
    }
    .content {
        padding: 8px 24px 8px 20px;
        background: transparent;
        box-sizing: border-box;
        border: 1px solid $color-background-hover;
        &:last-of-type {
            border: 1px solid transparent;
        }
        cursor: pointer;
        .title {
            color: $color-white;
            font-size: $font-size4;
        }
        .time {
            color: #999;
            font-size: 12px;
        }
        &:hover {
            background: $color-background-hover;
            .title {
                color: $color-orange;
            }
        }
    }
}
</style>
