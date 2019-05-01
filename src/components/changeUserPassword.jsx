import React, { Component } from 'react';

class ChangePassword extends Component {
    state = {  }
    render() { 
        return ( 
        <div className="change_password_container">
        Change User Password
            <div className="change_password_old_label">Old password</div>
            <input type="text" className="change_password_old"
                value={this.props.oldPassword}
                onChange={this.props.handleOldPasswordChange}
            /> 
            <div className="change_password_new_label">New Password</div>
            <input type="text" className="change_password_new"
                value={this.props.newPassword}
                onChange={this.props.handleNewPasswordChange}
            /> 
            <div className="change_password_buttons">
                <button className="btn btn-info change_password_change_button" onClick={() => this.props.changePassword()}>Change!</button>
                <button className="btn btn-danger change_password_cancel_button" onClick={this.props.cancelChangeUserDataForm}>Cancel</button>
            </div>
        </div>
        );
    }
}
 
export default ChangePassword;