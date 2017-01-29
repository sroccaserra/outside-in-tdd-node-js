class BankAccount {
    constructor(transactionRegister, statementPrinter) {
        this.transactionRegister = transactionRegister
        this.statementPrinter = statementPrinter
    }

    deposit(amount) {
        this.transactionRegister.addDeposit(amount)
    }

    withdraw(amount) {
        this.transactionRegister.addWithdrawal(amount)
    }

    printStatement() {
        const transactions = this.transactionRegister.allTransactions()
        this.statementPrinter.print(transactions)
    }
}

exports.BankAccount = BankAccount
