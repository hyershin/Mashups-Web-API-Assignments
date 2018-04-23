var bc;

//call json file
function requestData() {
  $.ajax({
    url: 'data/beerstats.json',
    type: 'GET',
    dataType: 'json',
    error: function(err) {
      console.log(err);
    },
    success: function(data){
      // console.log(data);
      bc = data;
      console.log(bc[0].country);
      console.log(bc[0].Consumption);
      runGoogle();
    }
  });
}

function runGoogle() {
  google.charts.load("visualization", "1", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawCharts);
  debugger;
}

function drawCharts() {
  debugger;

  // actual bar chart data

  let dataArray = [];
  dataArray.push(['Country', 'Consumption', 'USA Consumption']);
  for(let i=1; i<8; i++) {
    let item = [bc[i].country, bc[i].Consumption, bc[0].Consumption];
    dataArray.push(item);
  }
  var barData = google.visualization.arrayToDataTable(dataArray);

  // var barData = google.visualization.arrayToDataTable([
  //   ['Country', 'Consumption', 'USA Consumption'],
  //   ['Czech Republic',  137.38,      74.90],
  //   ['Poland',  98.06,      74.90],
  //   ['Germany',  95.95,       74.90],
  //   ['Austria',  95.46,      74.90],
  //   ['Lithuania',  92,      74.90],
  //   ['Croatia',  81.19,      74.90],
  //   ['Ireland',  79.22,       74.90]
  // ]);

  // set bar chart options
  var barOptions = {
    focusTarget: 'category',
    backgroundColor: 'transparent',
    colors: ['#FFD05A', '#DB3D34'],
    fontName: 'Open Sans',
    chartArea: {
      left: 50,
      top: 10,
      width: '100%',
      height: '70%'
    },
    bar: {
      groupWidth: '80%'
    },
    hAxis: {
      textStyle: {
        fontSize: 11
      }
    },
    vAxis: {
      minValue: 0,
      maxValue: 150,
      baselineColor: '#3A2B23',
      gridlines: {
        color: '#3A2B23',
        count: 4
      },
      textStyle: {
        fontSize: 11
      }
    },
    legend: {
      position: 'bottom',
      textStyle: {
        fontSize: 12
      }
    },
    animation: {
      duration: 120,
      easing: 'out',
			startup: true
    }
  };
  // draw bar chart twice so it animates
  var barChart = new google.visualization.ColumnChart(document.getElementById('bar-chart'));
  //barChart.draw(barZeroData, barOptions);
  barChart.draw(barData, barOptions);

  // BEGIN LINE GRAPH

  function randomNumber(base, step) {
    return Math.floor((Math.random()*step)+base);
  }
  function createData(year, start1, start2, step, offset) {
    var ar = [];
    for (var i = 0; i < 12; i++) {
      ar.push([new Date(year, i), randomNumber(start1, step)+offset, randomNumber(start2, step)+offset]);
    }
    return ar;
  }
  var randomLineData = [
    ['Year', 'Global Consumption', 'USA Consumption']
  ];
  for (var x = 0; x < 7; x++) {
    var newYear = createData(2011+x, 10000, 5000, 4000, 800*Math.pow(x,2));
    for (var n = 0; n < 12; n++) {
      randomLineData.push(newYear.shift());
    }
  }
  var lineData = google.visualization.arrayToDataTable(randomLineData);

	/*
  var animLineData = [
    ['Year', 'Page Views', 'Unique Views']
  ];
  for (var x = 0; x < 7; x++) {
    var zeroYear = createData(2007+x, 0, 0, 0, 0);
    for (var n = 0; n < 12; n++) {
      animLineData.push(zeroYear.shift());
    }
  }
  var zeroLineData = google.visualization.arrayToDataTable(animLineData);
	*/

  var lineOptions = {
    backgroundColor: 'transparent',
    colors: ['#FFD05A', '#DB3D34'],
    fontName: 'Open Sans',
    focusTarget: 'category',
    chartArea: {
      left: 50,
      top: 10,
      width: '100%',
      height: '70%'
    },
    hAxis: {
      //showTextEvery: 12,
      textStyle: {
        fontSize: 11
      },
      baselineColor: 'transparent',
      gridlines: {
        color: 'transparent'
      }
    },
    vAxis: {
      minValue: 0,
      maxValue: 180,
      baselineColor: '#3A2B23',
      gridlines: {
        color: '#3A2B23',
        count: 4
      },
      textStyle: {
        fontSize: 11
      }
    },
    legend: {
      position: 'bottom',
      textStyle: {
        fontSize: 12
      }
    },
    animation: {
      duration: 1200,
      easing: 'out',
			startup: true
    }
  };

  var lineChart = new google.visualization.LineChart(document.getElementById('line-chart'));
  //lineChart.draw(zeroLineData, lineOptions);
  lineChart.draw(lineData, lineOptions);

  // BEGIN PIE CHART

  // pie chart data
  var pieData = google.visualization.arrayToDataTable([
    ['Country', 'Beer Production'],
    ['Germany',      94957],
    ['Spain',   36469],
    ['Netherlands',   24559],
    ['UK',    43734],
    ['Poland',  41369]
  ]);
  // pie chart options
  var pieOptions = {
    backgroundColor: 'transparent',
    pieHole: 0.4,
    colors: [ "#FFD05A",
              "#D17C4B",
              "#F2A77B",
              "#DB3D34",
              "crimson",
              "purple",
              "#ECD2A9",
              "#9C7D54",
              "navy",
              "gray"],
    pieSliceText: 'value',
    tooltip: {
      text: 'percentage'
    },
    fontName: 'Open Sans',
    chartArea: {
      width: '100%',
      height: '94%'
    },
    legend: {
      textStyle: {
        fontSize: 13
      }
    }
  };
  // draw pie chart
  var pieChart = new google.visualization.PieChart(document.getElementById('pie-chart'));
  pieChart.draw(pieData, pieOptions);
}

$(document).ready(function() {
  requestData();
});
