const renderer = Render()
const manager = new LoveManager()
let coupleKey = '5d370f800f89019d266989ec', userName


// Sends userKey to getTransactions function(in model)
// Receives an array of expense objects.
// renderTransactionPage

const loadTransactionPage = async function () {
    console.log("loadTransactionPage")
     await manager.getTransactions(coupleKey)
     const expenses =manager.allTransactions
    // const expenses = [
    //     { type: 'exspense', category: 'food', amount: '30', date: '13/3/12', comment: 'food is good' },
    //     { type: 'income', category: 'salary', amount: '4000000', date: '3/3/2020', comment: 'work work work' },
    //     { type: 'exspense', category: 'fun', amount: '100', date: '1/1/1111', comment: 'my comment' }
    // ]
    expenses.forEach(e => { e.type === 'exspense' ? e.type = true : e.type = false })
    renderer.renderTransactionPage(expenses)

}

$('#container').on('click', '#submitIncome', async function () {
    console.log("submitIncome onClick")
    submitIncome()
});

$('#container').on('click', '#submitExpense', async function () {
    console.log("submitExpense onClick")
    submitExpense()
});
$('#container').on('click', '#delete-transaction', function () {
    console.log("delete-transaction onClick")
    const item = $(this).closest('#transaction-table-row').find('#category').text()
    console.log(item)
    // deleteTransaction()
});

const submitIncome = async function () {
    console.log("submitIncome")
    const amount = $("#income-amount").val()
    const date = $("#income-date").val()
    const comment = $("#income-comment").val()
    const category = $("#income-category").val()
    //to check that no one is empty
    const incomeInfo = {
        type: "Income",
        category: category,
        amount: amount,
        date: date,
        comment: comment
    }
    console.log(amount)
    console.log(date)
    console.log(comment)
    console.log(category)

    // await manager.addExpense(coupleKey, incomeInfo)
    // loadTransactionPage()
}

const submitExpense = async function () {
    console.log("submitIncome")
    const amount = $("#expense-amount").val()
    const date = $("#expense-date").val()
    const comment = $("#expense-comment").val()
    const category = $("#expense-category").val()
    //to check that no one is empty
    const expenseInfo = {
        type: "Expense",
        category: category,
        amount: amount,
        date: date,
        comment: comment
    }
    console.log(amount)
    console.log(date)
    console.log(comment)
    console.log(category)

    // await manager.addExpense(coupleKey, ExpenseInfo)
    // loadTransactionPage()
}

loadTransactionPage()


