const {sandbox, assert} = require('sinon')

const {Transaction} = require('../../domain/transaction.js')
const {StatementReplPrinter} = require('../../infrastructure/statementReplPrinter')
const {Repl} = require('../../infrastructure/repl')

describe('StatementReplPrinter', () => {
    beforeEach(() => {
        this.sandbox = sandbox.create()
        this.repl = new Repl()
        this.sandbox.stub(this.repl, 'printLine')
        this.statementPrinter = new StatementReplPrinter(this.repl)
    })

    afterEach(() => {
        this.sandbox.restore()
    })

    it('should allways print the header', () => {
        this.statementPrinter.print([])
        assert.calledWith(this.repl.printLine, 'DATE | AMOUNT | BALANCE')
    })

    it('should print the first transaction', () => {
        const transactions = [new Transaction('17/02/1976', 100)]
        this.statementPrinter.print(transactions)
        assert.calledWith(this.repl.printLine, 'DATE | AMOUNT | BALANCE')
        assert.calledWith(this.repl.printLine, '17/02/1976 | 100.00 | 100.00')
    })

    it('should print all transactions', () => {
        const transactions = [
            new Transaction('17/02/1976', 100),
            new Transaction('18/02/1976', 200)
        ]
        this.statementPrinter.print(transactions)
        assert.calledWith(this.repl.printLine, 'DATE | AMOUNT | BALANCE')
        assert.calledWith(this.repl.printLine, '18/02/1976 | 200.00 | 300.00')
        assert.calledWith(this.repl.printLine, '17/02/1976 | 100.00 | 100.00')
    })
})
