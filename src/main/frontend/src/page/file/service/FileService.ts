/****************************************************
 * 创建人：  @author wanglei
 * 创建时间: 2019-07-11 13:55:33
 * 项目名称：dfas-common-schedule
 * 文件名称: FileService.ts
 * 文件描述: @Description: 基础任务表 服务类
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

import AxiosFun from "../../../api/AxiosFun";
import { WinResponseData } from "../../common/vo/BaseVO";
import FileReqVO from "../vo/FileReqVO";
/**
 * <p>
 * 基础任务表 服务类
 * </p>
 *
 * @author wanglei
 * @since 2019-07-11 13:55:33
 */
export default class FileService {
    /**
     *  列表查询
     *
     * @Title: list
     * @param reqVO
     * @return List<File>
     * @throws
     * @author: wanglei
     * @Date:  2019-07-11 13:55:33
     */
    public list(reqVO: FileReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.commonFileServiceName + "/files/list",
            reqVO
        );
    }

    /**
     * 分页列表查询
     *
     * @Title: pageList
     * @param reqVO
     * @return List<File>
     * @throws
     * @author: wanglei
     * @Date:  2019-07-11 13:55:33
     */
    public pageList(reqVO: FileReqVO): Promise<WinResponseData> {
        return AxiosFun.post(
            AxiosFun.commonFileServiceName + "/files/list",
            reqVO
        );
    }

    /**
     * 文件下载
     *
     * @Title: synchronizeTask
     * @param file
     * @return
     * @throws
     * @author: wanglei
     * @Date:  2019-07-11 13:55:33
     */
    public deleteFile(id): Promise<WinResponseData> {
        return AxiosFun.winDelete(
            AxiosFun.commonFileServiceName + "/files/" + id
        );
    }
}
