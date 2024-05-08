class StatusBalance{
    constructor() {
        this.ROUND_ROBIN = 'ROUND_ROBIN';
        this.WEIGHT_ROUND_ROBIN = 'WEIGHT_ROUND_ROBIN';
        this.STICKY_SESSION = 'STICKY_SESSION';
        this.LEAST_CONNECTION = 'LEAST_CONNECTION';
    }
}

module.exports = StatusBalance;