export class LineChartDemo {
  data: any;
  options: {
    scales: {
      yAxes: {
        id: string;
        type: string;
        position: string;
        scaleLabel: { display: boolean; labelString: string; fontFamily: string; fontSize: number; fontColor: string };
        ticks: { fontFamily: string; reverse: boolean; min: number; max: number; stepSize: number };
      }[];
    };
  };

  constructor(name: String, dat: any) {
    this.data = {
      labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
      datasets: [
        {
          label: name,
          data: dat,
          fill: true,
          borderColor: 'rgb(255,69,0)',
          borderWidth: 2.5,
          radius: 0.9
        }
      ]
    };
    this.options = {
      scales: {
        yAxes: [
          {
            id: 'yaxis',
            type: 'linear',
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: 'Health',
              fontFamily: 'Montserrat',
              fontSize: 20,
              fontColor: 'white'
            },
            ticks: {
              fontFamily: 'Montserrat',
              reverse: false,
              min: -100,
              max: 100,
              stepSize: 50
            }
          }
        ]
      }
    };
  }
}
