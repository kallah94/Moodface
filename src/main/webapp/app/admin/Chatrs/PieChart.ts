export class PieChartDemo {
  data: any;
  Nbmoods: Number;
  Nbusers: Number;
  titre: String;
  options: any;

  constructor(dat: any, titre: String, Nbuser: Number, Nbmood: Number) {
    this.data = {
      labels: ['V_H', 'HAP', 'ANG', 'SAD'],
      datasets: [
        {
          name: 'Countries',
          type: 'pie',
          radius: '80%',
          center: ['50%', '50%'],
          data: dat,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: '#FFFFF'
            }
          },
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
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        position: 'bottom',
        display: true,
        fontColor: '#FFFFFF'
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
