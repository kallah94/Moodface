export class PieChartDemo {
  data: any;
  Nbmoods: Number;
  Nbusers: Number;
  titre: String;
  options: {
    title: {
      display: boolean;
      text: String;
      fontSize: number;
      fontColor: string;
    };
    legend: {
      position: string;
      display: any;
    };
  };

  constructor(dat: any, titre: String, Nbuser: Number, Nbmood: Number) {
    this.data = {
      labels: ['V_H', 'HAP', 'ANG', 'SAD'],
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
      legend: {
        position: 'left',
        display: false
      }
    };

    this.Nbmoods = Nbmood;
    this.Nbusers = Nbuser;
  }
}
