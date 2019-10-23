export class BarChartDemo {
  data: any;

  constructor(private dat: any[]) {
    this.data = {
      labels: ['January', 'February', 'March'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: this.dat.pop()
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: this.dat.pop()
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [0, 2, 2]
        }
      ]
    };
  }
}
