const setTimezone = async () => {
    return process.env.TZ = 'UTC';
};

module.exports = setTimezone;
