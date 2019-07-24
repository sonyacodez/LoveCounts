class LoveManager {
    constructor(allTransactions, allGoalOptions) {
        this.allTransactions = [];
        this.allGoalOptions = []
    }
    //sends a transaction data as POST request to the /expenses post route on the server

    addTransaction(transaction){
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

    addFavGoal(goalData){
        const goalObject = {
            coupleKey: goalData.coupleKey,
            goalName: goalData.goalName
        }
        $.post('goal', goalObject, function(res){
            console.log("goal POST complete")
        })
}
    async getTransactions(coupleKey){
        let transactions = await $.get(`/transactions/${coupleKey}`)
        this.allTransactions = transactions;
    }


    async getGoals(coupleKey){
        let result = await $.get(`/goals/${coupleKey}`)
        return result
    }

    removeTransaction(coupleKey, transactionKey){
        $.ajax({
            url: `/transaction/${coupleKey}/${transactionKey}`,
            type: 'DELETE',
            success: function() {
                "transaction DELETE complete"
            }
        })
    }

    unfavGoal(coupleKey, goalName){
        $.ajax({
            url: `/goal/${coupleKey}/${goalName}`,
            type: 'DELETE',
            success: function() {
                "transaction DELETE complete"
            }
        })
    }
    

    async getThisMonthExpenses(coupleKey,month){
        let startDate = moment(`2019-${month}-01`).format('LLLL');
        let endDate = moment(`2019-${month}-31`).format('LLLL')
        let result = await $.get(`/thisMonthExpenses/${coupleKey}/${startDate}/${endDate}`)
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


const lManager = new LoveManager();
lManager.getThisMonthExpenses()