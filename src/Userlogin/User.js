import React, { Component } from 'react';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userauth: {
        email: '',
        encrypted_password: ''
      }
    };
  }
  handleChange = event => {
    const updateInput = Object.assign(this.state.userauth, {
      [event.target.id]: event.target.value
    });
    this.setState(updateInput);
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('form inputs', this.state.userauth);
    fetch('http://localhost:3000/users', {
      body: JSON.stringify(this.state.userauth),
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(createdNotice => {
        console.log('createdNotice', createdNotice);
        return createdNotice.json();
      })
      .then(jsonedNotice => {
        console.log('jsonedNotice', jsonedNotice);
        // reset the form
        // add notice to notices
        this.setState({
          userauth: {
            email: '',
            encrypted_password: ''
          }
        });
      })
      .catch(error => console.log(error));
  };
  render() {
    return (
      <div className='right_col' role='main'>
        <div className=''>
          <div className='page-title'>
            <div className='title_left'>
              <h3>Sign Up</h3>
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
                  htmlFor='email'
                >
                  Email<span className='required'>*</span>
                </label>
                <div className='col-md-6 col-sm-6 '>
                  <input
                    type='text'
                    id='email'
                    required='required'
                    className='form-control '
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className='item form-group'>
                <label
                  className='col-form-label col-md-3 col-sm-3 label-align'
                  htmlFor='encrypted_password'
                >
                  Password<span className='required'>*</span>
                </label>
                <div className='col-md-6 col-sm-6 '>
                  <input
                    type='text'
                    id='encrypted_password'
                    required='required'
                    className='form-control '
                    onChange={this.handleChange}
                  />
                </div>
              </div>
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
