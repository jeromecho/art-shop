const { decode } = require('html-entities') ;

module.exports = function htmlDecode(input) {
    return decode(input);
}
