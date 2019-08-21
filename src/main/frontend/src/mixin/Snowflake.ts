import BigInt from "big-integer";
/**
 * 雪花算法
 */
export default class Snowflake {
    static instance: Snowflake = new Snowflake(1, 1);

    static getInstance() {
        return this.instance;
    }

    // 开始时间截 (2010-05-01)
    twepoch: number = 1272643200000;

    // 机器id所占的位数
    workerIdBits: number = 5;

    // 数据标识id所占的位数
    datacenterIdBits: number = 5;

    // 支持的最大机器id，结果是31 (这个移位算法可以很快的计算出几位二进制数所能表示的最大十进制数)
    maxWorkerId: number = -1 ^ (-1 << this.workerIdBits);

    // 支持的最大数据标识id，结果是31
    maxDatacenterId: number = -1 ^ (-1 << this.datacenterIdBits);

    // 序列在id中占的位数
    sequenceBits: number = 12;

    // 机器ID向左移12位
    workerIdShift: number = this.sequenceBits;

    // 数据标识id向左移17位(12+5)
    datacenterIdShift: number = this.sequenceBits + this.workerIdBits;

    // 时间截向左移22位(5+5+12)
    timestampLeftShift =
        this.sequenceBits + this.workerIdBits + this.datacenterIdBits;

    // 生成序列的掩码，这里为4095 (0b111111111111=0xfff=4095)
    sequenceMask: number = -1 ^ (-1 << this.sequenceBits);

    // 工作机器ID(0~31)
    workerId: number;

    // 数据中心ID(0~31)
    datacenterId: number;

    // 毫秒内序列(0~4095)
    sequence: number = 0;

    // 上次生成ID的时间截
    lastTimestamp: number = -1;

    private constructor(workerId: number, datacenterId: number) {
        if (workerId > this.maxWorkerId || workerId < 0) {
            throw new Error(
                "config.worker_id must max than 0 and small than maxWrokerId-[" +
                    this.maxWorkerId +
                    "]"
            );
        }
        if (datacenterId > this.maxDatacenterId || datacenterId < 0) {
            throw new Error(
                "config.data_center_id must max than 0 and small than maxDataCenterId-[" +
                    this.maxDatacenterId +
                    "]"
            );
        }
        this.workerId = workerId;
        this.datacenterId = datacenterId;
    }

    /**
     * 获得下一个ID
     */
    nextId(): string {
        let timestamp: number = this.timeGen();

        // 如果当前时间小于上一次ID生成的时间戳，说明系统时钟回退过这个时候应当抛出异常
        if (timestamp < this.lastTimestamp) {
            throw new Error(
                "Clock moved backwards. Refusing to generate id for " +
                    (this.lastTimestamp - timestamp)
            );
        }

        // 如果是同一时间生成的，则进行毫秒内序列
        if (this.lastTimestamp === timestamp) {
            this.sequence = (this.sequence + 1) & this.sequenceMask;
            // 毫秒内序列溢出
            if (this.sequence === 0) {
                // 阻塞到下一个毫秒,获得新的时间戳
                timestamp = this.tilNextMillis(this.lastTimestamp);
            }
        } else {
            this.sequence = 0;
        }

        this.lastTimestamp = timestamp;

        // dataCenterId:1,workerId:1,sequence:0  shiftNum:135168
        var shiftNum =
            (this.datacenterId << this.datacenterIdShift) |
            (this.workerId << this.workerIdShift) |
            this.sequence;

        var nfirst = BigInt(String(timestamp - this.twepoch), 10);
        nfirst = nfirst.shiftLeft(this.timestampLeftShift);
        var nextId = nfirst.or(BigInt(String(shiftNum), 10)).toString(10);

        return nextId;
    }

    /**
     * 返回以毫秒为单位的当前时间
     */
    timeGen(): number {
        return Date.now();
    }

    /**
     * 阻塞到下一个毫秒，直到获得新的时间戳
     * @param lastTimestamp 上次生成ID的时间截
     */
    tilNextMillis(lastTimestamp: number): number {
        var timestamp = this.timeGen();
        while (timestamp <= lastTimestamp) {
            timestamp = this.timeGen();
        }
        return timestamp;
    }
}
