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
            '#008000', // vert foncee
            '#B0F2B6', // vert d eau
            '#FFA500', // orange
            '#FF0000' // rouge
          ],
          hoverBackgroundColor: [
            '#B0F2B6', // vert d eau
            '#36A2EB',
            '#FFCE56',
            '#FDDDDD'
          ]
        }
      ]
    };
    this.options = {
      title: {
        display: true,
        text: titre,
        fontSize: 20,
        fontColor: '#FFFFFF'
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
        orient: 'vertical',
        position: 'left',
        display: true,
        labels: {
          fontColor: '#FFFFFFF'
        }
      },
      labelLine: {
        normal: {
          lineStyle: {
            color: '#FFFFF'
          }
        }
      }
    };

    this.Nbmoods = Nbmood;
    this.Nbusers = Nbuser;
  }
}
