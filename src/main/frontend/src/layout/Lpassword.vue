<template>
    <win_fdialog title="修改密码" :visible.sync="layoutReqVO.passwordController" @close="close" :close-on-click-modal="false" width="420px">
        <win_form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm">
            <div class="form_content">
                <win_form_item label="用户名">
                    <win_input placeholder="用户名" v-model="layoutReqVO.userName" :disabled="true"></win_input>
                </win_form_item>
            </div>
            <div class="form_content">
                <win_form_item label="修改密码" prop="pass">
                    <win_input placeholder="请输入密码" v-model="ruleForm.pass" autocomplete="off" type="password"></win_input>
                </win_form_item>
            </div>
            <div class="form_content">
                <win_form_item label="请确认密码" prop="checkPass">
                    <win_input placeholder="请确认密码" v-model="ruleForm.checkPass" autocomplete="off" type="password"></win_input>
                </win_form_item>
            </div>
        </win_form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="handleSubmitPassWord('ruleForm')">确 认</el-button>
        </div>
    </win_fdialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import { win_fdialog } from "@win-frond-frameworks/biz-common";
import { win_button } from "@win-frond-frameworks/biz-common";
import { win_form, win_form_item } from "@win-frond-frameworks/biz-common";
import { win_input } from "@win-frond-frameworks/biz-common";
import { LayoutReqVO } from "./vo/LayoutVO";
@Component({
    components: {
        win_fdialog,
        win_button,
        win_form,
        win_form_item,
        win_input
    }
})
export default class Password extends Vue {
    dialogFormVisible: boolean = true;
    ruleForm = {
        pass: "",
        checkPass: ""
    };

    validatePass2 = (rule, value, callback) => {
        if (value === "") {
            callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm.pass) {
            callback(new Error("两次输入密码不一致!"));
        } else {
            callback();
        }
    };

    rules = {
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPass: [{ validator: this.validatePass2, trigger: "blur" }]
    };

    @Prop()
    layoutReqVO: LayoutReqVO;

    handleSubmitPassWord(formName) {
        let form: any = this.$refs[formName];
        form.validate(valid => {
            if (valid) {
                let params = {
                    userId: this.layoutReqVO.userName,
                    loginPassword: this.ruleForm.checkPass
                };
                this.$emit("modifyPassWord", params);
            } else {
                alert("请按要求填写");
                return false;
            }
        });
    }
    close() {
        this.layoutReqVO.passwordController = false;
    }
}
</script>
<style lang="scss" scoped>
</style>