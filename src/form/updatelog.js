import React, { Component } from 'react';

export default class updatelog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formInputs: this.props.location.state.incident
    };
  }
  updateIncidents = id => {
    console.log('here', id);
    fetch('https://sheltered-citadel-09312.herokuapp.com/incidentlogs/' + id, {
      body: JSON.stringify(this.state.formInputs),
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(createdNotice => {
        return createdNotice.json();
      })
      .then(() => {
        this.setState({
          formInputs: {
            name: '',
            department: '',
            risktype: '',
            incidentdate: '',
            incidentdesc: '',
            action: '',
            status: ''
          }
        });

        window.location.replace('/incident');
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const updateInput = Object.assign(this.state.formInputs, {
      [event.target.id]: event.target.value
    });
    this.setState(updateInput);
  };
  render() {
    return (
      <div className='right_col' role='main'>
        <div className='col-md-6 col-sm-6'>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Date Reported</th>
                <th>Department</th>
                <th>Risk Type</th>
                <th>Incident Description</th>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tr>
              <td>
                <input
                  id='incidentdate'
                  onChange={this.handleChange}
                  value={this.state.formInputs.incidentdate}
                />
              </td>
              <td>
                <input
                  id='department'
                  onChange={this.handleChange}
                  value={this.state.formInputs.department}
                />
              </td>
              <td>
                <input
                  id='risktype'
                  onChange={this.handleChange}
                  value={this.state.formInputs.risktype}
                />
              </td>
              <td>
                <input
                  id='incidentdesc'
                  onChange={this.handleChange}
                  value={this.state.formInputs.incidentdesc}
                />
              </td>
              <td>
                <input
                  id='action'
                  onChange={this.handleChange}
                  value={this.state.formInputs.action}
                />
              </td>
              <td>
                <input
                  id='status'
                  onChange={this.handleChange}
                  value={this.state.formInputs.status}
                />
              </td>
            </tr>
          </table>
          <button
            onClick={() => {
              this.updateIncidents(this.state.formInputs.id);
            }}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}
