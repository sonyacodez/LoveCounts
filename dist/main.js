const renderer = Render()
// const manager = LoveManager()
let coupleKey ,userName 


// Sends userKey to getTransactions function(in model)
// Receives an array of expense objects.
// renderTransactionPage
const loadTransactionPage =  function () {
    console.log("loadTransactionPage")
    renderer.renderTransactionPage()
    
}

loadTransactionPage()
