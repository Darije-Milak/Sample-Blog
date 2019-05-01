import React, { Component } from 'react';
import scriptLogo from './images/script_logo.png'; // Tell Webpack this JS file uses this image

class BlogLogin extends Component {
    state = {  }

    getInpuValue = () => {
        console.log(this.refs.emailInputFiled.value);
        this.setSate({LoggingUserEmail: this.refs.emailInputFiled.value});
    }

    render() {

        //const {showArticlesNotLogged} = this.props;

        return ( 
            <div className="blog_login">
                <img className="login_logo" src={scriptLogo} alt="script logo"/>
                
                    <div className="blog_login_email_label">Your e-mail</div>
                    <input ref="emailInputFiled" className="blog_login_email" type="text" />
                    <input type="hidden" className="grant-type" name="grant-type" value="Bearer" />
                    <input type="hidden" className="id" name="id" value="Bearer" />
                    <div className="blog_login_password_label">Your password</div>
                    <input ref="passwordInputFiled" className="blog_login_password" type="text" />
                    <button className="btn btn-warning mt-4 m-2 p-2 blog_login_log_button" onClick={() => this.props.logUser(this.refs.emailInputFiled.value, this.refs.passwordInputFiled.value)}>Log In</button>
                    <button className="btn mt-4 m-2 p-1 blog_login_cancel_button" onClick = {() => this.props.showArticlesNotLogged()}>Cancel</button>
                
                <div className="blog_login_new_user">
                    New User ? <button className="btn p-1" onClick={() => this.props.showSigninScreen()}>Sign In</button>
                </div>
            </div> 
        );
    }
}
 
export default BlogLogin;