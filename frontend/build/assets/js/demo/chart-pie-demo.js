
// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: [
      'Equity',
      'Debt',
      'Gold'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(28, 200, 138, 1)',
        'rgb(78, 135, 223, 1)',
        'rgb(231, 74, 59, 1)'
      ],
      hoverOffset: 4
    }]
  },
  // options: {
  //   maintainAspectRatio: false,
  //   tooltips: {
  //     backgroundColor: "rgb(255,255,255)",
  //     bodyFontColor: "#858796",
  //     borderColor: '#dddfeb',
  //     borderWidth: 1,
  //     xPadding: 15,
  //     yPadding: 15,
  //     displayColors: false,
  //     caretPadding: 10,
  //   },
  //   legend: {
  //     display: false
  //   },
  //   cutoutPercentage: 80,
  // },
});
