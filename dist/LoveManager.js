class LoveManager {
    constructor(allTransactions, allGoalOptions) {
        this.allTransactions = [];
        // this.allGoalOptions = [];
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
    })
}
    //sends a goal data as POST request to the /goal post route on the server

    addFavGoal(goalData){
        const goalObject = {
            coupleKey: goalData.coupleKey,
            goalName: goalData.goalName
        }
        $.post('goal', goalObject, function(res){
        })
}
    async getTransactions(coupleKey){
        let transactions = await $.get(`/transactions/${coupleKey}`)
        this.allTransactions = transactions;
    }


    async getGoals(coupleKey){
        let result = await $.get(`/goals/${coupleKey}`)
        return result;
    }

    removeTransaction(coupleKey, transactionKey){
        $.ajax({
            url: `/transaction/${coupleKey}/${transactionKey}`,
            type: 'DELETE',
            success: function() {
            }
        })
    }

    unfavGoal(coupleKey, goalName){
        $.ajax({
            url: `/goal/${coupleKey}/${goalName}`,
            type: 'DELETE',
            success: function() {
            }
        })
    }
    

    async getThisMonthExpenses(coupleKey,month){
        let startDate = moment(`2019-${month}-01`).format('LLLL');
        let endDate = moment(`2019-${month}-31`).format('LLLL')
        let result = await $.get(`/thisMonthExpenses/${coupleKey}/${startDate}/${endDate}`)
        return result;
    }

    async getLastQuorterExpenses(coupleKey,month){
        const firstMonth = month-2;
        let curStartDate = moment(`2019-${firstMonth}-01`).format('LLLL');
        let curEndDate = moment(`2019-${month}-31`).format('LLLL');
        let result = await $.get(`/thisMonthExpenses/${coupleKey}/${curStartDate}/${curEndDate}`)

        return (result)
    }


    async getSavings(coupleKey, month){
        let startDate = moment(`2019-${month}-01`).format('LLLL');
        let endDate = moment(`2019-${month}-31`).format('LLLL')
        let result = await $.get(`/thisMonthTransactions/${coupleKey}/${startDate}/${endDate}`)
        const totalExpense = result.filter(r=>r.type === "Expense").map(e=>e.amount).reduce((a, b) => a + b, 0);
        const totalIncome = result.filter(r=>r.type === "Income").map(e=>e.amount).reduce((a, b) => a + b, 0);
        const savings = totalIncome - totalExpense;
        return savings;
    }

    async getFlights(destination, startDate){
        let result = await $.get(`/travel/${destination}/${startDate}`)
        let flights = result.slice(0,10)
        return flights;
    }

    async getSportEvents(){
        let result = await $.get('/sportEvents');
        let events = result.slice(0,10)
        return events
    }


    //for alert "you've gone into debt" feature
    async checkDebt(transaction){
        const transactionObject = {
            type: transaction.type,
            amount: transaction.amount, 
            month: moment(transaction.date).month()+1,
            coupleKey: transaction.coupleKey
        };
        let startDate = moment(`2019-${transactionObject.month}-01`).format('LLLL');
        let endDate = moment(`2019-${transactionObject.month}-31`).format('LLLL')
        let thisMonthTransactions = await $.get(`/thisMonthTransactions/${transactionObject.coupleKey}/${startDate}/${endDate}`)
        const totalExpense = thisMonthTransactions.filter(r=>r.type === "Expense").map(e=>e.amount).reduce((a, b) => a + b, 0);
        const totalIncome = thisMonthTransactions.filter(r=>r.type === "Income").map(e=>e.amount).reduce((a, b) => a + b, 0);
        const curFinResult = totalIncome - totalExpense;
        if(transactionObject.type === "Expense" & transactionObject.amount >curFinResult){
            const debt = curFinResult - transactionObject.amount
            return debt
        }
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

