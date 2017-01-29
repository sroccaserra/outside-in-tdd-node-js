const {Transaction} = require('../domain/transaction.js')
const {TransactionRegister} = require('../domain/transactionRegister.js')

class TransacitonInMemoryRegister extends TransactionRegister {
    constructor(clock) {
        super()
        this.clock = clock
        this.transactions = []
    }

    addDeposit(amount) {
        const dateAsString = this.clock.dateAsString()
        this.transactions.push(new Transaction(dateAsString, amount))
    }

    addWithdrawal(amount) {
        const dateAsString = this.clock.dateAsString()
        this.transactions.push(new Transaction(dateAsString, -amount))
    }

    allTransactions() {
        return this.transactions
    }
}

exports.TransactionInMemoryRegister = TransacitonInMemoryRegister
