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

    contentTypeItems = [
        { code: "txt", name: "txt" },
        { code: "jpg", name: "jpg" },
        { code: "pdf", name: "pdf" }
    ];
}
