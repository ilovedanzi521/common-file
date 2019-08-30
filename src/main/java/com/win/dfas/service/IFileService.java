package com.win.dfas.service;

import com.github.pagehelper.PageInfo;
import com.win.dfas.entity.FileDocument;
import com.win.dfas.entity.FilePathEntity;
import com.win.dfas.vo.request.FileReqVO;
import com.win.dfas.vo.response.FilePathRepVO;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.Optional;

public interface IFileService {


    /**
     * 保存文件 - 表单
     * @param md5
     * @param file
     * @return
     */
    FileDocument saveFile(String md5, MultipartFile file);

    /**
     * 保存文件 - js文件流
     * @param fileDocument
     * @param inputStream
     * @return
     */
    FileDocument saveFile(FileDocument fileDocument, InputStream inputStream);

    /**
     * 删除文件
     * @param id
     * @param isDeleteFile 是否删除文件
     * @return
     */
    void removeFile(String id, boolean isDeleteFile);

    /**
     * 根据id获取文件
     * @param id
     * @return
     */
    Optional<FileDocument> getById(String id);

    /**
     * 根据md5获取文件对象
     * @param md5
     * @return
     */
    FileDocument getByMd5(String md5);

    /**
     * 分页查询，按上传时间降序
     * @return
     */
    PageInfo<FileDocument> listFilesByPage(FileReqVO fileReqVO);
    /**
     * @Title: addFilePath
     * @Description 增加目录
     * @param fileEntity
     * @return void
     * @throws
     * @author wanglei
     * @Date 2019/8/28/18:54
     */
    void addFilePath(FilePathEntity fileEntity);
    /**
     * @Title: deleteFilePath
     * @Description 删除目录
     * @param id
     * @return void
     * @throws
     * @author wanglei
     * @Date 2019/8/28/19:00
     */
    void deleteFilePath(int id);
    /**
     * @Title: listFilePath
     * @Description 获取文件目录
     * @param
     * @return java.util.List<com.win.dfas.entity.FilePathEntity>
     * @throws
     * @author wanglei
     * @Date 2019/8/30/13:42
     */
    List<FilePathEntity> listFilePath();
    /**
     * @Title: judgeFileSize
     * @Description 判断文件是否存在
     * @param
     * @return boolean
     * @throws
     * @author wanglei
     * @Date 2019/8/30/15:43
     */
    boolean judgeFileSize();

}
