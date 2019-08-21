/**
 * 基础请求VO
 */

export class BaseReqVO {
    id: number;
    userId: string;
    ip: string;
    mac: string;
    hostName: string;
    reqMenuId: number;
    reqPageNum: number = 1;
    reqPageSize: number = 10;
    reqSource: string; // 请求源
    reqSequence: string; // 请求序列
}

/**
 * 基础返回VO
 */
export class BaseRepVO {
    id: number;
    createUserId: string;
    createUserName: string;
    createTime: string;
    updateUserId: string;
    updateUserName: string;
    updateTime: string;
}

/**
 * 公用返回数据
 */
export interface WinResponseData {
    code: string;
    msg: string;
    winRspType: string;
    data: any;
}
