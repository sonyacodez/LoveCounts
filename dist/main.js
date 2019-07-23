const renderer = Render()
// const manager = LoveManager()
let coupleKey ='5d36d21003c5c00ab806bc3a',userName 


// Sends userKey to getTransactions function(in model)
// Receives an array of expense objects.
// renderTransactionPage

const loadTransactionPage =  async function () {
    console.log("loadTransactionPage")
    // await manager.getTransactions(coupleKey)
    const expenses= [
        { type: 'exspense', category: 'food', amount: '30', date: '13/3/12', comment: 'food is good' },

        { type: 'income', category: 'salary', amount: '4000000', date: '3/3/2020', comment: 'work work work' },
        { type: 'exspense', category: 'fun', amount: '100', date: '1/1/1111', comment: 'my comment' }


    ]
    expenses.forEach(e=> {e.type==='exspense' ? e.type=true : e.type=false})
    renderer.renderTransactionPage(expenses)//manager.allTransactions)
    
}

loadTransactionPage()
