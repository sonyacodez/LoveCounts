class LoveManager {
    constructor(allTransactions, allGoalOptions) {
        this.allTransactions = [];
        this.allGoalOptions=[]
    }
    //sends a transaction data as POST request to the /expenses post route on the server

    addTransaction(transaction){//WORKS
        const transactionObject = {
            category: transaction.category,
            type: transaction.type,
            amount: transaction.amount, 
            date: transaction.date, 
            comment: transaction.comment,
            coupleKey: transaction.coupleKey
        }
        this.allTransactions.push(transactionObject)
        $.post(`/transactions`,transactionObject,function (res) {
            console.log("transaction POST complete")
    })
}
    //sends a goal data as POST request to the /goal post route on the server

    addFavGoal(goalData){//WORKS
        const goalObject = {
            coupleKey: goalData.coupleKey,
            goalName: goalData.goalName
        }
        $.post('goal', goalObject, function(res){
            console.log("goal POST complete")
        })
}
    async getTransactions(coupleKey){//WORKS
        let transactions = await $.get(`/transactions/${coupleKey}`)
        this.allTransactions = transactions;
    }


    async getGoals(coupleKey){//WORKS
        let result = await $.get(`/goals/${coupleKey}`)
        return result
    }
    

    // async getPartner(userData){
    //     let result = await $.get('partner/${userData.userName}`)
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

//CHECKS

// const loveManager = new LoveManager()

// loveManager.addTransaction({
//     category: 'coctails',
//     type: 'income',
//     amount: 1000000, 
//     date: '2019-07-24', 
//     comment: "Hey I'm checking",
//     coupleKey: "5d370810c6046607fc5e5e56"
// })

// console.log (loveManager.allTransactions)