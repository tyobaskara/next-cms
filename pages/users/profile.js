import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
  static async getInitialProps(props) {
    const { query } = props;
    let user;
    console.log('~props', props);

    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${query.userId}`
      );
      user = response.data;
    } catch (error) {
      console.error(error);
    }

    return { user };
  }

  showUser = user => (
    <div>
      <div>Name: {user.name}</div>
      <div>Lastname: {user.phone}</div>
      <div>Email: {user.email}</div>
    </div>
  );

  render() {
    console.log('Hoi', this.props);
    return (
      <>
        <br />
        <h1>User Profile</h1>
        {this.showUser(this.props.user)}
      </>
    );
  }
}

export default Profile;
