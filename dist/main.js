const renderer = Render()
const manager = new LoveManager()
<<<<<<< HEAD
let coupleKey = '5d3827185aabb537cf4007a3' //Sonya's key
=======
let coupleKey = '5d370810c6046607fc5e5e56' //Katya's key
>>>>>>> 7aafa83e85165374a5238ba7aac04561b1e1fea3
const userName = "Sonya"

const loadTransactionPage = async function () {
    await manager.getTransactions(coupleKey)
    const expenses = manager.allTransactions
    let currentDate = moment(new Date()).format("YYYY-MM-DD")
    expenses.forEach(e => { e.type === 'Expense' ? e.type = true : e.type = false })
    expenses.forEach(e => { e.date = moment(e.date).format("MMM Do YYYY") })
    renderer.renderTransactionPage(expenses, currentDate)
}

$('.navbar').on('click', 'li', async function () {
    const tabName = $(this).closest('li').text()
    if (tabName === "Profile") {
        loadProfilePage()
    } else if (tabName === "Reports") {
        let thisMonthExpenses = await manager.getThisMonthExpenses(coupleKey, "07")
        renderer.renderReportPage(thisMonthExpenses.categories, thisMonthExpenses.amount)
    } else if (tabName === "Transactions") {
        loadTransactionPage()
    } else if (tabName === "Recommendations") {
        loadRecommendationsPage()
    }
});
const loadRecommendationsPage = async function () {
    const favGoals = await manager.getGoals(coupleKey)
    renderer.renderRecPage(favGoals)

}

const loadProfilePage = async function () {
    const favGoals = await manager.getGoals(coupleKey)
    let goalObj = {}
    favGoals.forEach(g => goalObj[g] = true)
    renderer.renderProfilePage(userName, goalObj)
}

$('#container').on('click', '.fav-item', async function () {
    const favGoal = $(this).closest('a').attr('data-id')
    const goals = await manager.getGoals(coupleKey)
    let isGoalFav //= goals.find(e=>{e===favGoal})
    goals.forEach(e => {
        if (e === favGoal) {
            isGoalFav = true
        }
    })
    if (isGoalFav) {
        await manager.unfavGoal(coupleKey, favGoal)
        loadProfilePage()
    }
    else {
        await manager.addFavGoal({ coupleKey: coupleKey, goalName: favGoal })
        loadProfilePage()
    }
});

$('#container').on('click', '#submitIncome', async function () {
    submitTransaction("Income")
});

$('#container').on('click', '#submitExpense', async function () {
    submitTransaction("Expense")
});

$('#container').on('click', '#delete-transaction', function () {
    const transactionKey = $(this).closest('#transaction-table-row').attr('data-id')//.text()
    manager.removeTransaction(coupleKey, transactionKey)
    loadTransactionPage()
});

const submitTransaction = async function (type) {
    const amount = $(`#${type}-amount`).val()
    const date = $(`#${type}-date`).val()
    const comment = $(`#${type}-comment`).val()
    const category = $(`#${type}-category`).val()
    //to check that no one is empty
    const tranactionInfo = {
        type: type,
        coupleKey: coupleKey,
        category: category,
        amount: amount,
        date: date,
        comment: comment
    }
    manager.addTransaction(tranactionInfo)
    loadTransactionPage()
}


renderer.renderNavbar()
loadTransactionPage()


