class SendResponse {
    static sendSuccessMsg(status, message, body = null) {
        return {status, message, body};
    }

    static sendErrorMsg(error) {
        if(!error.status) {
            error.status = 'error';
        }
        return {status: error.status, message: error.message};
    }

    static normalizeObject(obj) {
        Object.keys(obj).forEach(prop => {
            if (!obj[prop] || typeof obj[prop] === 'undefined') {
                delete obj[prop];
            }
            if(typeof obj[prop] === 'object' && '_id' in obj[prop]) {
                obj[prop] = obj[prop]._id;
            }
        });
        return obj;
    }

    static unsetFields(obj) {
        const newObj = {};
        Object.keys(obj).forEach(prop => {
            if (!obj[prop] || typeof obj[prop] === 'undefined') {
                newObj[prop] = 1;
            }
            if(typeof obj[prop] === 'object' && '_id' in obj[prop]) {
                obj[prop] = obj[prop]._id;
            }
        });
        return newObj;
    }
}

module.exports = SendResponse;