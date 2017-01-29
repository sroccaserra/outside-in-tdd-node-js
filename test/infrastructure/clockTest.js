require('chai').should()
const moment = require('moment')

const {Clock} = require('../../infrastructure/clock.js')

class TestableClock extends Clock {
    getToday() {
        return moment([1976, 1, 17])
    }
}

describe('Clock', () => {
    it('should return a date as string', () => {
        const clock = new TestableClock()
        clock.dateAsString().should.equal('17/02/1976')
    })
})
