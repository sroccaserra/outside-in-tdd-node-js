const {StatementPrinter} = require('../domain/statementPrinter')

class StatementReplPrinter extends StatementPrinter {
    constructor(repl) {
        super()
        this.repl = repl
    }

    print(transactions) {
        this.repl.printLine('DATE | AMOUNT | BALANCE')
        if (transactions.length === 0) {
            return
        }
        let balance = 0
        const lines = []
        transactions.forEach(transaction => {
            balance = balance + transaction.amount
            lines.push(this.formatStatementLine(transaction, balance))
        })
        lines.forEach(line => {
            this.repl.printLine(line)
        })
    }

    formatStatementLine(transaction, balance) {
        return `${transaction.dateAsString} | ${transaction.amount.toFixed(2)} | ${balance.toFixed(2)}`
    }
}

exports.StatementReplPrinter = StatementReplPrinter
