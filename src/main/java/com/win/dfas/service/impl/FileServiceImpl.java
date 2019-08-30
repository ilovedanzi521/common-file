package com.win.dfas.service.impl;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.io.IoUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.ObjectUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSDownloadStream;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.mongodb.client.result.DeleteResult;
import com.win.dfas.entity.FileDocument;
import com.win.dfas.entity.FilePathEntity;
import com.win.dfas.service.IFileService;
import com.win.dfas.util.CollectionSingleton;
import com.win.dfas.util.FileContentTypeUtils;
import com.win.dfas.vo.request.FileReqVO;
import com.win.dfas.vo.response.FilePathRepVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Field;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.data.redis.connection.ConnectionUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class FileServiceImpl implements IFileService {

//    public static String collectionName = CollectionSingleton.getInstance().getCollectionName();
    private static String collectionFilePath = "filePaths";

    @Autowired private MongoTemplate mongoTemplate;
    @Autowired private GridFsTemplate gridFsTemplate;
    @Autowired private GridFSBucket gridFSBucket;

    /**
     * js文件流上传附件
     * @param fileDocument
     * @param inputStream
     * @return
     */
    @Override
    public FileDocument saveFile(FileDocument fileDocument, InputStream inputStream) {
        //已存在该文件，则实现秒传
        FileDocument dbFile = getByMd5(fileDocument.getMd5());
        if(dbFile != null){
            return dbFile;
        }

        //GridFSInputFile inputFile = gridFsTemplate

        String gridfsId = uploadFileToGridFS(inputStream  , fileDocument.getContentType());
        fileDocument.setGridfsId(gridfsId);
        fileDocument = mongoTemplate.save(fileDocument , CollectionSingleton.getInstance().getCollectionName());
        return fileDocument;
    }

    /**
     * 表单上传附件
     * @param md5
     * @param file
     * @return
     */
    @Override
    public FileDocument saveFile(String md5, MultipartFile file) {
        //已存在该文件，则实现秒传
        FileDocument fileDocument = getByMd5(md5);
        if(fileDocument != null){
            return fileDocument;
        }

        fileDocument = new FileDocument();
        fileDocument.setName(file.getOriginalFilename());
        fileDocument.setSize(file.getSize());
        fileDocument.setUploadDate(new Date());
        fileDocument.setMd5(md5);
        String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
        fileDocument.setSuffix(suffix);
        fileDocument.setContentType(FileContentTypeUtils.getContentType(suffix));
        log.info("fileDocument:{}",fileDocument);
        try {
            String gridfsId = uploadFileToGridFS(file.getInputStream() , file.getContentType());
            fileDocument.setGridfsId(gridfsId);
            fileDocument = mongoTemplate.save(fileDocument , CollectionSingleton.getInstance().getCollectionName());
        }catch (IOException ex){
            ex.printStackTrace();
        }
        return fileDocument;
    }

    /**
     * 上传文件到Mongodb的GridFs中
     * @param in
     * @param contentType
     * @return
     */
    private String uploadFileToGridFS(InputStream in , String contentType){
        String gridfsId = IdUtil.simpleUUID();
        //文件，存储在GridFS中
        gridFsTemplate.store(in, gridfsId , contentType);
        return gridfsId;
    }

    /**
     * 删除附件
     * @param id 文件id
     * @param isDeleteFile 是否删除文件
     */
    @Override
    public void removeFile(String id, boolean isDeleteFile) {
        FileDocument fileDocument = mongoTemplate.findById(id , FileDocument.class , CollectionSingleton.getInstance().getCollectionName());
        if(fileDocument != null){
            Query query = new Query().addCriteria(Criteria.where("_id").is(id));
            DeleteResult result = mongoTemplate.remove(query , CollectionSingleton.getInstance().getCollectionName());
            log.info("result:" + result.getDeletedCount());
            if(isDeleteFile){
                Query deleteQuery = new Query().addCriteria(Criteria.where("filename").is(fileDocument.getGridfsId()));
                gridFsTemplate.delete(deleteQuery);
            }
        }
    }

    /**
     * 查询附件
     * @param id 文件id
     * @return
     * @throws IOException
     */
    @Override
    public Optional<FileDocument> getById(String id){
        FileDocument fileDocument = mongoTemplate.findById(id , FileDocument.class , CollectionSingleton.getInstance().getCollectionName());
        if(fileDocument != null){
            Query gridQuery = new Query().addCriteria(Criteria.where("filename").is(fileDocument.getGridfsId()));
            try {
                GridFSFile fsFile = gridFsTemplate.findOne(gridQuery);
                GridFSDownloadStream in = gridFSBucket.openDownloadStream(fsFile.getObjectId());
                if(in.getGridFSFile().getLength() > 0){
                    GridFsResource resource = new GridFsResource(fsFile, in);
                    fileDocument.setContent(IoUtil.readBytes(resource.getInputStream()));
                    return Optional.of(fileDocument);
                }else {
                    fileDocument = null;
                    return Optional.empty();
                }
            }catch (IOException ex){
                ex.printStackTrace();
            }
        }
        return Optional.empty();
    }

    /**
     * 根据md5获取文件对象
     * @param md5
     * @return
     */
    @Override
    public FileDocument getByMd5(String md5) {

        Query query = new Query().addCriteria(Criteria.where("md5").is(md5));
        FileDocument fileDocument = mongoTemplate.findOne(query , FileDocument.class , CollectionSingleton.getInstance().getCollectionName());
        return fileDocument;
    }

    @Override
    public PageInfo<FileDocument> listFilesByPage(FileReqVO fileReqVO) {
//        PageHelper.startPage(fileReqVO.getReqPageNum(),fileReqVO.getReqPageSize());
        Query query = new Query().with(new Sort(Sort.Direction.DESC, "uploadDate"));
        if(ObjectUtil.isNotEmpty(fileReqVO.getName())){
            query.addCriteria(Criteria.where("name").is(fileReqVO.getName()));
        }
        if(ObjectUtil.isNotEmpty(fileReqVO.getMd5())){
            query.addCriteria(Criteria.where("md5").is(fileReqVO.getMd5()));
        }
//        if(ObjectUtil.isNotEmpty(fileReqVO.getFilepathId())){
//            query.addCriteria(Criteria.where("filepathId").is(fileReqVO.getFilepathId()));
//        }
        int pageSize = fileReqVO.getReqPageSize();
        long skip = (fileReqVO.getReqPageNum() -1) * pageSize;
        query.skip(skip);
        query.limit(pageSize);
        Field field = query.fields();
        field.exclude("content");
        int total = mongoTemplate.findAll(FileDocument.class , CollectionSingleton.getInstance().getCollectionName()).size();
        List<FileDocument> files = mongoTemplate.find(query , FileDocument.class , CollectionSingleton.getInstance().getCollectionName());
        PageInfo<FileDocument> pageInfo = new PageInfo<FileDocument>(files);
        pageInfo.setTotal(total);
        return pageInfo;
    }

    @Override
    public void addFilePath(FilePathEntity fileEntity) {
        FilePathEntity filePathEntity = mongoTemplate.findById(fileEntity.getId(),FilePathEntity.class,collectionFilePath);
        if(filePathEntity==null){
            mongoTemplate.insert(fileEntity,collectionFilePath);
        }else{
            Query query = new Query();
            query.addCriteria(Criteria.where("id").is(fileEntity.getId()));
            Update update = new Update();
            update.set("label",fileEntity.getLabel());
            update.set("children",fileEntity.getChildren());
            mongoTemplate.updateFirst(query,update,FilePathEntity.class,collectionFilePath);
        }

    }

    private FilePathEntity getChildById(List<FilePathEntity> children, String path) {
        int id = Integer.parseInt(path);
        for (FilePathEntity child : children) {
            if(id == child.getId()){
                return child;
            }
        }
        return null;
    }

    @Override
    public void deleteFilePath(int id) {
        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(id));
        mongoTemplate.findAndRemove(query,FilePathEntity.class,collectionFilePath);
    }

    @Override
    public List<FilePathEntity> listFilePath() {
        return calculateFileCount(mongoTemplate.findAll(FilePathEntity.class,collectionFilePath));
    }

    @Override
    public boolean judgeFileSize() {
        int total = mongoTemplate.findAll(FileDocument.class , CollectionSingleton.getInstance().getCollectionName()).size();
        return total>0;
    }

    /**
     * @Title: calculateFileCount
     * @Description 计算全部节点以及子节点文件个数
     * @param filePathList
     * @return java.util.List<com.win.dfas.entity.FilePathEntity>
     * @throws
     * @author wanglei
     * @Date 2019/8/30/17:36
     */
    public List<FilePathEntity>  calculateFileCount(List<FilePathEntity> filePathList){
        for (FilePathEntity filePathEntity : filePathList) {
            List<FilePathEntity> tmpList = filePathEntity.getChildren();
            filePathEntity.setSize(getNodeFileCount(filePathEntity));
            if(CollectionUtil.isNotEmpty(tmpList)){
                calculateFileCount(tmpList);
            }
        }
        return filePathList;
    }
    /**
     * @Title: getNodeFileCount
     * @Description 获取目录下的文件数
     * @param id
     * @return long
     * @throws
     * @author wanglei
     * @Date 2019/8/30/17:40
     */
    private long getFilePathFileCount(int id){
        String collection = CollectionSingleton.DEFALUTNAME+id;
        long size = mongoTemplate.count(new Query(),FileDocument.class,collection);
        return size;
    }
    /**
     * @Title: getNodeFileCount
     * @Description 获取节点以及子节点的文件数
     * @param node
     * @return long
     * @throws
     * @author wanglei
     * @Date 2019/8/30/17:47
     */
    private long getNodeFileCount(FilePathEntity node){
        long count = getFilePathFileCount(node.getId());
        List<FilePathEntity> tmpList = node.getChildren();
        if(CollectionUtil.isNotEmpty(tmpList)){
            for (FilePathEntity child : tmpList) {
                count+=getNodeFileCount(child);
            }
        }
        return count;
    }
}
