const renderer = Render()
const manager = new LoveManager()
let coupleKey = '5d370f800f89019d266989ec' //Liat's key
const userName="Sonya"
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
        loadProfilePage()
    }else if(tabName==="Reports"){
        renderer.renderReportPage()
    }else if(tabName==="Transactions"){
        loadTransactionPage()
    }else if(tabName==="Recommendations"){
        // rec-page-template
    }
});

const loadProfilePage = async function () {
    console.log("loadProfilePage")
    const favGoals = await manager.getGoals(coupleKey)
        console.log(favGoals)
        let goalObj={}
        favGoals.forEach(g=>goalObj[g]=true)
        renderer.renderProfilePage(userName, goalObj)
}

$('#container').on('click', '.fav-item', async function () {
    console.log("fav-item onclick")
    const favGoal = $(this).closest('a').attr('data-id')
    console.log(favGoal)
    await manager.addFavGoal({
        coupleKey: coupleKey,
        goalName: favGoal
    })
    loadProfilePage()
        // favGoal)
    // submitIncome()
    // submitTransaction("Income")
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
    loadTransactionPage()
}





$("#renderBtn").click(
    function () {
        data = [20000, 14000, 12000, 15000, 18000, 19000, 22000];
        labels =  [ 'Red',
        'Yellow',
        'Blue',"sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        // renderChart(data, labels);
        renderer.renderReportPage()
    }
);


renderer.renderNavbar()
loadTransactionPage()


