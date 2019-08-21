package com.win.dfas.vo.response;

import com.win.dfas.common.vo.BaseReqVO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

/**
 * 包名称：com.win.dfas.vo.request
 * 类名称：FileRepVO
 * 类描述：FileRepVO
 * 创建人：@author wanglei
 * 创建时间：2019/6/11/9:38
 */
@ApiModel(value = "结果返回VO")
@Data
public class FileRepVO extends BaseReqVO {
    /**
     * 任务类型
     */
    private String name;
    /**
     * 文件大小
     */
    private Long size;
    /**
     * 上传时间
     */
    private String uploadDate;
    /**
     * 文件MD5值
     */
    private String md5;
    /**
     *文件内容
     */
    private String content;
    /**
     * 文件类型
     */
    private String contentType;
    /**
     * 文件后缀名
     */
    private String suffix;
    /**
     * 文件描述
     */
    private String description;
    /**
     * 大文件管理GridFS的ID
     */
    private String gridfsId;
}
