/****************************************************
 * 创建人: @author wanglei
 * 创建时间: 2019/8/30/14:31
 * 项目名称: dfas-common-file
 * 文件名称: CollectionSingleton.java
 * 文件描述: @Description: mongodb表目录单例
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

package com.win.dfas.util;

/**
 * 包名称：com.win.dfas.util
 * 类名称：CollectionSingleton
 * 类描述：mongodb表目录单例
 * 创建人：@author wanglei
 * 创建时间：2019/8/30/14:31
 */
public class CollectionSingleton {
    private CollectionSingleton(){}


    public static final String DEFALUTNAME = "fileDatas";
    private String collectionName;
    public String getCollectionName() {
        return this.collectionName;
    }

    public void setCollectionName(int i) {
        this.collectionName = DEFALUTNAME+i;
    }

    public static final CollectionSingleton getInstance(){
        return Holder.LAZY;
    }

    private static class Holder{
        private static final CollectionSingleton LAZY = new CollectionSingleton();
    }
}
