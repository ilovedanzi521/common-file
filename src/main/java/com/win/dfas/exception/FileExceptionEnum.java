/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/8/21/15:20
 * 项目名称: dfas-common-file
 * 文件名称: FileE.java
 * 文件描述: @Description: 异常处理代码
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.exception;

import com.win.dfas.common.exception.IExceptionEnum;

/**
 * 包名称：com.win.dfas.exception
 * 类名称：FileE
 * 类描述：异常处理代码
 * 创建人：@author wanglei
 * 创建时间：2019/8/21/15:20
 */
public enum FileExceptionEnum implements IExceptionEnum {
    UPLOAD_ERROR("900000", "上传文件异常")

//    ID_NOT_NULL("100000", "ID不能为空")
    ;

    private String code;
    private String msg;

    FileExceptionEnum(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    @Override
    public String getCode() {
        return code;
    }

    @Override
    public String getMsg() {
        return msg;
    }
}

