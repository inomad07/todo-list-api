const fs = require('fs');

const helper = {
    isJSON: function (str) {
        try {
            return (JSON.parse(str) && !!str);
        } catch (e) {
            return false;
        }
    },
    random: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    writeFileAsync(file, data) {
        let formatedData = '\n' + JSON.stringify(data);
        return new Promise((resolve, reject) => {
            fs.appendFile(file, formatedData, (err) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                console.log("The file was saved!");
                return resolve("The file was saved!");
            });
        })

    },
    getDirname() {
        return __dirname.toString().replace('/modules', '');
    },
    sendRecordInTopic: function(producer, topicName, message) {
        return new Promise((resolve, reject) => {
            producer.send(topicName, JSON.stringify(message));
            return resolve(message);
        })
    },
    isExistRow: (result) => {
        return result.rowLength;
    }
};

module.exports = helper;