
const Render = function () {

    const renderTransactionPage = function (expenses, currentDate) {
        $("#container").empty()
        const source = $('#transaction-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template({ expenses, currentDate });
        $('#container').append(newHTML);
    }

    const renderNavbar = function (activeTab) {
        $(".navbar").empty()
        const source = $('#navbar-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template({ activeTab });
        $('.navbar').append(newHTML);
    }
    const renderProfilePage = function (userName, favGoals) {
        $("#container").empty()
        const source = $('#profile-page-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template({ userName, favGoals });
        $('#container').append(newHTML);
    }

    const renderRecPage = function (favGoals) {
        $("#container").empty()
        const source = $('#rec-page-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template({ favGoals });
        $('#container').append(newHTML);
    }

    const renderGoalRecommendations = function () {
        //not implemented yet
    }

    const renderReportPage = function (categories, amount) {
        $("#container").empty()
        $('#container').append(`<canvas id="myChart"></canvas>`);
        renderChart(categories, amount)
        $('#container').append(`<div class="box3 sb14">you saved 300$ this month!<br>
                                    check Recommendations page to see what you can spent them on
                                </div>`)
    }

    function renderChart(labels, data) {
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: "Exspenses",
                    backgroundColor: ["#f1c40f", "#9b59b6", "#fd79a8", "#e67e22", "#27ae60", "#2980b9", "#778beb", "#16a085", "#7ed6df"],
                    data: data
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'what did you spend on this month?'
                }
            }

        });
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

