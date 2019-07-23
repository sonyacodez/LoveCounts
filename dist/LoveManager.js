class LoveManager {
    constructor(allTransactions, allGoalOptions) {
        this.allTransactions = [];
        this.allGoalOptions=[]
    }
    //sends a transaction data as POST request to the /expenses post route on the server

//     addExpense(transaction){
//         const transactionObject = {
//             category: transaction.category,
//             type: transaction.type,
//             amount: transaction.amount, 
//             date: transaction.date, 
//             comment: transaction.comment,
//             coupleKey: transaction.coupleKey
//         }
//         this.allTransactions.push(transactionObject)
//         $.post(`/expenses`,transactionObject,function (res) {
//             console.log("transaction POST complete")
//     })
// }
    //sends a goal data as POST request to the /goal post route on the server

    // addFavGoal(goalData){
    //     const goalObject = {
    //         coupleKey: goalData.coupleKey,
    //         goal: goalData.goal
    //     }
    //     $.post('goal', goalObject, function(res){
    //         console.log("goal POST complete")
    //     })
// }
    async getTransactions(coupleKey){
        let transactions = await $.get(`/transactions/${coupleKey}`)
        console.log(transactions)
        this.allTransactions = transactions;
    }


    // async getGoals(coupleKey){
    //     let result = await $.get(`/goals/${coupleKey}`)
    //     return result
    //     }
    

    // async getPartner(userData){
    //     let result = await $.get('/partner', {coupleKey: userData.coupleKey, userName: userData.userName})
    //     return result.partnerName
    //     }


    // async checkPassword(userEmail, password){
    //     let rightPassword = await $.get(`password/${userEmail}`)
    //     if(password === rightPassword){
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
}

// const loveManager = new LoveManager()
// loveManager.getTransactions("5d370810c6046607fc5e5e56")