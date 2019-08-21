/**
 * 获取IP、HOSTNAME、MAC工具类
 */
const os = require("os");
export default class MHIUtil {
    /**
     * 获取IP.
     */
    static getIP(): string {
        var ip: string = "";

        let interfaces = os.networkInterfaces();
        for (var devName in interfaces) {
            var iface = interfaces[devName];
            for (var i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (
                    alias.family === "IPv4" &&
                    alias.address !== "127.0.0.1" &&
                    !alias.internal
                ) {
                    ip = alias.address;
                }
            }
        }

        return ip;
    }

    /**
     * 获取主机名
     */
    static getHostName(): string {
        var os = require("os");
        return os.hostname();
    }

    /**
     * 获取MAC地址
     */
    static getMAC(): string {
        let mac: string = "";
        var getmac = require("getmac").default;

        getmac.getMac(function(err: any, macAddress: string) {
            console.log("getMAC err", err);
            mac = macAddress;
        });

        return mac;
    }
}
