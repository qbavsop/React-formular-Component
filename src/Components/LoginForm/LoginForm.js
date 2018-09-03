import React, { Component } from 'react';
import './LoginForm.css';
import AlertInfo from '../AlertInfo/AlertInfo'

// Boss Credentials ;)
const bossEmail = 'test@test.pl';
const bossPassword = 'Password1';

class LoginForm extends Component {

  emailRef = React.createRef();
  passRef = React.createRef();

  state= {
    isEmailValid: false,
    isPasswordValid: false,
    passed: false,
    emailValue:'',
    passwordValue:'',
    alertInfo:''
  }

  /*
   * Validate e-mail with its pattern
   */

  validateEmail = (term) => {
    const emailSelector = term.currentTarget;
    const emailValue = this.emailRef.current.value;  
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
    if (emailValue.match(emailPattern) !== null) {
      this.setState({emailValue: emailValue, isEmailValid: true});
      emailSelector.classList.add("validated");
    } else {
      this.setState({emailValue: emailValue, isEmailValid: false});
      emailSelector.classList.remove("validated");
    }
  }

/* 
 * Password rules / Check for mandatory characters and mark them as used
 */

  validatePassword = (term) => {
    const passwordSelector = term.currentTarget;
    const passwordValue = this.passRef.current.value;
    const passwordPattern = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w!@#$%^&*]{6,}$/;

    const rulesLowcase = document.querySelector('.rules--lowcase');
    const rulesUpcase = document.querySelector('.rules--upcase');
    const rulesNumbers = document.querySelector('.rules--numbers');
    const rulesChars = document.querySelector('.rules--chars');

    if (passwordValue.match(/[a-z]{1,}/) !== null) {
      rulesLowcase.classList.add("matched")
    } else {
      rulesLowcase.classList.remove("matched")
    }
    if (passwordValue.match(/[A-Z]{1,}/) !== null) {
      rulesUpcase.classList.add("matched")
    } else {
      rulesUpcase.classList.remove("matched")
    }
    if (passwordValue.match(/[0-9]{1,}/) !== null) {
      rulesNumbers.classList.add("matched")
    } else {
      rulesNumbers.classList.remove("matched")
    }
    if (passwordValue.length >= 6) {
      rulesChars.classList.add("matched")
    } else {
      rulesChars.classList.remove("matched")
    }

    /*
     * Validate password with its pattern
     */

    if (passwordValue.match(passwordPattern) !== null) {
      this.setState({passwordValue: passwordValue, isPasswordValid: true});
      passwordSelector.classList.add("validated");
    } else {
      this.setState({passwordValue: passwordValue, isPasswordValid: false});
      passwordSelector.classList.remove("validated");   
    }
  }


  validateForm = (e) => {
    const formContainer = e.currentTarget;
    e.preventDefault();
    if ( 
      this.state.isPasswordValid && 
      this.state.isEmailValid && 
      (this.state.passwordValue === bossPassword) && 
      (this.state.emailValue === bossEmail)
    ) {
        formContainer.classList.add("hidden");
        this.setState({alertInfo: 'login successful', passed: true});
    } else if (
      this.state.isPasswordValid && 
      this.state.isEmailValid && 
      ((this.state.passwordValue !== bossPassword) || 
      (this.state.emailValue !== bossEmail))
    ) {
      this.setState({alertInfo: 'invalid email or password'});
    } else if (!this.state.isEmailValid && !this.state.isPasswordValid ) {
      this.setState({alertInfo: 'invalid email and password'});
    } else if (!this.state.isEmailValid) {
      this.setState({alertInfo: 'invalid email'});
    } else if (!this.state.isPasswordValid) {
      this.setState({alertInfo: 'invalid password'});
    } 
  }

  render() {
    const isDisabled = this.state.isPasswordValid && this.state.isEmailValid;
    
    return (
      <div className="loginForm">
        <form id="form" method="POST" action=""
          onSubmit={this.validateForm}>
          <fieldset>
            <label htmlFor="email">email</label>
            <input type="text" name="email" id="email" ref={this.emailRef}
              onChange={this.validateEmail} 
              onBlur={this.validateEmail} />
            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" ref={this.passRef}
              onChange={this.validatePassword} />
            <div className="rules">
              <div className="rules--lowcase">a-z</div>
              <div className="rules--upcase">A-Z</div>
              <div className="rules--numbers">0-9</div>
              <div className="rules--chars">6 chars</div>
            </div>
            <label htmlFor="remember">Remember me</label>
            <input type="checkbox" name="remember" id="remember" />
            <input type="submit" value="login" disabled={!isDisabled} id="submit" />
          </fieldset>
        </form>
        <AlertInfo alertInfo={this.state.alertInfo} passed={this.state.passed}/>
      </div>
    );
  }

}

export default LoginForm;