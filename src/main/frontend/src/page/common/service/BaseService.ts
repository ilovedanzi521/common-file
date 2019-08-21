/****************************************************
 * 创建人：     @author  zenghuazhi
 * 创建时间: 2019年7月2日/下午5:52:56
 * 项目名称： baseService
 * 文件名称: BaseService
 * 文件描述: @Description: 用户、数据字典、交易市场、证券类别、交易方向的Service服务
 *
 * All rights Reserved, Designed By 投资交易团队
 * @Copyright:2016-2019
 *
 ********************************************************/

import { WinResponseData } from "../vo/BaseVO";
import { WinRspType } from "./BaseServiceVO";
import AxiosFun from "../../../api/AxiosFun";

/**
 * post 请求
 * params:url:请求路径，vo:模块的vo对象,prefix:请求路径的前缀如："AxiosFun.authCenterServiceName"
 * 返回：return 后台数据
 */
let BeseServices = {
    /** POST请求*/
    BasePromise(url, vo?, prefix = AxiosFun.authCenterServiceName) {
        if (!vo) {
            vo = {};
        }
        return new Promise(resolve => {
            AxiosFun.post(prefix + url, vo).then(
                (winResponseData: WinResponseData) => {
                    if (WinRspType.SUCC == winResponseData.winRspType) {
                        resolve(winResponseData);
                    }
                }
            );
        });
    },

    /**get请求*/
    BasePromiseGet(url, param?, prefix = AxiosFun.authCenterServiceName) {
        if (!param) {
            param = undefined;
        }
        return new Promise(resolve => {
            AxiosFun.get(prefix + url, param).then(
                (winResponseData: WinResponseData) => {
                    if (WinRspType.SUCC == winResponseData.winRspType) {
                        resolve(winResponseData);
                    }
                }
            );
        });
    }
};
