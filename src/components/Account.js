import React, { Fragment } from "react";
import { connect } from "react-redux";
import { HashLink } from "react-router-hash-link";
import "../Account.css";
import { updateUser } from "../store";
import TextField from "@mui/material/TextField";
import NavAccount from "./NavAccount";

class Account extends React.Component {
  constructor() {
    super();
    this.state = {
      displayEditForm: false,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      passwordVerify: "",
    };
    this.save = this.save.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  save(ev) {
    ev.preventDefault();
    if (this.state.password !== this.state.passwordVerify) {
      alert("Password does not match");
    }
    this.props.updateUser(this.state);
    this.setState({ displayEditForm: false });
  }
  componentDidMount() {
    this.setState({ ...this.props.session.auth, password: "" });
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.session.auth.id && this.props.session.auth.id) {
      this.setState({ ...this.props.session.auth, password: "" });
    }
  }

  render() {
    const user = this.props.session.auth;
    const {
      displayEditForm,
      firstName,
      lastName,
      email,
      phone,
      password,
      passwordVerify,
    } = this.state;
    const { onChange, save } = this;
    return (
      <div id="account-page">
        <h2>Welcome {user.firstName}</h2>
        <div className="container">
          <NavAccount />
          <table className="personal-info">
            <tbody>
              <tr>
                <td>First Name:</td>
                <td>{user.firstName}</td>
              </tr>
              <tr>
                <td>Last Name:</td>
                <td>{user.lastName}</td>
              </tr>
              <tr>
                <td>E-mail:</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Phone:</td>
                <td>{user.phone}</td>
              </tr>
            </tbody>
          </table>
          <HashLink to="/account/profile#edit-form">
            <i
              className="fa-solid fa-pencil"
              onClick={() => this.setState({ displayEditForm: true })}
            ></i>
          </HashLink>
        </div>

        {displayEditForm ? (
          <form id="edit-form" className="edit-form" onSubmit={save}>
            <TextField
              required
              margin="dense"
              type="text"
              name="firstName"
              label="First name"
              size="small"
              onChange={onChange}
              value={firstName}
            />
            <TextField
              required
              margin="dense"
              type="text"
              name="lastName"
              label="Last name"
              size="small"
              onChange={onChange}
              value={lastName}
            />
            <TextField
              required
              margin="dense"
              type="email"
              name="email"
              label="E-mail"
              size="small"
              onChange={onChange}
              value={email}
            />
            <TextField
              required
              margin="dense"
              type="tel"
              name="phone"
              label="Phone"
              size="small"
              onChange={onChange}
              value={phone}
            />
            <TextField
              margin="dense"
              type="password"
              name="password"
              label="Password"
              size="small"
              onChange={onChange}
              value={password}
            />
            <TextField
              margin="dense"
              type="password"
              name="passwordVerify"
              label="Repeat password"
              size="small"
              onChange={onChange}
              value={passwordVerify}
            />
            <button
              disabled={!firstName && !lastName && !email && !phone}
              type="submit"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => this.setState({ displayEditForm: false })}
            >
              Cancel
            </button>
          </form>
        ) : null}
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
  };
};

export default connect((state) => state, mapDispatch)(Account);
