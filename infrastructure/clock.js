const moment = require('moment')

class Clock {
    dateAsString() {
        const today = this.getToday()
        return today.format('DD/MM/YYYY')
    }

    getToday() {
        return moment()
    }
}

exports.Clock = Clock
