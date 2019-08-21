<template>
    <div class="container">

        <win_form :inline="true" ref="opLogForm" :model="reqVO">

            <div class="form_content">
                <win_form_item style="margin-left: 0px">
                    <el-upload class="upload-demo" :action="actionUrl" multiple :limit="3" :on-success="handleSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </win_form_item>
                <win_form_item label="文件名称">
                    <win_input suffix-icon="xxxx" v-model="reqVO.name"></win_input>
                </win_form_item>
                <win_form_item label="文件类型">
                    <win_select v-model="reqVO.contentType" filterable placeholder="请选择">
                        <win_option v-for="item in contentTypeItems" :key="item.code" :label="item.name" :value="item.code"></win_option>
                    </win_select>
                </win_form_item>
                <win_form_item label="文件描述">
                    <win_input suffix-icon="xxxx" v-model="reqVO.description"></win_input>
                </win_form_item>
                <win_form_item>
                    <div class="form-button">
                        <win_button @click="query()" type="primary">查询</win_button>
                        <win_button @click="reset()" type="default">重置</win_button>
                    </div>
                </win_form_item>
            </div>
        </win_form>

        <div style="margin-top:-40px">
            <win_table :data="pageVO.list" style="width: 100%" max-height="600px" :show-index="false" :show-selection=false>
                <win_table_column prop="name" label="文件名称"></win_table_column>
                <win_table_column prop="size" label="文件大小(字节)"></win_table_column>
                <win_table_column prop="uploadDate" label="上传时间"></win_table_column>
                <win_table_column prop="md5" label="文件MD5"></win_table_column>
                <win_table_column prop="description" label="文件描述"></win_table_column>
                <win_table_column label="操作" width="180">
                    <template slot-scope="scope">
                        <div class="operate">
                            <span @click="deleteFile(scope.row.id)">删除</span>
                            <a class='download' :href='downloadhttp+scope.row.name+"/"+scope.row.id' download="" title="下载" style="color: turquoise;">下载</a>
                            <!-- <span @click="exec(scope.row)">执行</span> -->
                        </div>
                    </template>
                </win_table_column>
            </win_table>
        </div>
        <win_pagination v-bind:child-msg="pageVO" @callFather="pageQuery"></win_pagination>

    </div>
</template>
<script lang="ts">
import FileController from "../controller/FileController";
import Component from "vue-class-component";
export default class FileView extends FileController {}
</script>
<style lang="scss" scoped>
div.jsoneditor-outer {
    width: 80px;
}
</style>
