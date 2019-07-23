
const Render = function () {

    const renderTransactionPage = function (expenses) {
        console.log(expenses)
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

    const renderProfilePage = function (userName) {
        console.log("renderProfilePage")
        $("#container").empty()
        const source = $('#profile-page-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template({ userName });
        $('#container').append(newHTML);

    }

    const renderRecPage = function () {
        //not implemented yet

    }

    const renderGoalRecommendations = function () {
        //not implemented yet
    }

    const renderReportPage = function () {
        //not implemented yet

    }
    return {
        renderTransactionPage,
        renderNavbar,
        renderProfilePage,
        renderRecPage,
        renderGoalRecommendations,
        renderReportPage
    }
}

