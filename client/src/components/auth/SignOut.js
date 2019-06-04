import React from 'react';
import { connect } from 'react-redux';
import {
  signOut
} from '../../actions';

class SignOut extends React.Component {
  componentDidMount() {
    this.props.signOut();
  }

  render() {
    return (
      <div>Bye bye!</div>
    );
  }
}

export default connect(null, {
  signOut
})(SignOut);