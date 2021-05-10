const {Chart} = require("chart.js");
window.onload = function() {
    let ctx_x = document.getElementById('plot_Mx').getContext('2d');
    let plot_Mx = new Chart(ctx_x, {
        type: 'scatter',
        data: {
            datasets: [{
                label: "Момент Mx",
                data: [
                    {
                        x: 0,
                        y: 0
                    }, {
                        x: 0,
                        y: 0
                    }, {
                        x: 0,
                        y: 0
                    }, {
                        x: 0,
                        y: 0
                    }, {
                        x: 0,
                        y: 0
                    }, {
                        x: 0,
                        y: 0
                    }, {
                        x: 0,
                        y: 0
                    }, {
                        x: 0,
                        y: 0
                    }, {
                        x: 0,
                        y: 0
                    }, {
                        x: 0,
                        y: 0
                    }
                ],
                fill: true,
                borderColor: 'rgb(82,210,100)',
                borderWidth: 3,
                tension:0
            }]
        },
        options: {
            responsive: true,
            showLine:true,
            scales: {
                y: {
                    Min: 0,
                    suggestedMax: 200
                },
                x:{
                    Min: 0,
                    suggestedMax: 12
                }
            }
        }
    });

    /*
    plot_Mx.data.datasets[0].data[0].x=1;
    plot_Mx.update();
    console.log(plot_Mx.data.datasets[0].data[0].x)

     */

    let ctx_y = document.getElementById('plot_My').getContext('2d');
    let plot_My = new Chart(ctx_y, {
        type: 'scatter',
        data: {
            datasets: [{
                label: "Test",
                data: [{
                    x: 0,
                    y: 0
                }, {
                    x: 5,
                    y: 10
                }, {
                    x: 5,
                    y: 5
                }, {
                    x: 10,
                    y: 5
                }],
                fill: true,
                borderColor: 'rgb(50,99,222)',
                borderWidth: 3,
                tension:0
            }]
        },
        options: {
            responsive: true,
            showLine:true,
        }
    });

    let ctx_z = document.getElementById('plot_Mz').getContext('2d');
    let plot_Mz = new Chart(ctx_z, {
        type: 'scatter',
        data: {
            datasets: [{
                label: "Test",
                data: [{
                    x: 0,
                    y: 0
                }, {
                    x: 5,
                    y: 10
                }, {
                    x: 5,
                    y: 5
                }, {
                    x: 10,
                    y: 5
                }],
                fill: true,
                borderColor: 'rgb(50,99,222)',
                borderWidth: 3,
                tension:0
            }]
        },
        options: {
            responsive: true,
            showLine:true,
        }
    });
}