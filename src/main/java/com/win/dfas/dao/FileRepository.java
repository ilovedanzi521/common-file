package com.win.dfas.dao;

/**
 * 包名称：com.win.dfas.dao
 * 类名称：FileRepository
 * 类描述：文件出库入库与mongodb交互的类
 * 创建人：@author wanglei
 * 创建时间：2019/5/31/16:52
 */
import com.win.dfas.vo.File;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FileRepository extends MongoRepository<File, String> {
}
