import React, { Component } from 'react';
import Link from 'next/link'
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';
import MainLayout from '../components/layouts/mainLayout';

class Home extends Component {
  static async getInitialProps({ pathname, query, asPath, req, res }) {
    let userData,
      error = {};

    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
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

  renderUserList = users =>
    users.map((user, i) => (
      <li className='list-group-item' key={i}>
        <Link
          as={`/users/profile/${user.id}`}
          href={{
            pathname: '/users/profile',
            query: {
              userId: user.id
            }
          }}
        >
          <a>{user.name}</a>
        </Link>
      </li>
    ));

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

          <h2>Pick a user</h2>
          <ul className='list-group'>
            {this.renderUserList(this.props.userData)}
          </ul>
          {this._renderErrorModal()}
        </MainLayout>
      </>
    );
  }
}

export default Home;
