const {assert, sandbox} = require('sinon')

const {BankAccount} = require('../../domain/bankAccount')
const {Clock} = require('../../infrastructure/clock.js')
const {Repl} = require('../../infrastructure/repl')
const {StatementReplPrinter} = require('../../infrastructure/statementReplPrinter')
const {TransactionInMemoryRegister} = require('../../infrastructure/transactionInMemoryRegister.js')

describe('Print statement feature', () => {
    beforeEach(() => {
        this.sandbox = sandbox.create()

        this.repl = new Repl()
        this.sandbox.stub(this.repl, 'printLine')

        this.clock = new Clock()
        this.sandbox.stub(this.clock, 'dateAsString')
            .onFirstCall().returns('01/04/2015')
            .onSecondCall().returns('02/04/2015')
            .onThirdCall().returns('10/04/2015')
    })

    afterEach(() => {
        this.sandbox.restore()
    })

    it('should print a statement with all transactions', () => {
        const transactionRegister = new TransactionInMemoryRegister(this.clock)
        const statementPrinter = new StatementReplPrinter(this.repl)
        const bankAccount = new BankAccount(transactionRegister, statementPrinter)

        bankAccount.deposit(1000)
        bankAccount.withdraw(100)
        bankAccount.deposit(500)

        bankAccount.printStatement()

        assert.calledWith(this.repl.printLine, 'DATE | AMOUNT | BALANCE')
        assert.calledWith(this.repl.printLine, '10/04/2015 | 500.00 | 1400.00')
        assert.calledWith(this.repl.printLine, '02/04/2015 | -100.00 | 900.00')
        assert.calledWith(this.repl.printLine, '01/04/2015 | 1000.00 | 1000.00')
    })
})
