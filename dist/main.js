const renderer = Render()
const manager = new LoveManager()
let coupleKey = '5d370f800f89019d266989ec' //Liat's key
const userName = "Sonya",partnerName="Nadav"


// let activePage="Recommendations"



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
        const thisMonthExpenses = await manager.getThisMonthExpenses(coupleKey, "07")
        const savings = await manager.getSavings(coupleKey, "07")
        renderer.renderReportPage(thisMonthExpenses.categories, thisMonthExpenses.amount, savings)
    } else if (tabName === "Transactions") {
        loadTransactionPage()
    } else if (tabName === "Recommendations") {
        loadRecommendationsPage()
    }
});
const loadRecommendationsPage = async function () {
    const favGoals = await manager.getGoals(coupleKey)
    const savings = await manager.getSavings(coupleKey, "07")

    
    renderer.renderRecPage(favGoals,savings)
    // renderer.renderLoading()

}

const loadProfilePage = async function () {
    const favGoals = await manager.getGoals(coupleKey)
    let goalObj = {}
    favGoals.forEach(g => goalObj[g] = true)
    renderer.renderProfilePage(userName, goalObj)
}

const loadFlights = async function () {
    const favGoals = await manager.getGoals(coupleKey)
    let goalObj = {}
    favGoals.forEach(g => goalObj[g] = true)
    renderer.renderProfilePage(userName, goalObj)
}

$('#container').on('change', '.goal-dropdown', async function () {
    console.log("picked!!!!!")
    var end = this.value;
    console.log(end)
    renderer.renderRecTravelForm()
    // var firstDropVal = $('#pick').val();
});



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

$('#container').on('click', '#searchFlightBtn', async function () {
    console.log("search")
    const destination = $(`#destination`).val()
    console.log(destination)
    // const departureDate = $(`#departure-date`).val()
    // console.log(departureDate)
    const departureDate = moment($(`#departure-date`).val()).format("YYYYMMDD")
    console.log(departureDate)
    renderer.renderLoading()
    const flights= await manager.getFlights(destination,departureDate)
    flights.forEach(f=> f.price=Math.round(f.price))
    flights.forEach(f=> f.arrivalDate= f.arrivalDate.split("t")[0])
    console.log(flights)

    while(flights.length<1){

    }
    renderer.renderFlights(flights)
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


