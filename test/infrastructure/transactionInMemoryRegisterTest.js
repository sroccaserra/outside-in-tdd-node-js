require('chai').should()
const {sandbox} = require('sinon')

const {Clock} = require('../../infrastructure/clock')
const {Transaction} = require('../../domain/transaction')
const {TransactionInMemoryRegister} = require('../../infrastructure/transactionInMemoryRegister')

describe('TransactionInMemoryRegister', () => {
    beforeEach(() => {
        this.sandbox = sandbox.create()

        const clock = new Clock()
        this.sandbox.stub(clock, 'dateAsString').returns('17/02/1976')
        this.transactionRegister = new TransactionInMemoryRegister(clock)
    })

    afterEach(() => {
        this.sandbox.restore()
    })

    it('should store and retrieve a deposit transaction', () => {
        this.transactionRegister.addDeposit(100)
        const transactions = this.transactionRegister.allTransactions()
        transactions.length.should.equal(1)
        transactions[0].should.deep.equal(new Transaction('17/02/1976', 100))
    })

    it('should store and retrieve a withdrawal transaction', () => {
        this.transactionRegister.addWithdrawal(100)
        const transactions = this.transactionRegister.allTransactions()
        transactions.length.should.equal(1)
        transactions[0].should.deep.equal(new Transaction('17/02/1976', -100))
    })
})
