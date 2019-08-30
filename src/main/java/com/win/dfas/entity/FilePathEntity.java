/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/8/28/18:02
 * 项目名称: dfas-common-file
 * 文件名称: FilePathEntity.java
 * 文件描述: @Description: 文件目录实例类
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.entity;

import lombok.Data;

import java.util.List;

/**
 * 包名称：com.win.dfas.entity
 * 类名称：FilePathEntity
 * 类描述：文件目录实例类
 * 创建人：@author wanglei
 * 创建时间：2019/8/28/18:02
 */
@Data
public class FilePathEntity {
    /**
     * path
     */
    private String nextId;
    /**
     * 节点id
     */
    private int id;
    private String label;
    /**
     * 父id
     */
    private String fatherId;
    private int level;
    private List<FilePathEntity> children;
    private long size;
}
