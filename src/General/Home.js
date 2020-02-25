import React, { Component } from 'react';
// import Cheerio from 'cheerio';
import $ from 'jquery';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusarea: {},
      lifebusiness: []
    };
  }
  componentDidMount() {
    this.getupdates();
    this.getapi();
  }
  getupdates() {
    fetch('http://localhost:3000/scrapper')
      .then(response => {
        console.log('fetching...');
        return response.json();
      })
      .then(json => {
        console.log('json', json);
        this.setState({ focusarea: json });
      })
      .catch(error => {
        console.log('error...');
        console.error(error);
      });
  }

  getapi() {
    fetch(
      'https://eservices.mas.gov.sg/api/action/datastore/search.json?resource_id=7b940841-4f36-4f98-9919-57c834fff451&limit=12&sort=end_of_quarter%20desc'
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log('json', json.result.records);
        this.setState({ lifebusiness: json.result.records });
      })
      .catch(error => {
        console.log('error...');
        console.error(error);
      });
  }

  render() {
    return (
      <div className='right_col' role='main'>
        <div className=''>
          <div className='page-title'>
            <div className='title_left'>
              <h3>Main Page</h3>
            </div>
          </div>

          <div className='clearfix'></div>

          <div className='row'>
            <div className='col-md-12 col-sm-12  '>
              <div className='x_panel'>
                <div className='x_title'>
                  <h2>Focus Area from MAS</h2>
                  <div className='clearfix'></div>
                </div>
                <div className='x_content'>
                  {this.state.focusarea.href
                    ? this.state.focusarea.href.map((incident, index) => (
                        <li>
                          {' '}
                          <a href={incident}>
                            {' '}
                            {this.state.focusarea.focusarea[index]}{' '}
                          </a>
                        </li>
                      ))
                    : ''}
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12 col-sm-12  '>
              <div className='x_panel'>
                <div className='x_title'>
                  <h2>Business in Singapore</h2>
                  <div className='clearfix'></div>
                </div>
                <div className='x_content'>
                  {this.state.lifebusiness.slice(0, 1).map(results => (
                    <React.Fragment>
                      <h4> {results.end_of_quarter} </h4>
                      <h6> Individual Policies</h6>
                      <li>
                        Number of Policies:{' '}
                        {parseFloat(
                          results.indiv_num_policies
                        ).toLocaleString()}
                      </li>{' '}
                      <li>
                        Total Premium: SGD{' '}
                        {parseFloat(results.indiv_premium).toLocaleString()} Mil
                      </li>
                      <h6> Group Policies</h6>
                      <li>
                        Number of Policies:{' '}
                        {parseFloat(
                          results.group_num_policies
                        ).toLocaleString()}
                      </li>{' '}
                      <li>
                        Total Premium: SGD{' '}
                        {parseFloat(results.group_premium).toLocaleString()} Mil
                      </li>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
