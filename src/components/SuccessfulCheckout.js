import React from "react";
import { connect } from "react-redux";
import "../SuccessfulCheckout.css";

const SuccessfulCheckout = ({ history }) => {
  return (
    <div id="successfulCheckout">
      <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/31fe3938221437.5968c5a847d93.gif" />
      <h2>
        Click{" "}
        <span
          onClick={() => {
            history.push("/");
          }}
        >
          here
        </span>{" "}
        to return to the home page
      </h2>
    </div>
  );
};

export default connect((state) => state)(SuccessfulCheckout);
