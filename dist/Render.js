
const Render = function () {

    const renderTransactionPage = function (expenses) {
        $("#container").empty()
        const source = $('#transaction-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template({ expenses });
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
        console.log("renderProfilePage")
        $("#container").empty()
        const source = $('#profile-page-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template({ userName, favGoals });
        $('#container').append(newHTML);

        // favGoals.forEach(e => {
        //     // $(thiss).closest(".cityBox").find( ".saveDelete" ).append( "<div class='remove'><i class='fas fa-heart'></i></div>" );
        //     const goal1 = $(this).closest('a').val()//.getAttribute('data-id')//.attr('data-id')
        //     console.log(goal1)
        // });

    }
    //     const renderProfilePage = function (userName, favGoals) {
    //         $("#container").empty()
    //         $('#container').append(`
    //         <div id="profile-page">
    //     <div id="profile-header">Hi {{userName}}!!</div>
    //     <div id="profile-choose">Choose your favorites goals:</div>
    //     <div id="goals-box">
    //         <a data-id="Travel" class="fav-item waves-effect waves-light btn blue lighten-1"><i class="fas fa-heart"></i>Travel</a>
    //          <a data-id="Car" class="fav-item waves-effect waves-light btn blue lighten-1"><i class="far fa-heart"></i>Buy a car</a>
    //       </div>

    //     <div>you can go to the Recommendations page and check our suggestions at any time!<div></div>
    //   </div>
    // `);

    // }

    const renderRecPage = function (favGoals) {
        // goalOptions = []
        $("#container").empty()
        const source = $('#rec-page-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template({ favGoals });
        $('#container').append(newHTML);
    }

    const renderGoalRecommendations = function () {
        //not implemented yet
    }

    const renderReportPage = function () {
        $("#container").empty()
        $('#container').append(`<canvas id="myChart"></canvas>`);
        renderChart()
        $('#container').append(`<div class="box3 sb14">you saved 300$ this month!<br>
                                    check Recommendations page to see what you can spent them on
                                </div>`)

    }

    //needs to recive 2 arrays
    function renderChart(data, labels) {
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ["Food", "Fun", "Rent", "Clothes", "other"],
                datasets: [{
                    label: "Exspenses",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"], //to add more optional colors
                    data: [2478, 5267, 734, 784, 433]
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

