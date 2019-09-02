/****************************************************
 * 创建人：  @author wanglei
 * 创建时间: 2019-07-11 13:55:33
 * 项目名称：dfas-common-schedule
 * 文件名称: ScheFileController.ts
 * 文件描述: @Description: 基础任务表 前端控制器
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

import { Component } from "vue-property-decorator";
import BaseController from "../../common/controller/BaseController";
import FileService from "../service/FileService";
import PageVO from "../../common/vo/PageVO";
import FileReqVO from "../vo/FileReqVO";
import FileRepVO from "../vo/FileRepVO";
import AxiosFun from "../../../api/AxiosFun";

import DialogVO from "../../common/vo/DialogVO";
import { start } from "repl";
/**
 * <p>
 * 基础任务表 前端控制器
 * </p>
 *
 * @author wanglei
 * @since 2019-07-11 13:55:33
 */
@Component({ components: {} })
export default class FileController extends BaseController {
    /** service */
    public service: FileService = new FileService();
    /** 前端请求VO */
    public reqVO: FileReqVO = new FileReqVO();
    /** 分页对象 */
    public pageVO: PageVO = new PageVO();
    /** 详情 */
    public details: FileRepVO = new FileRepVO();
    /**弹框是否显示 */
    public dialogVisible: boolean = false;
    /** 弹框title*/
    public dialogTitle: string = "";
    /** 前端请求VO */
    public addReqVO: FileReqVO = new FileReqVO();
    /**删除标志 */
    public deleteFlag: boolean = false;
    /** 上传地址*/
    public actionUrl = AxiosFun.commonFileServiceName + "/files/upload";
    /**下载 */
    public downloadhttp = AxiosFun.commonFileServiceName + "/files/download/";
    public data: any;
    expandList: number[] = [];
    treedata: any[] = [
        {
            id: "1",
            level: "1",
            label: "默认目录"
        }
    ];
    public startId: number;

    /**
     * 基础任务表  数据准备
     * @Title: mounted
     * @throws
     * @author: wanglei
     * @Date:   2019-07-11 13:55:33
     */
    public mounted() {
        this.reqVO = new FileReqVO();
        this.$nextTick(() => {
            this.query();
            this.queryFilepath();
        });
    }

    /**
     * 基础任务表列表查询
     * @Title: query
     * @throws
     * @author: wanglei
     * @Date:   2019-07-11 13:55:33
     */
    public query(): void {
        let _this = this;
        this.service.list(this.reqVO).then(res => {
            if (res.winRspType === "ERROR") {
                this.win_message_error(res.msg);
            }
            _this.pageVO = res.data;
        });
    }

    /**
     *  分页列表查询
     * @Title: pageQuery
     * @param pageVO
     * @throws
     * @author: wanglei
     * @Date:   2019-07-11 13:55:33
     */
    public pageQuery(pageVO: PageVO) {
        this.reqVO.reqPageNum = pageVO.pageNum;
        this.reqVO.reqPageSize = pageVO.pageSize;
        this.query();
    }

    /**
     *  重置查询
     * @Title: pageQuery
     * @param reqVO
     * @return com.win.dfas.common.vo.WinResponseData
     * @throws
     * @author: wanglei
     * @Date:   2019-07-11 13:55:33
     */
    public reset(): void {
        this.reqVO = new FileReqVO();
        this.query();
    }

    handleSuccess(response, file, fileList) {
        this.successMessage("上传成功");
        this.query();
    }

