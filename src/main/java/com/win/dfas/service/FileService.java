package com.win.dfas.service;

import com.win.dfas.vo.File;

import java.util.List;

/**
 * 包名称：com.win.dfas.service.impl
 * 类名称：FileService
 * 类描述：文件操作
 * 创建人：@author wanglei
 * 创建时间：2019/5/31/16:54
 */
public interface FileService {
    /**
     * 保存文件
     * @param file
     * @return
     */
    File saveFile(File file);

    /**
     * 删除文件
     * @param id
     * @return
     */
    void removeFile(String id);

    /**
     * 根据id获取文件
     * @param id
     * @return
     */
    File getFileById(String id);

    /**
     * 分页查询，按上传时间降序
     * @param pageIndex
     * @param pageSize
     * @return
     */
    List<File> listFilesByPage(int pageIndex, int pageSize);
}
