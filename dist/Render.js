
const Render = function () {
    const renderTransactionPage = function (expenses) {
        console.log("renderTransactionPage")
        $("#container").empty()
        const source = $('#transaction-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template({ expenses });
        $('#container').append(newHTML);
    }

    const renderNavbar = function (activeTab) {
        console.log("renderNavbar")
        $(".navbar").empty()
        const source = $('#navbar-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template({ activeTab });
        $('.navbar').append(newHTML);
    }
    
    return {
        renderTransactionPage,
        renderNavbar
    }
}

