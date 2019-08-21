class NumberUtils {
    //格式化为千分位
    /*
     * 参数说明：
     * money：要格式化的数字
     * decimal：保留几位小数
     * */
    formatCurrency(money: any, decimal: number): string {
        decimal = decimal >= 0 && decimal <= 20 ? decimal : 2;
        money =
            parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(decimal) +
            "";
        var l = money
                .split(".")[0]
                .split("")
                .reverse(),
            r = money.split(".")[1];
        let t: string = "";
        for (let i: number = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
        }
        //如果传0，则不加小数位
        if (decimal === 0) {
            return t
                .split("")
                .reverse()
                .join("");
        }
        return (
            t
                .split("")
                .reverse()
                .join("") +
            "." +
            r
        );
    }

    //利率*100，用来展示数据
    multiplyBy100(rate: string, decimal: number): string {
        return this.formatCurrency(Number(rate) * 100, decimal);
    }

    //利率/100，用来向后台传数据
    divideBy100(rate: string, decimal: number): string {
        return this.formatCurrency(Number(rate) / 100, decimal);
    }

    //万元转换成元，向后台传数据
    multiplyBy10000(rate: string, decimal: number): string {
        return this.formatCurrency(Number(rate) * 10000, decimal);
    }

    //元转换成万元，页面展示
    divideBy10000(rate: string, decimal: number): string {
        return this.formatCurrency(Number(rate) / 10000, decimal);
    }
}

let numberUtils: NumberUtils = new NumberUtils();
export default numberUtils;
