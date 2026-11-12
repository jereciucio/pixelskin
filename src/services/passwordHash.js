const { scryptSync } = require('crypto');

const hashPassword = function (password, salt) {
    const hashBuffer = scryptSync(password, salt, 32);
    return hashBuffer.toString('hex');
}

module.exports = hashPassword;