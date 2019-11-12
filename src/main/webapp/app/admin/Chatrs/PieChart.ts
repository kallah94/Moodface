export class PieChartDemo {
  data: any;
  Nbmoods: Number;
  Nbusers: Number;
  titre: String;
  options: any;

  constructor(titre: String, dat: any, Nbuser: Number, Nbmood: Number) {
    this.data = {
      labels: ['Very Happy', 'Happy', 'Angry', 'Sad'],
      datasets: [
        {
          data: dat,
          backgroundColor: [
            ' greenYellow', // vert foncee
            '#a5d152', // vert d eau
            '#FFCE56', // orange
            'red' // rouge
          ],
          hoverBackgroundColor: ['#36A2EB', '#36A2EB', '#36A2EB', '#36A2EB']
        }
      ]
    };
    this.options = {
      title: {
        display: true,
        text: titre,
        orient: 'vertical',
        position: 'bottom',
        fontSize: 20,
        fontColor: '#FFFFFF',
        fontFamily: 'Montserrat'
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipLabel = data.labels[tooltipItem.index];
            const tooltipData = allData[tooltipItem.index];
            let total = 0;
            for (const i in allData) {
              if (this[i] !== 0) {
                total += allData[i];
              }
            }
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)';
          }
        },
        enabled: true
      },
      legend: {
        text: 'Legende',
        orient: 'vertical',
        position: 'left',
        display: true,
        labels: {
          fontColor: '#FFFFFFF',
          fontSize: 14,
          fontFamily: 'Montserrat'
        }
      }
    };

    this.Nbmoods = Nbmood;
    this.Nbusers = Nbuser;
  }
}
