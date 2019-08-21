
<template>
    <win_fdialog :title="getLock?'解屏':'锁屏'" :visible.sync="layoutReqVO.lockisOpen" :close-on-click-modal="false" width="420px" :show-close="!getLock" custom-class="lockScree">
        <win_form :inline="true">
            <div class="form_content">
                <win_form_item label="登录密码">
                    <win_input :placeholder="getLock?'请输入登录密码进行解屏':'请输入登录密码进行锁屏'" autocomplete="off" type="password" v-model="loginPassword"></win_input>
                </win_form_item>
            </div>
        </win_form>
        <div slot="footer" class="dialog-footer">
            <el-button v-if="!getLock" @click="close">取 消</el-button>
            <el-button type="warning" v-if="getLock" @click="handleSolutionLock">确 认 解 屏</el-button>
            <el-button type="warning" @click="handleSubmitLock" v-else>确 认 锁 屏</el-button>
        </div>
    </win_fdialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { LayoutReqVO } from "./vo/LayoutVO";
import { win_fdialog } from "@win-frond-frameworks/biz-common";
import { win_button } from "@win-frond-frameworks/biz-common";
import { win_form, win_form_item } from "@win-frond-frameworks/biz-common";
import { win_input } from "@win-frond-frameworks/biz-common";
import { gettLocalStore } from "../assets/js/localStore";
@Component({
    components: { win_fdialog, win_button, win_form, win_form_item, win_input }
})
export default class Lock extends Vue {
    loginPassword: string = "";
    @Prop()
    layoutReqVO: LayoutReqVO;
    @Prop()
    inFullCreeen;
    /***锁屏幕 */
    handleSubmitLock() {
        this.$emit("handleSubmitLock", this.loginPassword);
        this.loginPassword = "";
    }
    /***解屏幕 */
    handleSolutionLock(loginPassword) {
        this.$emit("handleSolutionLock", this.loginPassword);
        this.loginPassword = "";
    }

    get getLock(): boolean {
        if (this.layoutReqVO.nameLock) {
            return true;
        } else {
            return false;
        }
    }

    close() {
        this.$emit("closeLock");
    }
    mounted() {
        if (localStorage.getItem("lockName")) {
            this.handleSubmitLock();
        }
    }
}
</script>
<style lang="scss" scoped>
.lockScree {
    .form_content {
        margin-bottom: 0px;
    }
    .v-modal {
        background-color: red;
    }
}
</style>