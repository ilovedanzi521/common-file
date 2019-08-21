/****************************************************
 * 创建人：  @author wanglei
 * 创建时间: 2019-07-11 13:55:33
 * 项目名称：dfas-common-schedule
 * 文件名称: CellTaskRepVO.ts
 * 文件描述: @Description: 基础任务表 返回VO
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/
import { BaseRepVO } from "../../common/vo/BaseVO";

/**
 * <p>
 * 查询 返回VO
 * </p>
 *
 * @author wanglei
 * @since 2019-07-11 13:55:33
 */

export default class FileRepVO extends BaseRepVO {
    /**
     * 任务类型
     */
    public name: string;
    /**
     * 文件大小
     */
    public size: number;
    /**
     * 上传时间
     */
    public uploadDate: string;
    /**
     * 文件MD5值
     */
    public md5: string;
    /**
     *文件内容
     */
    public content: string;
    /**
     * 文件类型
     */
    public contentType: string;
    /**
     * 文件后缀名
     */
    public suffix: string;
    /**
     * 文件描述
     */
    public description: string;
    /**
     * 大文件管理GridFS的ID
     */
    public gridfsId: string;
}
