import { Component, Host, h, Prop, State, Listen } from '@stencil/core';

@Component({
  tag: 'table-component',
  styleUrl: 'table-component.scss',
  shadow: false,
})

export class TableComponent {

  @Prop({ attribute: 'array' })  dataSet: any[] = [
    {
      driver: 'Marcus Lundberg',
      company: 'Aris FC',
      distance: 75044,
      score: 52,
    },
    {
      driver: 'Marcus Mena Pacheco',
      company: 'Lio LTD',
      distance: 129417,
      score: 95,
    },
    {
      driver: 'Valentine Ichtertz',
      company: 'LOTS Group',
      distance: 244656,
      score: 67,
    },
    {
      driver: 'Niklas Rosén',
      company: 'DD Interactive',
      distance: 200000,
      score: 78,
    },
  ]

  @State() tableData: any[] = this.dataSet;

  @Listen('selected', { target: 'body' })

  filterComparison(event: CustomEvent<string>) {
    const value = event.detail;
    const comparison = value.split(' ')[0];
    const condition = +Number(value.split(' ')[1]) || 0;
   
    if(value === 'initial') {
      this.tableData = this.dataSet;
    }
  
    if(comparison === '<') {
      this.tableData = this.dataSet.filter(item => {
        return item.distance < condition;
      });

    } if(comparison === '<=') {
      this.tableData = this.dataSet.filter(item => {
        return item.distance <= condition;
      });

    } if(comparison === '=') {
      this.tableData = this.dataSet.filter(item => {
        return (item.distance = condition);
      });

    } if (comparison === '>') {
      this.tableData = this.dataSet.filter(item => {
        return item.distance > condition;
      });
      
    } if(comparison === '>=') {
      this.tableData = this.dataSet.filter(item => {
        return item.distance >= condition;
      });
    }
  }

  handleDropdown(event: CustomEvent<string>) {
    this.filterComparison(event);
  }

  formatDistance(value: any): any {
    return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  componentDidLoad() {
    console.log('--- Scania Dev Test ---');
  }

  render() {
    return (
      <Host>
        <table>
          <thead class="table-component__header">
            <tr class="table-component__title">
              <th>Driver</th>
              <th>Company</th>
              <th>Distance</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
          {this.tableData.map(entry => (
            <tr>
               <td>{entry.driver}</td>
               <td>{entry.company}</td>
               <td>{this.formatDistance(entry.distance)} km</td>
               <td>{entry.score}</td>
            </tr>
           ))}
          </tbody>
        </table>
      </Host>
    );
  }

}
