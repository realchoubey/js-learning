const fs = require("fs");

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

class FileBasedLock {
    constructor(height, width) {
        this.path = './file.lock';
    }

    async acquireLock() {
        let maxRetries = 0
        try {
            while (fs.existsSync(this.path) && maxRetries < 3) {
                await sleep(3000);
                maxRetries += 1;
            }
            if (maxRetries === 3){
                console.log("Max retries reached");
                return false;
            }
        } catch (err) {
            console.error(err);
        }
        this._createFile();
        return true;
    }

    _createFile() {
        fs.open(this.path, "w", (err, file) => {
            if (err) throw err;
            console.log(file);
        });
    }

    releaseLock() {
        fs.unlink(this.path, (err) => {
            if (err) throw err;
            console.log("File deleted!");
        });
    }
}

let fileObj = new FileBasedLock();
fileObj.acquireLock().then((c) => {
    console.log(c);
});
