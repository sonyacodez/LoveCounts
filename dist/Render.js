
const Render = function () {
    const renderTransactionPage = function (expenses) {
        console.log("renderTransactionPage")
        $("#container").empty()
        const source = $('#transaction-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template({ expenses });
        $('#container').append(newHTML);
    }

    return {
        renderTransactionPage
    }
}

