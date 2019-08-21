/**
 * HttpStatus返回状态对象
 */
class HttpStatus {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    }
}

/**
 * HttpStatus工具类
 */
export default class HttpStatusUtil {
    // 初始化参数
    static statusArray: Array<HttpStatus> = [
        new HttpStatus(400, "系统提示: 错误的请求!"),
        new HttpStatus(401, "系统提示: 未经授权!"),
        new HttpStatus(402, "系统提示: 付费请求!"),
        new HttpStatus(403, "系统提示: 禁止!"),
        new HttpStatus(404, "系统提示: 请求资源不存在!"),
        new HttpStatus(405, "系统提示: 方法不允许!"),
        new HttpStatus(406, "系统提示: 不可接受!"),
        new HttpStatus(407, "系统提示: 需要代理身份验证!"),
        new HttpStatus(408, "系统提示: 请求超时!"),
        new HttpStatus(409, "系统提示: 指令冲突!"),
        new HttpStatus(410, "系统提示: 文档永久地离开了指定的位置!"),
        new HttpStatus(411, "系统提示: 需要Content-Length头请求!"),
        new HttpStatus(412, "系统提示: 前提条件失败!"),
        new HttpStatus(413, "系统提示: 请求实体太大!"),
        new HttpStatus(414, "系统提示: 请求URI太长!"),
        new HttpStatus(415, "系统提示: 支持的媒体类型!"),
        new HttpStatus(416, "系统提示: 请求的范围不可满足!"),
        new HttpStatus(417, "系统提示: 期望失败!"),
        new HttpStatus(500, "系统提示: 内部服务器错误!"),
        new HttpStatus(501, "系统提示: 未实现!"),
        new HttpStatus(502, "系统提示: 错误的网关!"),
        new HttpStatus(503, "系统提示: 服务不可用!"),
        new HttpStatus(504, "系统提示: 网关超时!"),
        new HttpStatus(505, "系统提示: HTTP版本不支持!")
    ];

    /**
     * 获取状态码对应的信息
     * @param status 状态码
     */
    static getMessage(status: number): string {
        var message = "系统提示: 未知错误";

        if (!status) return message;

        for (var i = 0, row = this.statusArray.length; i < row; i++) {
            var httpStatus: HttpStatus = this.statusArray[i];

            if (httpStatus.status === status) {
                message = httpStatus.message;
                break;
            }
        }

        return message;
    }
}
