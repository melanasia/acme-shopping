import React from "react";
import { connect } from "react-redux";
import "../AccountModal.css";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { closeAccountModal } from "../store";

class AccountModal extends React.Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false,
    };
    this.flipModal = this.flipModal.bind(this);
  }

  flipModal() {
    this.setState({ isFlipped: !this.state.isFlipped });
  }

  render() {
    const { closeAccountModal } = this.props;
    const { isFlipped } = this.state;
    const { flipModal } = this;
    return (
      <div id="accountModal">
        <div className="modalBackground" onClick={() => closeAccountModal()} />
        <div className="modal">
          <div className={isFlipped ? "isFlipped sides" : "sides"}>
            <SignInForm flipModal={flipModal} />
            <SignUpForm flipModal={flipModal} />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    closeAccountModal: () => {
      dispatch(closeAccountModal());
    },
  };
};

export default connect((state) => state, mapDispatch)(AccountModal);
