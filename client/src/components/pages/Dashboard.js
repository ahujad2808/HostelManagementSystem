import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUser } from "../../actions/authActions";


// const clean = require("../../img/cleaning.jpg");
const student = require("../../img/student.jpg");
const staff = require("../../img/staff.jpeg");
const bedRoom = require("../../img/bedroom.jpeg");
const pay= require("../../img/pay.jpg");
const att = require("../../img/att.jpg");
class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div className="mid container">
        <div className="text-center" style={{ fontSize: "25px" }}>
          Welcome {user.name}!
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>

          <div className="card hoverable" style={{ width: "18rem", hover: '', height: '22rem' }}>
            <img src={student} className="card-img-top" alt="Cleaning" />
            <div className="card-body" style={{ height: '10rem' }}>
              <h5 className="card-title">Student</h5>
              <a href="/student" className="card-text">
                Add new Student and allot Room or Check Info
              </a>
            </div>
          </div>

          <div className="card" style={{ width: "18rem", hover: '', height: '22rem' }}>
            <img src={bedRoom} className="card-img-top" alt="Cleaning" />
            <div className="card-body">
              <h5 className="card-title">Room Repair/Cleaning Status</h5>
              <a href="/block">
                Add Room Repair/Cleaning or Check Info
                </a>
            </div>
          </div>

          <div className="card" style={{ width: "18rem", hover: '', height: '22rem' }}>
            <img src={staff} className="card-img-top" alt="Cleaning" />
            <div className="card-body">
              <h5 className="card-title">Staff Info</h5>
              <a href="/staff">
                Add more Staff or Check their info
              </a>
            </div>
          </div>

          <div className="card" style={{ width: "18rem", hover: '', height: '22rem' }}>
            <img src={att} className="card-img-top" alt="Attendence" />
            <div className="card-body">
              <h5 className="card-title">Attendence</h5>
              <a href="/Attendence">
                Add the Attendence 
              </a>
            </div>
          </div>


          <div className="card" style={{ width: "18rem", hover: '', height: '22rem' }}>
            <img style={{height:"200px"}} src={pay} className="card-img-top" alt="Cleaning" />
            <div className="card-body">
              <h5 className="card-title">Payment</h5>
              <a href="http://127.0.0.1:5500/HostelManagementSystem/client/src/components/pages/index.html">
               Pay Your Hostel and Mess Fees
              </a>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  // getCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
  ,
  { getCurrentUser }
)(Dashboard);
