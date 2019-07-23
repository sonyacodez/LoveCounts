const renderer = Render()
const manager = new LoveManager()
let coupleKey = '5d370f800f89019d266989ec', userName="Sonya"
let activePage="Recommendations"

const loadTransactionPage = async function () {
    console.log("loadTransactionPage")
     await manager.getTransactions(coupleKey)
     const expenses =manager.allTransactions
    expenses.forEach(e => { e.type === 'Expense' ? e.type = true : e.type = false })
    expenses.forEach(e => {e.date=moment(e.date).format("MMM Do YYYY")  })
    renderer.renderTransactionPage(expenses)
}

$('.navbar').on('click', 'li', async function () {
    console.log("tab onClick")
    const tabName = $(this).closest('li').text()
    console.log(tabName)
    if (tabName==="Profile"){
        renderer.renderProfilePage(userName)
    }
});
$('#container').on('click', '#submitIncome', async function () {
    console.log("submitIncome onClick")
    // submitIncome()
    submitTransaction("Income")
});

$('#container').on('click', '#submitExpense', async function () {
    console.log("submitExpense onClick")
    // submitExpense()
    submitTransaction("Expense")

});
$('#container').on('click', '#delete-transaction', function () {
    console.log("delete-transaction onClick")
    const item = $(this).closest('#transaction-table-row').find('#category').text()
    console.log(item)
    // deleteTransaction()
});

const submitTransaction = async function (type) {
    const amount = $(`#${type}-amount`).val()
    const date = $(`#${type}-date`).val()
    const comment = $(`#${type}-comment`).val()
    const category = $(`#${type}-category`).val()
    //to check that no one is empty
    const tranactionInfo = {
        type: type,
        coupleKey:coupleKey,
        category: category,
        amount: amount,
        date: date,
        comment: comment
    }
    console.log(amount)
    console.log(date)
    console.log(comment)
    console.log(category)
    manager.addTransaction(tranactionInfo)

}

renderer.renderNavbar()
loadTransactionPage()


