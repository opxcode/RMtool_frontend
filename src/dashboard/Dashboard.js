import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incidents: [],
      incidentsagg: [],
      incidentsagg2: [],
      data: {
        labels: [],
        datasets: [
          {
            label: 'Number of Incidents',
            data: [],
            backgroundColor: []
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                stepSize: 1
              }
            }
          ]
        }
      },
      width: 500,
      height: 300
    };

    // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     datasets: [{
    //         label: '# of Votes',
    //         data: [12, 19, 3, 5, 2, 3],
    //         backgroundColor: [
    //             'rgba(255, 99, 132, 0.2)',
    //             'rgba(54, 162, 235, 0.2)',
    //             'rgba(255, 206, 86, 0.2)',
    //             'rgba(75, 192, 192, 0.2)',
    //             'rgba(153, 102, 255, 0.2)',
    //             'rgba(255, 159, 64, 0.2)'
    //         ],
    //         borderColor: [
    //             'rgba(255, 99, 132, 1)',
    //             'rgba(54, 162, 235, 1)',
    //             'rgba(255, 206, 86, 1)',
    //             'rgba(75, 192, 192, 1)',
    //             'rgba(153, 102, 255, 1)',
    //             'rgba(255, 159, 64, 1)'
    //         ],
    //         borderWidth: 1
    //     }]
  }
  componentDidMount() {
    this.getData1();
    this.getData2();
  }
  getData1() {
    fetch('http://localhost:3000/incidentlogs')
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
        this.setState({ incidents: [...json, ...this.state.incidents] });
      })
      .catch(error => console.error(error));
  }
  getData2() {
    fetch('http://localhost:3000/incidentquery')
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);

        this.setState(
          {
            incidentsagg: [...json.total, ...this.state.incidentsagg],
            incidentsagg2: [
              ...json.totalbyrisktype,
              ...this.state.incidentsagg2
            ]
          },

          () => {
            this.updateArray();
          }
        );
      })
      .then(() => {
        console.log('check ' + this.state.incidentsagg2[0].incidentcount);
      })
      .catch(error => console.error(error));
  }

  updateArray() {
    let labelArray = [];
    let dataaAray = [];
    this.state.incidentsagg.map(obj => {
      labelArray.push(obj.incidentmth);
      dataaAray.push(obj.incidentcount);
    });
    console.log('label', labelArray);
    console.log('data', dataaAray);
    this.setState({
      data: {
        labels: labelArray,
        datasets: [
          {
            label: 'Number of Incidents',
            data: dataaAray,
            backgroundColor: 'rgba(54, 162, 235, 0.2)'
          }
        ]
      }
    });
  }

  render() {
    return (
      <div>
        <div className='right_col' role='main'>
          {/* top tiles */}
          <div className='row tile_count'>
            <div className='col-md-3 col-sm-4 col-xs-6 tile_stats_count'>
              <span className='count_top'>
                <i className='fa fa-user' /> Total Incidents
              </span>
              <div className='count'>{this.state.incidents.length}</div>
            </div>
            <div className='col-md-3 col-sm-4 col-xs-6 tile_stats_count'>
              <span className='count_top'>
                <i className='fa fa-user' /> Operational Incidents
              </span>
              <div className='count'>
                {this.state.incidentsagg2[1]
                  ? this.state.incidentsagg2[1].incidentcount
                  : ''}
              </div>
            </div>
            <div className='col-md-3 col-sm-4 col-xs-6 tile_stats_count'>
              <span className='count_top'>
                <i className='fa fa-user' /> Financial Incidents
              </span>
              <div className='count'>
                {this.state.incidentsagg2[0]
                  ? this.state.incidentsagg2[0].incidentcount
                  : ''}
              </div>
            </div>
            <div className='col-md-3 col-sm-4 col-xs-6 tile_stats_count'>
              <span className='count_top'>
                <i className='fa fa-user' /> Compliance Incidents
              </span>
              <div className='count'>
                {this.state.incidentsagg2[2]
                  ? this.state.incidentsagg2[2].incidentcount
                  : ''}
              </div>
            </div>
          </div>

          {/* /top tiles */}
          <div className='row'>
            <div className='col-md-12 col-sm-12 col-xs-12'>
              <div className='dashboard_graph'>
                <div className='row x_title'>
                  <div className='col-md-6'>
                    <h3>Number of Incidents</h3>
                  </div>
                  <div className='col-md-6'>
                    <div></div>
                  </div>
                </div>
                <div className='col-md-9 col-sm-9 col-xs-12'>
                  <Bar
                    data={this.state.data}
                    width={this.state.width}
                    height={this.state.height}
                    options={this.state.options}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
