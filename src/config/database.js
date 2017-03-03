module.exports = {
    // For JWT encoding
    "secret": "27d6ac4280ddc0ebe036261917890923e7bad7f5e45ec099f221c4c1e7caa59f:)",
    // Local database
    // i changed the DB name so we both start from scratch :D
    "database": "mongodb://localhost/realytics_users",
    // the maximum number of allowed attempts for login
    'max_login_attempts' : 3,
    // the number of minutes the account will be locked after several false login attempts are made
    'lock_period': 1,
    // default server port
    'port' : 7777
};