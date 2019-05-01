import React, { Component } from 'react';
import scriptLogo from './images/script_logo.png'; // Tell Webpack this JS file uses this image

class BlogHeader extends Component {
    state = {  }
    render() { 
        
        return (  
            <div className="blog_header_container">
                <img className="blog_header_logo" src={scriptLogo} alt="blog logo"/>
                <div className="blog_header_moto">scriptify yourslef :)</div>

                {this.props.showHeaderUserTools ?(
                <div className="blog_header_user_tools">
                    <div className="blog_header_change_name" onClick={() => this.props.showUserNameChange()}>Change Name</div>
                    <div className="blog_header_change_password" onClick={() => this.props.showUserPasswordChange()}>Change Password</div>
                </div>): null}

                {this.props.showHeaderWidget ? (
                    <div className="blog_header_login_widget">
                        <div className="blog_header_login_widget_text">
                            You are not logged?
                        </div>
                        <div className="blog_header_login_widget_buttons">
                            <button className="btn blog_header_login_button" onClick={() => this.props.showLoginScreen()}>Log In</button>
                            <button className="btn blog_header_signin_button" onClick={() => this.props.showSigninScreen()}>Sign In</button>
                        </div>
                    </div>) : null
                }
                {this.props.showWelcomeMessage ? (
                    <div className="blog_header_login_widget">
                        <div className="blog_header_login_widget_text">
                            Welcome,
                        </div>
                        <div className="blog_header_login_widget_buttons">
                            <div className="blog_header_widget_username">{this.props.loggedFirstName + " " + this.props.loggedLastName}</div>
                        </div>
                    </div>) : null
                }

            </div>
        );
    }
}
 
export default BlogHeader;