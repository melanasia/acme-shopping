import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../Account.css";
import { getUsers, updateUserInfo } from "../store";
import NavAccount from "./NavAccount";

class UsersInfo extends React.Component {
  constructor() {
    super();
    this.setAdmin = this.setAdmin.bind(this);
  }
  setAdmin(user) {
    if (user.userType === "admin") {
      user.userType = "user";
    } else {
      user.userType = "admin";
    }
    this.props.updateUser(user);
  }
  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    const users = this.props.session.users;
    return (
      <div id="account-page">
        <h2>Users Table</h2>
        <div className="container">
          <NavAccount />
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>E-mail</th>
                <th>Phone</th>
                <th>Admin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.userType === "admin" ? "admin" : ""}</td>
                    <td>
                      <button onClick={() => this.setAdmin(user)}>
                        {user.userType === "admin" ? "Remove" : "Set as Admin"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUserInfo(user)),
    loadUsers: () => dispatch(getUsers()),
  };
};

export default connect((state) => state, mapDispatch)(UsersInfo);
