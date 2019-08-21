<template>
    <div class="mask" @click="closeAll"></div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import { LayoutReqVO } from "./vo/LayoutVO";

@Component({})
export default class Lmasks extends Vue {
    @Emit("closeAll")
    closeAll() {}
}
</script>
<style lang="scss" scoped>
.mask {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 47px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
    cursor: pointer;
}
</style>