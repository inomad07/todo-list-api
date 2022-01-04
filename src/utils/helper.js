function getConnectionUri() {
    const connections = JSON.parse(process.env.MONGO_HOST);
    let connectionString = '';
    connections.forEach((connection, index) => {
        connectionString += `${connection.host}:${connection.port}`;
        if (index !== connections.length - 1) {
            connectionString += ',';
        }
    });
    return connectionString;
}

function getOptionUri() {
    const options = JSON.parse(process.env.MONGO_OPTIONS);
    let optionString = '';
    options.forEach((option, index) => {
        Object.keys(option).forEach(optionKey => {
            optionString += `${optionKey}=${option[optionKey]}`;
        });
        if (index !== options.length - 1) {
            optionString += '&';
        }
    });
    return optionString;
}


module.exports = {
    getConnectionUri,
    getOptionUri
};