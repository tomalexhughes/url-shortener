const pckg = require('../package.json');
const pckgLock = require('../package-lock.json');

exports.default = (() => {
    if (pckg.version !== pckgLock.version) process.exit(1);
})();
