const request = require('request');
const helper = require('./index');

const http = {
    post: function (options) {
        return new Promise((resolve, reject) => {
            request.post(options.url, {form: options.body}, (err, result) => {
                if (err) {
                    console.log('error in post_____');
                    console.error(err);
                    return reject(err);
                }
                console.log('response______');
                console.log(result.body);
                if (!helper.isJSON(result.body)) return reject({message: 'ERROR parsing JSON'});
                const responseBody = JSON.parse(result.body);
                return resolve(responseBody);
            });
        });
    },

    get: function(options) {
        return new Promise((resolve, reject) => {
            request.get(options, (err, result) => {
                if (err) {
                    console.log('error in get_____');
                    console.error(err);
                    return reject(err);
                }
                console.log('response______');
                console.log(result.body);
                if (!helper.isJSON(result.body)) return reject({message: 'ERROR parsing JSON'});
                const responseBody = JSON.parse(result.body);
                return resolve(responseBody);
            })
        })
    },

    put: function(options) {
        return new Promise((resolve, reject) => {
            request.put(options, (err, result) => {
                if (err) {
                    console.log('error in put_____');
                    console.error(err);
                    return reject(err);
                }
                console.log('response______');
                console.log(result.body);
                if (!helper.isJSON(result.body)) return reject({message: 'ERROR parsing JSON'});
                const responseBody = JSON.parse(result.body);
                return resolve(responseBody);
            })
        })
    },

    delete: function(options) {
        return new Promise((resolve, reject) => {
            request.delete(options, (err, result) => {
                if (err) {
                    console.log('error in delete_____');
                    console.error(err);
                    return reject(err);
                }
                console.log('response______');
                console.log(result.body);
                if (!helper.isJSON(result.body)) return reject({message: 'ERROR parsing JSON'});
                const responseBody = JSON.parse(result.body);
                return resolve(responseBody);
            })
        })
    },
};

module.exports = http;