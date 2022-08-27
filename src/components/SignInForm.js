import React from "react";
import { connect } from "react-redux";
import { login } from "../store";
import "../SignInForm.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

class SignInForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  onSubmit(ev) {
    ev.preventDefault();
    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.login(credentials);
  }

  render() {
    const { flipModal, session } = this.props;
    const { email, password } = this.state;
    const { onChange, onSubmit } = this;

    return (
      <div id="signIn" className="side signIn">
        <h2>WELCOME BACK</h2>
        <h4>SIGN IN BELOW</h4>
        <form onSubmit={onSubmit}>
          <TextField
            required
            type="email"
            name="email"
            label="Email"
            size="small"
            onChange={onChange}
            value={email}
          />
          <TextField
            required
            name="password"
            type="password"
            label="Password"
            size="small"
            onChange={onChange}
            value={password}
          />
          <Button type="submit" variant="contained">
            SIGN IN
          </Button>
        </form>
        <p>DON&apos;T HAVE AN ACCOUNT?</p>
        <p>
          SIGN UP
          <span onClick={() => flipModal()}> HERE </span>
        </p>
        {session.invalidLogin ? <p>INVALID EMAIL OR PASSWORD</p> : null}
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect((state) => state, mapDispatch)(SignInForm);
