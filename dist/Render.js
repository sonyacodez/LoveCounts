
const Render = function () {
    const renderTransactionPage = function () {
        console.log("renderTransactionPage")
        $("#container").empty()
        const source = $('#transaction-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template();
        $('#container').append(newHTML);
    }

    return {
        renderTransactionPage
    }
}

