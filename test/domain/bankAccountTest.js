const {assert, sandbox} = require('sinon')

const {BankAccount} = require('../../domain/bankAccount')
const {StatementPrinter} = require('../../domain/statementPrinter')
const {Transaction} = require('../../domain/transaction')
const {TransactionRegister} = require('../../domain/transactionRegister')

describe('BankAccount', () => {
    beforeEach(() => {
        this.sandbox = sandbox.create()

        this.transactionRegister = new TransactionRegister()
        this.statementPrinter = new StatementPrinter()
        this.bankAccount = new BankAccount(this.transactionRegister, this.statementPrinter)
    })

    afterEach(() => {
        this.sandbox.restore()
    })

    describe('Transaction register', () => {
        beforeEach(() => {
            this.sandbox.stub(this.transactionRegister, 'addDeposit')
            this.sandbox.stub(this.transactionRegister, 'addWithdrawal')
        })

        it('should store a deposit', () => {
            this.bankAccount.deposit(100)
            assert.calledWith(this.transactionRegister.addDeposit, 100)
        })

        it('should store a withdrawal', () => {
            this.bankAccount.withdraw(500)
            assert.calledWith(this.transactionRegister.addWithdrawal, 500)
        })
    })

    describe('Statement printer', () => {
        beforeEach(() => {
            this.transactions = [new Transaction('17/02/1976', 100)]
            this.sandbox.stub(this.transactionRegister, 'allTransactions').returns(this.transactions)
            this.sandbox.stub(this.statementPrinter, 'print')
        })

        it('should print a statement', () => {
            this.bankAccount.printStatement()
            assert.calledWith(this.statementPrinter.print, this.transactions)
        })
    })
})
