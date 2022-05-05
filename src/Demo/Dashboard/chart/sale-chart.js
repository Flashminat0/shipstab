export default {
    height: 300,
    type: 'line',
    options: {
        chart: {
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 2,
            curve: 'smooth'
        },
        xaxis: {
            type: 'int',
            categories: [-40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
            size: 3
        },
        colors: ['#9ccc65'],
        fill: {
            type: 'solid',
        },
        markers: {
            size: 3,
            colors: ['#9ccc65'],
            opacity: 0.9,
            strokeWidth: 2,
            hover: {
                size: 5,
            }
        },
        grid: {
            borderColor: '#e2e5e885',
        },
        yaxis: {
            min: -4,
            max: 2,
        }
    },
    series: [{
        name: 'Bronze',
        data: [-1.159, -1.418, -1.191, -0.524, 0, 0.524, 1.191, 1.417, 1.159, 1.417, 1.159, 0.448, -0.497, -1.53, -2.567, -3.546]
    }]
}