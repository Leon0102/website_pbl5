const Handlebars = require('handlebars');

module.exports = {
    sum: (a, b) => a + b,
    compare: (v1) => {
        if(v1 != null) return true;
        return false;
    },
    checkToday: (v1) => {
        if(v1 == null) return false;
        else{
            let s =v1.split(' ');
            let date = s[0].substr(0,3)+ ' ' +s[2]+' ' + s[1]+' ' + s[3];
            if (date != new Date().toDateString()) return false;
            return true;
        }
    }
};