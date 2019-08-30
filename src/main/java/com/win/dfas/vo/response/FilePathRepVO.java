/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/8/29/9:16
 * 项目名称: dfas-common-file
 * 文件名称: FilePathRepVO.java
 * 文件描述: @Description: 文件列表
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.vo.response;

import com.win.dfas.entity.FilePathEntity;

import java.util.List;

/**
 * 包名称：com.win.dfas.vo.response
 * 类名称：FilePathRepVO
 * 类描述：文件列表
 * 创建人：@author wanglei
 * 创建时间：2019/8/29/9:16
 */
public class FilePathRepVO {
    private FilePathEntity entity;
    private List<FilePathEntity> childrens;
}
