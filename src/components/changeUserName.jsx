import React, { Component } from 'react';

class ChangeUser extends Component {
    state = {  }
    render() { 
        return (  
        <div className="change_user_container">
            Change User data
            <div className="change_user_email_label">New E-mail</div>
            <input className="change_user_email" type="text"
                value={this.props.currentUserEmail}
                onChange = {this.props.handleCurrentUserEmailChange} 
                />
            <div className="change_user_first_name_label">New First Name</div>
            <input className="change_user_first_name" type="text"
                value={this.props.currentUserFirstName}
                onChange={this.props.handleCurrentUserFirstNameChange}
            />
            <div className="change_user_last_name_label">New Last Name</div>
            <input className="change_user_last_name" type="text"
            value={this.props.currentUserLastName}
            onChange={this.props.handleCurrentUserLastNameChange}
            /> 
            <div className="change_user_buttons">
                <button className="btn btn-info change_user_change_button" onClick={this.props.changeBasicUserData}>Change!</button>
                <button className="btn btn-danger change_user_cancel_button" onClick={this.props.cancelChangeUserDataForm}>Cancel</button>
            </div>
        </div>
        );
    }
}
 
export default ChangeUser;