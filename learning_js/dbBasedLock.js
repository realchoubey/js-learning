const fs = require("fs");

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

class DBBasedLock {
    constructor(cronJobName) {
        this.cronJobName = cronJobName
    }
    async acquireLock() {
        let maxRetries = 0
        try {
            while (true) {
                let isLocked = database_query()
                if (isLocked && maxRetries < 3){
                    await sleep(3000);
                    maxRetries += 1;
                } else {
                    break
                }
            }
            if (maxRetries === 3){
                console.log("Max retries reached");
                return false;
            }
        } catch (err) {
            console.error(err);
        }
        this._lockCronJob();
        return true;
    }

    _lockCronJob() {
        update_database_lock(isLock=true, cronJob=this.cronJobName)
    }

    releaseLock() {
        update_database_lock(isLock=false, cronJob=this.cronJobName)
    }
}
