package com.win.dfas.controller;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.IoUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.SecureUtil;
import com.github.pagehelper.PageInfo;
import com.mongodb.client.gridfs.GridFSBucket;
import com.win.dfas.common.util.WinExceptionUtil;
import com.win.dfas.common.vo.WinResponseData;
import com.win.dfas.entity.FileDocument;
import com.win.dfas.entity.ResponseModel;
import com.win.dfas.exception.FileExceptionEnum;
import com.win.dfas.service.IFileService;
import com.win.dfas.util.FileContentTypeUtils;
import com.win.dfas.vo.request.FileReqVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("files")
@Slf4j
public class FileController {

    @Autowired
    private IFileService fileService;

    @Autowired
    private GridFSBucket gridFSBucket;

    /**
     * 列表数据
     * @return
     */
    @PostMapping("/list")
    public WinResponseData list(@RequestBody FileReqVO fileReqVO){
        PageInfo<FileDocument> list = fileService.listFilesByPage(fileReqVO);
        return WinResponseData.handleSuccess("成功",list);


    }

    /**
     * 在线显示文件
     * @param id 文件id
     * @return
     */
    @GetMapping("/view/{id}")
    public WinResponseData  serveFileOnline(@PathVariable String id) {
        Optional<FileDocument> file = fileService.getById(id);
        ResponseEntity<Object> rtn;
        if (file.isPresent()) {
            rtn= ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "fileName=" + file.get().getName())
                    .header(HttpHeaders.CONTENT_TYPE, file.get().getContentType())
                    .header(HttpHeaders.CONTENT_LENGTH, file.get().getSize() + "").header("Connection", "close")
                    .header(HttpHeaders.CONTENT_LENGTH , file.get().getSize() + "")
                    .body(file.get().getContent());
        } else {
            rtn= ResponseEntity.status(HttpStatus.NOT_FOUND).body("File was not found");
        }
        return WinResponseData.handleSuccess(rtn);
    }

    /**
     * 下载附件
     * @param id
     * @return
     * @throws UnsupportedEncodingException
     */
    @GetMapping("/download/{finame}/{id}")
    public WinResponseData downloadFileById(@PathVariable String finame, @PathVariable String id, HttpServletResponse response) throws IOException {
        Optional<FileDocument> file = fileService.getById(id);
        if(file.isPresent()){
            response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; fileName=" + URLEncoder.encode(file.get().getName() , "utf-8"));
            response.setHeader(HttpHeaders.CONTENT_TYPE, "application/octet-stream");
            response.setHeader(HttpHeaders.CONTENT_LENGTH, file.get().getSize() + "");
            response.setHeader("Connection", "close");
            byte[] content = file.get().getContent();
            int sumLen = content.length;
            int i = 0;
            do{
                int max = sumLen-i>1024?1024:sumLen-i;
                response.getOutputStream().write(content, i, max);
                i=i+1024;
            }while(sumLen>i);
        }else {
            return WinResponseData.handleError("File was not found");
        }
        return WinResponseData.handleSuccess("成功");
    }

    /**
     * 表单上传文件
     * 当数据库中存在该md5值时，可以实现秒传功能
     * @param file 文件
     * @return
     */
    @PostMapping("/upload")
    public WinResponseData formUpload(@RequestParam("file") MultipartFile file){
        try {
            if(file != null && !file.isEmpty()){
                String fileMd5 = SecureUtil.md5(file.getInputStream());
                FileDocument fileDocument = fileService.saveFile(fileMd5 , file);
                log.info("FileDocument:{}",fileDocument);
            }else {
                return WinResponseData.handleError("请传入文件");
            }
        }catch (Throwable ex){
            log.error("上传异常{}",ex.getCause());
            throw WinExceptionUtil.winException(FileExceptionEnum.UPLOAD_ERROR);
        }
        return WinResponseData.handleSuccess("上传成功");
    }


    /**
     * 删除附件
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    public WinResponseData deleteFile(@PathVariable String id){
        if(!StrUtil.isEmpty(id)){
            fileService.removeFile(id , true);
        }else {
            return WinResponseData.handleError("请传入文件id");
        }
        return WinResponseData.handleSuccess("删除成功");
    }
}
