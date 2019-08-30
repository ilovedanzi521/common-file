/****************************************************
 * 创建人：  @author wanglei
 * 创建时间: 2019-07-11 13:55:33
 * 项目名称：dfas-common-schedule
 * 文件名称: FileReqVO.ts
 * 文件描述: @Description: 文件查询 请求VO
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import { BaseReqVO } from "../../common/vo/BaseVO";

/**
 * <p>
 * 基础任务表 请求VO
 * </p>
 *
 * @author wanglei
 * @since 2019-07-11 13:55:33
 */

export default class FileReqVO extends BaseReqVO {
    /**
     * 文件名称
     */
    public name: string;
    /**
     * MD5
     */
    public md5: string;
    /**
     * 文件路径
     */
    public filepathId: number;
}
