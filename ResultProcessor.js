const fs = require('fs');

module.exports = class ResultProcessor {
    constructor() {
        this.detectionGroups = [];
        this.hasLogged = false;
    }

    addDetection(detection) {
        const time = detection.time;
        this.detectionGroups[time] ? this.detectionGroups[time].push(detection) :
                this.detectionGroups[time] = [detection];
        this.checkForPrint();
    }

    checkForPrint() {
        for (let i = 0; i < this.detectionGroups.length; i++) {
            let group = this.detectionGroups[i];
            // If the group has been cleared, continue
            if (!group) continue;
            // If the group length < 4, stop
            if (group.length < 4) break;
            // If the group length === 4, print and clear the group
            if (group.length === 4) {
                this.logFile(this.getBestScore(group));
                this.hasLogged = true;
                this.detectionGroups[i] = null;
            }
        }
    }

    getBestScore(group) {
        return group.reduce((best, detection) => {
            if (!best) return best = detection;
            return best = best.score >= detection.score ? best : detection; 
        }, null);
    }

    getLogString(detection) {
        return `Time: ${detection.time} - Speaker: ${detection.user} \n`;
    }

    logFile(detection) {
        const log = this.getLogString(detection);
        const recordLog = this.hasLogged ? fs.appendFile : fs.writeFile;
        recordLog(__dirname + '/test/detectionLog.txt', log, 'utf8', (err) => {
            if (err) console.error(err);
        });
    }
}
