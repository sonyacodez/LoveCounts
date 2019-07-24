
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

    const renderProfilePage = function (userName, favGoals) {
        let goalObj={}
        // favGoals.forEach(element => {
        //     goalObj.element=true
        // });
        // let travel=true
        // goalObj={
        //     travel:true
        // }
        console.log("favGoals:")
        console.log(favGoals)
        console.log("renderProfilePage")
        $("#container").empty()
        const source = $('#profile-page-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template({ userName ,favGoals});
        $('#container').append(newHTML);

        // favGoals.forEach(e => {
        //     // $(thiss).closest(".cityBox").find( ".saveDelete" ).append( "<div class='remove'><i class='fas fa-heart'></i></div>" );
        //     const goal1 = $(this).closest('a').val()//.getAttribute('data-id')//.attr('data-id')
        //     console.log(goal1)
        // });

    }
    // <i class="fas fa-heart">

    // $(".weatherData").on("click", ".saver",  function () {
    //     let cityName = $(this).closest(".cityBox").find(".name").text()
    //     tempmanager.saveCity(cityName)
    //     $(this).closest(".cityBox").find( ".saveDelete" ).append( "<div class='remove'><i class='fas fa-heart'></i></div>" );
    //     $(this).closest(".cityBox").find( ".saver" ).remove()

    const renderRecPage = function (goalOptions) {
        goalOptions=[]
        //not implemented yet
        console.log("renderRecPage")
        $("#container").empty()
        const source = $('#rec-page-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template({ goalOptions });
        $('#container').append(newHTML);
    }

    const renderGoalRecommendations = function () {
        //not implemented yet
    }

    const renderReportPage = function () {
        $("#container").empty()
        $('#container').append(`<canvas id="myChart"></canvas>`);
        renderChart()

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
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"], //to add more optional colors
                data: [2478,5267,734,784,433]
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

