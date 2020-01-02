import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';
import MainLayout from '../components/layouts/mainLayout';

class Home extends Component {
  static async getInitialProps({ pathname, query, asPath, req, res }) {
    let userData,
      error = {};

    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users/1'
      );
      userData = response.data;
    } catch (e) {
      error = e;
    }

    return {
      user: {
        name: 'Francis',
        lastname: 'Jones'
      },
      userData,
      error
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      error: this.props.error
    };
  }

  _closeModal = () => {
    this.setState({
      error: {}
    });
  };

  _renderErrorModal = () => {
    const { error } = this.state;

    return (
      !isEmpty(error) && (
        <div className='swwModal'>
          <div className='swwModal__box'>
            <p>Something went wrong!</p>
            <button className='btn btn-secondary' onClick={this._closeModal}>
              Close
            </button>
          </div>
        </div>
      )
    );
  };

  render() {
    return (
      <>
        <MainLayout>
          <h1 className='headingOne'>Welcome {this.props.user.name}</h1>
          {this._renderErrorModal()}
        </MainLayout>
      </>
    );
  }
}

export default Home;
