import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from "classnames";
import { createAttendenceDetails, getAttendenceDetails } from '../../actions/Attendenceaction';
import axios from 'axios';
import ReactLoading from 'react-loading';

class Attendence extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            room:'',
            errors: {},
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onAvailabilityChange = this.onAvailabilityChange.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    async onDelete(_id) {
        await axios.delete(`/api/attendence/${_id}`).then(res => console.log(res)).catch(err => console.log(err));
        await this.props.getAttendenceDetails();
    }
    async onAvailabilityChange(_id, isAvailable) {
        await axios.put(`/api/attendence/availability/${_id}`, { isAvailable: !isAvailable }).then(res => console.log(res)).catch(err => console.log(err));
        await this.props.getAttendenceDetails();
    }
    async onSubmit(e) {
        e.preventDefault();
        const AttendenceRecord = {
            room: this.state.room,
            name: this.state.name,
        }
        console.table(AttendenceRecord);
        await this.props.createAttendenceDetails(AttendenceRecord);
        this.setState({
            room: '',
            name: '',
            errors: {}
        });
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }
    async componentDidMount() {
        await this.props.getAttendenceDetails();
    }
    render() {
        const { AttendenceData, loading } = this.props.AttendenceData;
        let tableContent;
        (!AttendenceData.length || loading) ? (
            tableContent = null
        ) : tableContent = AttendenceData.length ? AttendenceData.map(
            el =>
                <tr key={el._id} >
                    <th scope="row">{AttendenceData.indexOf(el) + 1}</th>
                    <td>{el.name ? el.name : "-"}</td>
                    <td>{el.room ? el.room: "-"}</td>
                    <td>{el.isAvailable ? <button type="button" className="btn btn-primary" data-toggle="tooltip" data-placement="right" title="Click to set Unavailable"
                        onClick={() => this.onAvailabilityChange(el._id, el.isAvailable)}
                    >
                       Mark
                    </button>
                        : <button type="button" className="btn btn-danger" data-toggle="tooltip" data-placement="right" title="Click to set Available"
                            onClick={() => this.onAvailabilityChange(el._id, el.isAvailable)}
                        >
                           Unmark
                    </button>}</td>
                    <td style={{ cursor: 'pointer', color: '#00a4eb' }}
                        onClick=
                        {() => this.onDelete(el._id)}
                    >
                        Click Me
                    </td>
                </tr>
        ) : null
        const { errors } = this.state;
        return (
            <div className="mid container">
                <h1>{this.state.block}</h1>
                <br />
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="Name"
                                className={classnames("form-control", {
                                    "is-invalid": errors.name
                                })}
                                onChange={this.onChange}
                                name="name"
                                value={this.state.name}
                            />
                            {errors.name && (
                                <div className="invalid-tooltip">{errors.name}</div>
                            )}
                        </div>
                        <div className="col">
                            <label htmlFor="room">Room Number</label>
                            <input type="number" id="room" placeholder="Room Number"
                                className={classnames("form-control", {
                                    "is-invalid": errors.room
                                })}
                                onChange={this.onChange}
                                name="room"
                                value={this.state.room}
                            />
                            {errors.room && (
                                <div className="invalid-tooltip">{errors.room}</div>
                            )}
                        </div>
                        <div className="col-auto" >
                            <button type="submit" style={{ verticalAlign: '-39px' }} className="btn btn-primary">Add</button>
                        </div>
                    </div>
                </form>

                <div style={{ marginTop: '50px', overflow: 'scroll', maxHeight: 800 }}>
                    {!loading ? <table className="table table-striped table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Room Number</th>
                                <th scope="col">Mark/Unmark</th>
                                <th scope="col">Delete?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableContent}
                        </tbody>
                    </table> : <div style={{ display: 'flex', justifyContent: 'center' }}><ReactLoading type="bars" color="#f56f42" /></div>}
                </div>
            </div>
        );
    }
}

Attendence.propTypes = {
    createAttendenceDetails: PropTypes.func.isRequired,
    getAttendenceDetails: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    errors: state.errors,
    AttendenceData: state.AttendenceData,
});
export default connect(mapStateToProps, { createAttendenceDetails, getAttendenceDetails })(Attendence);