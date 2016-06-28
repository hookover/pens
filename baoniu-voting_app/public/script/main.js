/**
 * Created by apple on 16/6/28.
 */




var data = {
    datasets: [{
        data: [
            11,
            16,
            7,
            3,
            14,
            22
        ],
        backgroundColor: [
            "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB"
        ],
        label: 'My dataset' // for legend
    }],
    labels: [
        "Red",
        "Green",
        "Yellow",
        "Grey",
        "Blue",
        'add'
    ]
};

var ctx = $("#detailChart");
var detail = new Chart(ctx, {
    //type: 'doughnut',
    type: 'polarArea',
    data: data
});
//
//new Chart(ctx, {
//    data: data,
//    type: 'polarArea',
//    options: options
//});

