import axios from "axios";
import Vue from "vue";
import HttpStatusUtil from "../page/common/util/HttpStatusUtil";
import Snowflake from "../mixin/Snowflake";

export default class AxiosFun extends Vue {
    public static basicParameterServiceName = "/dfbp-common-basicparameter";

    public static authCenterServiceName = "/dfas-auth-center";
    public static commonBpmServiceName = "/dfas-common-bpm";
    public static commonFileServiceName = "/dfas-common-file";

    snowflake: Snowflake = Snowflake.getInstance();

    private static instance: AxiosFun = new AxiosFun();

    private constructor() {
        super();
    }

    static getInstance() {
        return this.instance;
    }

    static get(url: string, params?: any): Promise<any> {
        return this.instance.apiAxios("GET", url, params);
    }

    static post(url: string, params: any): Promise<any> {
        return this.instance.apiAxios("POST", url, params);
    }

    static put(url: string, params: any): Promise<any> {
        return this.instance.apiAxios("PUT", url, params);
    }

    static winDelete(url: string, params?: any): Promise<any> {
        return this.instance.apiAxios("DELETE", url, params);
    }

    apiAxios(method: string, url: string, params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            var authorization: string = localStorage.getItem("Authorization");

            if (this.isDev()) {
                authorization = process.env.NODE_ENV;
            }

            if (
                "/dfas-auth-center/api/web/login" != url &&
                (!authorization || authorization.trim() == "")
            ) {
                // 判断是否有token数据
                // this.gotoIndex();
                // return;
            }

            // 头部数据
            var headerParams = {};

            if (authorization && authorization.trim() != "") {
                headerParams["Authorization"] = authorization
                    .replace('"', "")
                    .replace('"', "");
            }

            // 参数数据
            params = params || {};

            params = this.filterNull(params);

            // POST、PUT、PATCH比如传入reqSource
            if (method === "POST" || method === "PUT" || method === "PATCH") {
                if (
                    !params["reqSource"] ||
                    params["reqSource"] == null ||
                    "" === params["reqSource"].trim()
                ) {
                    params["reqSource"] = url.replace(/\//g, "-");
                }

                // 雪花算法生成reqSequence(19位)
                params["reqSequence"] = this.snowflake.nextId();
            }

            axios({
                method: method,
                url: url,
                headers: headerParams,
                data: method === "POST" || method === "PUT" ? params : null,
                params: method === "GET" || method === "DELETE" ? params : null,
                // timeout: 10 * 1000,
                withCredentials: false
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    if (error.response && error.response.status) {
                        if (!this.isDev()) {
                            if (error.response.status == 401) {
                                this.gotoIndex();
                                return;
                            }
                        }

                        this.$message({
                            showClose: true,
                            type: "error",
                            message: HttpStatusUtil.getMessage(
                                error.response.status
                            )
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            type: "error",
                            message: error.message
                        });
                    }

                    reject(error);
                });
        });
    }

    filterNull(o: any): any {
        for (var key in o) {
            if (o[key] === null) {
                delete o[key];
            }
            if (this.toType(o[key]) === "string") {
                o[key] = o[key].trim();
            } else if (this.toType(o[key]) === "object") {
                o[key] = this.filterNull(o[key]);
            } else if (this.toType(o[key]) === "array") {
                o[key] = this.filterNull(o[key]);
            }
        }
        return o;
    }

    toType(obj: any): string {
        return {}.toString
            .call(obj)
            .match(/\s([a-zA-Z]+)/)[1]
            .toLowerCase();
    }

    /**
     * 跳转首页
     */
    gotoIndex() {
        if (localStorage.getItem("Authorization")) {
            localStorage.removeItem("Authorization");
        }
        let currentHref = `${location.href.split("#")[0]}#/login`;

        if (parent) {
            parent.window.location.href = currentHref;
        } else {
            window.location.href = currentHref;
        }
    }

    /**
     * 判断是否开发环境
     */
    isDev() {
        return "development" === process.env.NODE_ENV;
    }
}
