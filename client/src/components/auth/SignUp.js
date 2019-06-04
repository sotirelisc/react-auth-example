import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { signUp } from '../../actions';

class SignUp extends React.Component {
  onSubmit = formProps => {
    this.props.signUp(formProps, () => {
      this.props.history.push('/feature');
    });
  };

  render() {
    // Provided by redux-form
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email</label>
          <Field
            name="email"
            type="text"
            component="input"
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field
            name="password"
            type="password"
            component="input"
          />
        </fieldset>
        <div>
          {this.props.errorMessage}
        </div>
        <button>Sign Up</button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.errorMessage
  };
};

// Combine HOCs
export default compose(
  connect(mapStateToProps, {
    signUp
  }),
  reduxForm({
    form: 'SignUp'
  })
)(SignUp);