import React, { Component } from 'react';

export default class incidentlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formInputs: {
        name: '',
        department: '',
        risktype: '',
        incidentdate: '',
        incidentdesc: '',
        action: '',
        status: ''
      }
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('form inputs', this.state.formInputs);
    fetch('http://localhost:3000/incidentlogs', {
      body: JSON.stringify(this.state.formInputs),
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(createdNotice => {
        return createdNotice.json();
      })
      .then(jsonedNotice => {
        // reset the form
        // add notice to notices
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
        <div className=''>
          <div className='page-title'>
            <div className='title_left'>
              <h3>Log Incident</h3>
            </div>
          </div>

          <div className='clearfix'></div>

          <div className='clearfix'></div>

          <div className='x_content'>
            <br />
            <form
              id='demo-form2'
              data-parsley-validate
              className='form-horizontal form-label-left'
              onSubmit={this.handleSubmit}
            >
              <div className='item form-group'>
                <label
                  className='col-form-label col-md-3 col-sm-3 label-align'
                  htmlFor='name'
                >
                  Name<span className='required'>*</span>
                </label>
                <div className='col-md-6 col-sm-6 '>
                  <input
                    type='text'
                    id='name'
                    required='required'
                    className='form-control '
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className='item form-group'>
                <label
                  className='col-form-label col-md-3 col-sm-3 label-align'
                  htmlFor='department'
                >
                  Department<span className='required'>*</span>
                </label>
                <div className='col-md-6 col-sm-6 '>
                  <input
                    type='text'
                    id='department'
                    name='department'
                    required='required'
                    className='form-control'
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {/* <!-- select dropdown --> */}
              <div className='form-group row'>
                <label className='control-label col-md-3 col-sm-3 label-align'>
                  Incident Status
                  <span className='required'>*</span>
                </label>
                <div className='col-md-6 col-sm-6 '>
                  <select
                    id='risktype'
                    className='form-control'
                    value={this.state.value}
                    onChange={this.handleChange}
                  >
                    <option disabled selected hidden>
                      Select
                    </option>
                    <option>open</option>
                    <option>closed</option>
                  </select>
                </div>
              </div>
              {/* <!-- select dropdown --> */}
              <div className='form-group row'>
                <label className='control-label col-md-3 col-sm-3 label-align'>
                  Type of Risk
                  <span className='required'>*</span>
                </label>
                <div className='col-md-6 col-sm-6 '>
                  <select
                    id='risktype'
                    className='form-control'
                    value={this.state.value}
                    onChange={this.handleChange}
                  >
                    <option disabled selected hidden>
                      Select
                    </option>
                    <option>Financial</option>
                    <option>Operational</option>
                    <option>Compliance</option>
                    <option>IT System</option>
                  </select>
                </div>
              </div>

              <div className='form-group row'>
                <label className='control-label col-md-3 col-sm-3 label-align'>
                  Date of Incident
                  <span className='required'>*</span>
                </label>
                <div className='control-group'>
                  <div className='controls'>
                    <div className='col-md-11 xdisplay_inputx form-group row has-feedback'>
                      <input
                        type='date'
                        className='form-control has-feedback-left'
                        id='incidentdate'
                        aria-describedby='inputSuccess2Status3'
                        onChange={this.handleChange}
                      />
                      <span
                        className='fa fa-calendar-o form-control-feedback left'
                        aria-hidden='true'
                      ></span>
                      <span id='inputSuccess2Status3' className='sr-only'>
                        (success)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- select dropdown -->
                  <!-- Text --> */}
              <h2>Incident Description</h2>
              <div className='form-group'>
                <textarea
                  id='incidentdesc'
                  value={this.state.value}
                  onChange={this.handleChange}
                  className='resizable_textarea form-control'
                ></textarea>
              </div>

              <h2>Action</h2>
              <div className='form-group'>
                <textarea
                  className='resizable_textarea form-control'
                  id='action'
                  value={this.state.value}
                  onChange={this.handleChange}
                ></textarea>
              </div>
              {/* <!-- Text --> */}
              <button type='submit' className='btn btn-success'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