    /**
     * 下载文件
     */
    deleteFile(id: string) {
        this.service.deleteFile(id).then(res => {
            if (res.winRspType === "ERROR") {
                this.errorMessage("删除文件失败");
            } else {
                this.successMessage("删除文件成功");
            }
            this.query();
        });
    }
    /**
     *
     * @param data 选择节点
     */
    handleNodeClick(data) {
        this.data = data;
        if (!this.data.children || this.data.children.length == 0) {
            this.data.children = [];
        }
        if (data.level === 1) {
            this.startId = data.id;
        }
        this.reqVO.filepathId = data.id;
        this.fromPathQueryFile(this.data.id);
    }
    /**
     * 修改或新增节点input的blur操作
     * @param item
     */
    handleBlur(item) {
        this.$set(item, "isEdit", false);
        var index;
        if (this.startId) {
            for (var i = 0; i < this.treedata.length; i++) {
                if (this.treedata[i].id === this.startId && this.startId != 1) {
                    index = i;
                    break;
                } else {
                    if (this.treedata[i].id === item.id) {
                        index = i;
                        break;
                    }
                }
            }
        } else {
            if (item.level === 1) {
                for (var i = 0; i < this.treedata.length; i++) {
                    if (this.treedata[i].id === item.id) {
                        index = i;
                        break;
                    }
                }
            }
            if (item.level === 2) {
                for (var i = 1; i < this.treedata.length; i++) {
                    if (this.treedata[i].id === item.fatherId) {
                        index = i;
                        break;
                    }
                }
            }
            if (item.level === 3) {
                for (var i = 1; i < this.treedata.length; i++) {
                    for (var j = 0; j < this.treedata[i].children.length; j++) {
                        if (this.treedata[i].children[j].id === item.fatherId) {
                            index = i;
                            break;
                        }
                    }
                }
            }
        }

        this.service.addFilePath(this.treedata[index]).then(res => {
            if (res.winRspType === "ERROR") {
                this.errorMessage(res.msg);
            } else {
                this.successMessage(res.msg);
            }
            // this.expandList = [item.id];
        });
    }
    /**
     * 设置可编辑
     * @param item
     */
    edit(item) {
        this.$set(item, "isEdit", true);
    }
    /**
     * 新增事件
     */
    addCatalog() {
        this.expandList = [this.data.id];
        var id;
        this.service.getid().then(res => {
            if (res.winRspType === "ERROR") {
                this.errorMessage(res.msg);
            }
            id = res.data;
            var level;
            if (this.data.id === 1) {
                level = 1;
            } else {
                level = Number(this.data.level) + 1;
                if (level > 3) {
                    this.errorMessage("最多只能三层目录");
                    return;
                }
            }
            this.addNode(id, level, "新增目录", this.data.id);
        });
    }
    /**
     * 新增节点
     * @param id
     * @param level
     * @param label
     * @param fatherId
     */
    addNode(id, level, label, fatherId) {
        //增加一级节点
        if (this.data.id == 1) {
            let obj = {
                level: "",
                id: "",
                label: "",
                path: "",
                size: "0",
                children: []
            };
            obj.id = id;
            obj.label = label;
            obj.children = [];
            obj.level = level;
            this.expandList = [id];
            this.treedata.push(obj);
            console.log(obj);
            this.edit(obj);
        } else {
            let obj = {
                id: "",
                label: "",
                fatherId: "",
                level: "",
                path: "",
                size: "0",
                children: []
            };
            obj.id = id;
            obj.label = label;
            obj.children = [];
            obj.level = level;
            obj.fatherId = fatherId;
            this.expandList = [fatherId];
            this.data.children.push(obj);
            this.edit(obj);
            return;
        }
    }
    /**
     *  选择节点，并点击删除
     */
    delCatalog() {
        var obj;
        var level = this.data.level;
        if (this.data.children.length > 0) {
            this.warningMessage("只能删除最外节点");
            return;
        }
        if (this.data.id === 1) {
            this.warningMessage("默认目录不能删除");
            return;
        }
        this.service.judgeFileSize().then(res => {
            if (res.winRspType === "ERROR") {
                this.errorMessage(res.msg);
                return;
            } else {
                if (res.data) {
                    this.warningMessage("目录下存在文件不能删除目录");
                    return;
                } else {
                    var index1 = -1;
                    var index2 = -1;
                    var index3 = -1;
                    if (this.data.level === 1) {
                        for (var i = 1; i < this.treedata.length; i++) {
                            if (this.treedata[i].id === this.data.id) {
                                index1 = i;
                                this.treedata.splice(index1, 1);
                                break;
                            }
                        }
                    }
                    if (this.data.level === 2) {
                        for (var i = 1; i < this.treedata.length; i++) {
                            for (
                                var j = 0;
                                j < this.treedata[i].children.length;
                                j++
                            ) {
                                if (
                                    this.treedata[i].children[j].id ===
                                    this.data.id
                                ) {
                                    index1 = i;
                                    index2 = j;
                                    this.treedata[index1].children.splice(
                                        index2,
                                        1
                                    );
                                    break;
                                }
                            }
                        }
                    }
                    if (this.data.level === 3) {
                        for (var i = 1; i < this.treedata.length; i++) {
                            for (
                                var j = 0;
                                j < this.treedata[i].children.length;
                                j++
                            ) {
                                for (
                                    var k = 0;
                                    k <
                                    this.treedata[i].children[j].children
                                        .length;
                                    k++
                                ) {
                                    if (
                                        this.treedata[i].children[j].children[k]
                                            .id === this.data.id
                                    ) {
                                        index1 = i;
                                        index2 = j;
                                        index3 = k;
                                        this.treedata[index1].children[
                                            index2
                                        ].children.splice(index3, 1);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    if (index2 > -1) {
                        this.service
                            .addFilePath(this.treedata[index1])
                            .then(res => {
                                if (res.winRspType === "ERROR") {
                                    this.errorMessage(res.msg);
                                } else {
                                    this.successMessage(res.msg);
                                }
                                // this.expandList = [item.id];
                            });
                    } else {
                        if (index1 > -1) {
                            this.service
                                .deleteFilePath(this.data.id)
                                .then(res => {
                                    if (res.winRspType === "ERROR") {
                                        this.errorMessage(res.msg);
                                    } else {
                                        this.successMessage(res.msg);
                                        //treedata 刷新
                                        this.queryFilepath();
                                    }
                                });
                        }
                    }
                }
            }
            // this.expandList = [item.id];
        });
    }
    /**
     * mount页面查询
     */
    queryFilepath() {
        this.service.listFilePath().then(res => {
            if (res.winRspType === "ERROR") {
                this.errorMessage(res.msg);
            } else {
                if (!res.data || res.data.length != 0) {
                    this.treedata = res.data;
                }
            }
        });
    }
    fromPathQueryFile(filepathId) {
        var vo: FileReqVO = new FileReqVO();
        vo.filepathId = filepathId;
        this.service.list(vo).then(res => {
            if (res.winRspType === "ERROR") {
                this.win_message_error(res.msg);
            }
            this.pageVO = res.data;
        });
    }
    contentTypeItems = [
        { code: "txt", name: "txt" },
        { code: "jpg", name: "jpg" },
        { code: "pdf", name: "pdf" }
    ];
}
