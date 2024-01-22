
// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

document.addEventListener("DOMContentLoaded", function() {
    // Load CSV data and create the chart
    var csvUrl = '../../data/data.csv?t=' + new Date().getTime();  

    Papa.parse(csvUrl, {
        download: true,
        header: false,
        complete: function (results) {

            // populate totals
            var data = results.data;

            // Calculate sums for each category
            var sums = {
                'Falcon': 0,
                'Oryx': 0,
                'Dhow': 0,
                'Pearl': 0
            };

            // Sum rows for each category
            var id_ = ""
            for (var j=1; j<5; j++) {
                if (j == 1) {
                    id_ = "Falcon";
                }
                else if (j == 2) {
                    id_ = "Oryx"
                }
                else if (j == 3) {
                    id_ = "Dhow"
                }
                else{
                    id_ = "Pearl"
                }
                for (var i=0; i < data.length; i++) {
                    var value = parseFloat(data[j][i]);  
                    if (isNaN(value)) {  
                        value = 0;  
                    }  
                    sums[id_] += value;  
                }
            }

            // update the MIS sum
            document.getElementById("total-sum").textContent = sums['Falcon'] + sums['Oryx'] + sums['Dhow'] + sums['Pearl'];

            // Update card elements with the calculated sums 
            document.getElementById('falcon-sum').textContent = sums['Falcon'] + ' kg';
            document.getElementById('oryx-sum').textContent = sums['Oryx'] + ' kg';
            document.getElementById('dhow-sum').textContent = sums['Dhow'] + ' kg';
            document.getElementById('pearl-sum').textContent = sums['Pearl'] + ' kg';

            // Create line chart
            var weeks = results.data[0]; // Assuming data is in the first (and only) row
            var colors = ['#4e73df', '#1cc88a', '#e74a3b', '#f6c23e']; // Colors for the lines
            var labels = ['Falcon', 'Oryx', 'Dhow', 'Pearl'];
            var datasets = [];
            for (var i = 1; i < results.data.length; i++) {
                datasets.push({
                    label: labels[i-1],
                    data: results.data[i].map(parseFloat),
                    lineTension: 0.3,
                    backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background
                    borderColor: colors[i - 1], // Set line color based on index
                    pointRadius: 3,
                    pointBackgroundColor: colors[i - 1], // Set point color based on index
                    pointBorderColor: "rgba(255, 255, 255, 0)", // Transparent point border
                    pointHoverRadius: 3,
                    pointHoverBackgroundColor: colors[i - 1],
                    pointHoverBorderColor: "rgba(255, 255, 255, 0)",
                    pointHitRadius: 10,
                    pointBorderWidth: 2,
                });
            }

            var ctx = document.getElementById("myLineChart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: weeks.map(function(_, index) {
                        return 'Weigh ' + (index + 1);
                    }),
                    datasets: datasets
                },
                options: {
                    maintainAspectRatio: false,
                    legend: {
                        display: true,
                        labels: {
                            usePointStyle: true
                        }
                        
                    }
                    // Add other customization options here
                }
            });

            // Calculate sums for each category
            var totalSum = sums['Falcon'] + sums['Oryx'] + sums['Dhow'] + sums['Pearl'];

            var percentages = {
                'Falcon': ((sums['Falcon'] / totalSum) * 100).toFixed(2),
                'Oryx': ((sums['Oryx'] / totalSum) * 100).toFixed(2),
                'Dhow': ((sums['Dhow'] / totalSum) * 100).toFixed(2),
                'Pearl': ((sums['Pearl'] / totalSum) * 100).toFixed(2)
            };

            // Create pie chart
            var ctxPie = document.getElementById("myPieChart2").getContext('2d');
            var myPieChart = new Chart(ctxPie, {
                type: 'doughnut',
                data: {
                    labels: ['Falcon', 'Oryx', 'Dhow', 'Pearl'],
                    datasets: [{
                        data: [percentages['Falcon'], percentages['Oryx'], percentages['Dhow'], percentages['Pearl']],
                        backgroundColor: ['#4e73df', '#1cc88a', '#e74a3b', '#f6c23e'], // Colors for the categories
                        hoverBackgroundColor: ['#2e59d9', '#17a673', '#e74a3b', '#f6c23e'], // Hover colors for the categories
                        hoverBorderColor: "rgba(234, 236, 244, 1)",
                    }],
                },
                options: {
                    maintainAspectRatio: false,
                    tooltips: {
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        caretPadding: 10,
                    },
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    cutoutPercentage: 80
                },
            });

            

            
        }
    });
});
