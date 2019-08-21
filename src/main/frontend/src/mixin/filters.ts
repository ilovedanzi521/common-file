const formatDollars = (money: any): string => {
    let number = money + "";
    if (number.length <= 3) return number == "" ? "0" : number;
    else {
        var mod = number.length % 3;
        var output = mod == 0 ? "" : number.substring(0, mod);
        var i;
        for (i = 0; i < Math.floor(number.length / 3); i++) {
            if (mod == 0 && i == 0)
                output += number.substring(mod + 3 * i, mod + 3 * i + 3);
            else output += "," + number.substring(mod + 3 * i, mod + 3 * i + 3);
        }
        return output;
    }
};

export default { formatDollars };
