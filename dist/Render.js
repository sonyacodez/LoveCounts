
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

    const renderRecPage = function (favGoals, savings) {
        $("#container").empty()
        const source = $('#rec-page-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template({ favGoals, savings });
        $('#container').append(newHTML);
    }

    const renderFlights = function (flights) {
        $(".goal-suggestions-div").empty()
        $("#loading-gif").empty()
        const source = $('#flights-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template({ flights });
        $('#container').append(newHTML);
    }

    const renderSportsEvents = function (events) {
        $(".goal-suggestions-div").empty()
        $('#form-container').empty()
        $("#loading-gif").empty()
        const source = $('#events-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template({ events });
        $('#form-container').append(newHTML);
    }

    const renderLoading = function () {
        $('#form-container').append(`<div id="loading-gif"><img src="../pics/tenor.gif"></div>`)
    }

    const renderRecTravelForm = function (favGoals, savings) {
        $('#form-container').empty()

        $('#form-container').append(
            `<div id="flight-search-form">
                <div class="travel-form-item row">
                    <div class="input ">
                        <input id="destination" type="text" class="validate">
                        <label for="Destination">Destination</label>
                    </div>
                </div>
                <div class="travel-form-item row">
                    <div class="input ">
                    <input id="departure-date" type="date" class="validate" value={{currentDate}}>
                    <label for="Date">Date</label>
                    </div>
                </div>
                <div id="searchFlightBtn">
                    <a id="searchFlight" class="waves-effect waves-light btn">Search</a>
                </div>
            </div>`);
    }

    const renderReportPage = function (chartType, categories, amount, savings) {
        $("#container").empty()
        $('#container').append(`<canvas id="myChart" height="110"></canvas>`);
        if (chartType === "Pie") {
            renderPieChart(categories, amount)
            $('#container').append(`<button id="change-to-bar-table-btn">Compare the last 3 months</div>`)
        } else if (chartType === "Bar") {
            renderBarChart(categories, amount.firstMonth, amount.secondMonth, savings)
            $('#container').append(`<button id="change-to-pie-table-btn">Check this month expenses</div>`)
        }
// =======
//         $('#container').append(`<canvas id="myChart"></canvas>`);

//         renderPieChart(categories, amount)
// >>>>>>
        $('#container').append(`<div class="box3 sb14">You saved <span id="savings"> $${savings} </span> this month!<br>
                                    Check your Recommendations page to see what you can spend your savings on.
                                </div>`)
    }

    function renderBarChart(labels, data1, data2) {
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,//["1900", "1950", "1999", "2050"],
                datasets: [
                    {
                        label: "June",
                        backgroundColor: "#3e95cd",
                        data: data1,//[133, 221, 783, 2478]
                    }, {
                        label: "July",
                        backgroundColor: "#8e5ea2",
                        data: data2,//[408, 547, 675, 734]
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'June and July Expenses'
                }
            }
        });

    }

    function renderPieChart(labels, data) {
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: "Exspenses",
                    backgroundColor: ["#f1c40f", "#9b59b6", "#fd79a8", "#27ae60", "#2980b9", "#778beb", "#16a085", "#7ed6df"],
                    data: data
                }]
            },
            options: {
                title: {
                    display: true,
                    fontSize: 20,
                    text: 'What did you spend on this month?'
                }, animation: {
                    duration: 1500,
                    easing: "linear"
                },
                legend: {
                    display: true,
                    padding: 20
                }
            }

        });
    }

    function renderDebtCheck(debt){
        alert(`You have a debt of $${debt} this month!`)
    }

    return {
        renderTransactionPage,
        renderNavbar,
        renderProfilePage,
        renderRecPage,
        renderReportPage,
        renderRecTravelForm,
        renderFlights,
        renderLoading,
        renderSportsEvents,
        renderDebtCheck
    }
}

