import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class incident extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incidents: [],
      filterdept: '',
      incidentlist: []
    };
  }
  componentDidMount() {
    this.getIncidents();
  }
  getIncidents() {
    fetch('https://sheltered-citadel-09312.herokuapp.com/incidentlogs')
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
        this.setState({ incidents: [...json, ...this.state.incidents] });
      })
      .catch(error => console.error(error));
  }
  deleteIncidents = incident => {
    console.log('here', incident);
    fetch(
      'https://sheltered-citadel-09312.herokuapp.com/incidentlogs/' +
        incident.id,
      {
        method: 'DELETE'
      }
    )
      .then(() => {
        this.getIncidents();
        // return response.json();
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    this.setState({ filterdept: event.target.value });
  };
  handleSubmit = () => {
    this.state.filterdept !== ''
      ? this.setState({
          incidentlist: this.state.incidents.filter(incident => {
            return incident.department
              .toLowerCase()
              .includes(this.state.filterdept.toLowerCase());
          })
        })
      : this.setState({
          incidentlist: []
        });
  };
  render() {
    const thStyle = {
      width: '35%'
    };
    const tdStyle = {
      width: '35%'
    };
    let incidents = this.state.incidents;
    this.state.incidentlist.length == 0
      ? (incidents = this.state.incidents)
      : (incidents = this.state.incidentlist);

    return (
      <div className='right_col' role='main'>
        <div className='page-title'>
          <div className='title_left'>
            <h3>Incident log</h3>
          </div>
          <div className='title_right'>
            <div className='col-md-5 col-sm-5   form-group pull-right top_search'>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control'
                  onChange={this.handleChange}
                  placeholder='Search department...'
                  value={this.state.filterdept}
                />
                <span className='input-group-btn'>
                  <button
                    className='btn btn-default'
                    type='button'
                    onClick={this.handleSubmit}
                  >
                    Search
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
        <table className='table table-bordered'>
          <thead className='text-center'>
            <th>#</th>
            <th>Date Reported</th>
            <th>Department</th>
            <th>Risk Type</th>
            <th style={thStyle}>Incident Description</th>
            <th> Action</th>
            <th> Status </th>
            <th colspan='2'>Edit</th>
          </thead>
          <tbody>
            {incidents.map((incident, index) => (
              <tr key={index}>
                <td> {index + 1} </td>
                {/* <td onClick={this.handleClick}>
                    {this.state.edit ? (
                      <input placeholder={incident.incidentdate} />
                    ) : (
                      incident.incidentdate
                    )}
                  </td> */}
                <td>{incident.incidentdate}</td>
                <td>{incident.department} </td>
                <td> {incident.risktype} </td>
                <td style={tdStyle}> {incident.incidentdesc} </td>
                <td>{incident.action} </td>
                <td>{incident.status}</td>
                <td>
                  <button
                    className='btn fa fa-trash'
                    onClick={() => {
                      this.deleteIncidents(incident);
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Link
                    className='btn fa fa-edit'
                    to={{
                      pathname: '/updatelog',
                      state: { incident: incident }
                    }}
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
