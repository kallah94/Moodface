export class LineChartDemo {
  data: any;

  constructor(name: String, dat: any) {
    this.data = {
      labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
      datasets: [
        {
          label: name,
          data: dat,
          fill: true,
          borderColor: '#4bc0c0',
          borderWidth: 2,
          radius: 0.9
        }
      ]
    };
  }
}
