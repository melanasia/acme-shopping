import React from "react";
import { connect } from "react-redux";
import { createUser } from "../store";
import "../SignUpForm.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

class SignUpForm extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
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
    this.props.createUser(this.state);
  }

  render() {
    const { flipModal, session } = this.props;
    const { firstName, lastName, email, password, phone } = this.state;
    const { onChange, onSubmit } = this;

    return (
      <div id="signUp" className="side signUp">
        <h2>Welcome to Grace Shopper</h2>
        <h4>Complete the below form to sign up</h4>
        <form onSubmit={onSubmit}>
          <div>
            <TextField
              required
              name="firstName"
              label="First Name"
              size="small"
              onChange={onChange}
              value={firstName}
            />
            <TextField
              required
              name="lastName"
              label="Last Name"
              size="small"
              onChange={onChange}
              value={lastName}
            />
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
              type="password"
              name="password"
              label="Password"
              size="small"
              onChange={onChange}
              value={password}
            />
            <TextField
              required
              name="phone"
              label="Phone Number"
              placeholder="Required Format ###-###-####"
              size="small"
              onChange={onChange}
              value={phone}
            />
          </div>
          <Button type="submit" variant="contained">
            SIGN UP
          </Button>
        </form>
        <p>ALREADY HAVE AN ACCOUNT?</p>
        <p>
          SIGN IN
          <span onClick={() => flipModal()}> HERE </span>
        </p>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    createUser: (user) => {
      dispatch(createUser(user));
    },
  };
};

export default connect((state) => state, mapDispatch)(SignUpForm);
