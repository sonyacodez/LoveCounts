const renderer = Render()
const manager = new LoveManager()
let coupleKey = '5d370f800f89019d266989ec' //Liat's key
const userName="Sonya"

// let activePage="Recommendations"


const loadTransactionPage = async function () {
    console.log("loadTransactionPage")
     await manager.getTransactions(coupleKey)
     const expenses =manager.allTransactions
    //  let currentDate = new Date();
    //  console.log(currentTime)
     let currentDate=moment(new Date()).format("YYYY-MM-DD")
     console.log(currentDate)
// currentDate=new Date().toDateInputValue();
    expenses.forEach(e => { e.type === 'Expense' ? e.type = true : e.type = false })
    expenses.forEach(e => {e.date=moment(e.date).format("MMM Do YYYY")  })
    renderer.renderTransactionPage(expenses, currentDate)
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
        loadRecommendationsPage()
    }
});
const loadRecommendationsPage = async function () {
    // console.log("loadProfilePage")
    // const favGoals = await manager.getGoals(coupleKey)
    //     console.log(favGoals)
    //     let goalObj={}
    //     favGoals.forEach(g=>goalObj[g]=true)
    //     renderer.renderProfilePage(userName, goalObj)
    const favGoals = await manager.getGoals(coupleKey)
    renderer.renderRecPage(favGoals)

}

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
    // const state= $(this).closest('a').find('i').className//attr("class")//.hasClass('far')//.attr('class')
    console.log("state")
    const goals =await manager.getGoals(coupleKey)
    let isGoalFav //= goals.find(e=>{e===favGoal})
    goals.forEach(e=>{if(e===favGoal){
        isGoalFav=true
    }})
    console.log("favGoal:")
    console.log(favGoal)
    if (isGoalFav){
        console.log("delete goal!!!!")
        console.log(favGoal)
        await manager.unfavGoal(coupleKey,favGoal)
        loadProfilePage()

    }
    else{
        console.log("add goal!!!!!!!!")
        await manager.addFavGoal({
            coupleKey: coupleKey,
            goalName: favGoal
        })
        loadProfilePage()

    }
   
    // loadProfilePage()
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
    const transactionKey = $(this).closest('#transaction-table-row').attr('data-id')//.text()
    console.log(transactionKey)
    manager.removeTransaction(coupleKey,transactionKey)
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
        coupleKey:coupleKey,
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


