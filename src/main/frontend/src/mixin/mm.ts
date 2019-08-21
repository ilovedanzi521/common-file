class Tool {
    /***表单验证 */
    static validate(value: string, type: string): boolean {
        let inputValue: string = value.replace(/(^\s*)|(\s*$)/g, "");
        // 非空验证
        if ("require" === type) {
            return !!inputValue;
        }
        if ("number" == type) {
            return /[1-9]{2}.?/.test(inputValue);
        }
        // 手机号验证
        if ("phone" === type) {
            return /^1\d{10}$/.test(inputValue);
        }
        // 邮箱格式验证
        if ("email" === type) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(inputValue);
        }
    }
}

export default Tool;
