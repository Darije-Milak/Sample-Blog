import React, { Component } from 'react';
import scriptLogo from './images/script_logo.png'; // Tell Webpack this JS file uses this image

class BlogSignin extends Component {
    state = {  }
    render() { 

        //const {showArticlesNotLogged} = this.props;

        return (
        <div className="blog_signin">
            <img className="login_logo" src={scriptLogo} alt="script logo"/>
            <div className="blog_signin_firstname_label">Your First name</div>
            <input ref="signInFirstName" className="blog_signin_firstname" type="text" />
            <div className="blog_signin_lastname_label">Your Last name</div>
            <input ref="signInLastName" className="blog_signin_lastname" type="text" />
            <div className="blog_signin_email_label">e-mail</div>
            <input ref="signInEmail" className="blog_signin_email" type="text" />
            <div className="blog_signin_password_label">Enter password</div>
            <input ref="signInPassword" className="blog_signin_password" type="text" />
            <button className="btn btn-info mt-4 m-2 p-2 blog_signin_sign_button" onClick={() => this.props.addNewUser(this.refs.signInFirstName.value, this.refs.signInLastName.value, this.refs.signInEmail.value, this.refs.signInPassword.value)}>Sign In</button>
            <button className="btn mt-4 m-2 p-1 blog_sign_cancel_button" onClick={() => this.props.showArticlesNotLogged()}>Cancel</button>
            <div className="blog_signin_already_user">
                    Already a User? <button className="btn p-1"  onClick={() => this.props.showLoginScreen()}>Log In</button>
            </div>
        </div>
        );
    }
}
 
export default BlogSignin;