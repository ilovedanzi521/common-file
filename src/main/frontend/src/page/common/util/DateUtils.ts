import { DatePicker } from "element-ui";
class DateUtils {
    /**默认开始时间,今天 */
    defaultStartTime(): Date {
        return new Date(new Date().toLocaleDateString());
    }
    /**默认结束时间 */
    defaultEndtTime(): Date {
        const start = new Date(new Date().toLocaleDateString());
        const endtime = 24 * 60 * 60 * 1000 - 1;
        return new Date(start.getTime() + endtime);
    }
    /**今天 */
    setTDTime(picker: DatePicker): void {
        console.log(typeof picker);
        const start = new Date(new Date().toLocaleDateString());
        const endtime = 24 * 60 * 60 * 1000 - 1;
        const end = new Date(start.getTime() + endtime);
        picker.$emit("pick", [start, end]);
    }
    /**昨天 */
    setYDTime(picker: DatePicker): void {
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        const start = new Date(yesterday.toLocaleDateString());
        const endtime = 24 * 60 * 60 * 1000 - 1;
        const end = new Date(start.getTime() + endtime);
        picker.$emit("pick", [start, end]);
    }
    /**最近一周 */
    setNWTime(picker: DatePicker): void {
        const nearWeek = new Date(new Date().setDate(new Date().getDate() - 6));
        const start = new Date(nearWeek.toLocaleDateString());
        const endtime = 24 * 60 * 60 * 1000 - 1;
        const end = new Date(
            new Date(new Date().toLocaleDateString()).getTime() + endtime
        );
        picker.$emit("pick", [start, end]);
    }
    /**最近一月 */
    setNMTime(picker: DatePicker): void {
        const nearMonth = new Date(
            new Date().setMonth(new Date().getMonth() - 1)
        );
        const start = new Date(nearMonth.toLocaleDateString());
        const endtime = 24 * 60 * 60 * 1000 - 1;
        const end = new Date(
            new Date(new Date().toLocaleDateString()).getTime() + endtime
        );
        picker.$emit("pick", [start, end]);
    }
    /**最近半年 */
    setHYTime(picker: DatePicker): void {
        const nearHalfYear = new Date(
            new Date().setMonth(new Date().getMonth() - 6)
        );
        const start = new Date(nearHalfYear.toLocaleDateString());
        const endtime = 24 * 60 * 60 * 1000 - 1;
        const end = new Date(
            new Date(new Date().toLocaleDateString()).getTime() + endtime
        );
        picker.$emit("pick", [start, end]);
    }
    /**最近一年 */
    setNYTime(picker: DatePicker): void {
        const nearYear = new Date(
            new Date().setFullYear(new Date().getFullYear() - 1)
        );
        const start = new Date(nearYear.toLocaleDateString());
        const endtime = 24 * 60 * 60 * 1000 - 1;
        const end = new Date(
            new Date(new Date().toLocaleDateString()).getTime() + endtime
        );
        picker.$emit("pick", [start, end]);
    }

    /**时间格式化 */
    dateFtt(fmt: string, date: Date): string {
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            S: date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                (date.getFullYear() + "").substr(4 - RegExp.$1.length)
            );
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(
                    RegExp.$1,
                    RegExp.$1.length == 1
                        ? o[k]
                        : ("00" + o[k]).substr(("" + o[k]).length)
                );
        return fmt;
    }

    /**
     * 获取当前时间
     */
    nowTime(): string {
        return this.dateFtt("yyyy-MM-dd hh:mm:ss", new Date());
    }
}

let dateUtils: DateUtils = new DateUtils();
export default dateUtils;
