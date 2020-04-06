import React, { Component } from "react";
import '../css/Forms.css';
import SidebarIMG from '../images/Login.svg';
import { Redirect } from "react-router-dom";

import TextField from '@material-ui/core/TextField';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

class ResetPassword extends Component {
    constructor(props) {
        super();
        this.state = {
            fields: {},
            errors: {}
        }
    }

    handleChange = (field, e) => {
      let fields = this.state.fields;
      fields[field] = e.target.value;        
      this.setState({fields});
    }

    handleValidation = () => {
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      // EMAIL
      if(!fields["email"]) {
        formIsValid = false;
        errors["email"] = "Enter a valid email."
      }

      if(typeof fields["email"] !== "undefined") {
        let lastAtPos = fields["email"].lastIndexOf('@');
        let lastDotPos = fields["email"].lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
          formIsValid = false;
          errors["email"] = "Enter a valid email.";
        }
      }

      this.setState({errors: errors});
      return formIsValid;
    }
    
    state = {
        redirect: false
    }

    setRedirect = () => {
      console.log("Setting redirect");
      this.setState({
        redirect: true
      })
    }

    renderRedirect = () => {
      if(this.state.redirect) {
        console.log("Rendering redirect");
        return <Redirect to='/password_reset_done' />
      }
    }

    handleSubmit = (event) => {
      event.preventDefault();
      if(this.handleValidation()) {
        const data = {
          email: this.state.fields["email"]
        }
        this.props.handle_resetPassword(data, (res) => {
          if(res) {
            this.setRedirect();
          }
        });
      }
      else {
        alert("Form has invalid input.");
      }
    }

    render() {
      return (
        <div>
            <div class="sidenav">
              <a className="backBtn" href="/">
                    <div className={"backBtn"}></div>
                    <ArrowBackIosIcon fontSize="large" style={{color: "white", marginLeft: "5px"}} viewBox="0 0 1 24"/> <span className="backBtn">Back</span>
                      {/* <svg class="bi bi-backspace" width="3em" height="3em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M8.603 4h7.08a1 1 0 011 1v10a1 1 0 01-1 1h-7.08a1 1 0 01-.76-.35L3 10l4.844-5.65A1 1 0 018.603 4zm7.08-1a2 2 0 012 2v10a2 2 0 01-2 2h-7.08a2 2 0 01-1.519-.698L2.241 10.65a1 1 0 010-1.302L7.084 3.7A2 2 0 018.603 3h7.08z" clip-rule="evenodd"></path>
                          <path fill-rule="evenodd" d="M7.83 7.146a.5.5 0 000 .708l5 5a.5.5 0 00.707-.708l-5-5a.5.5 0 00-.708 0z" clip-rule="evenodd"></path>
                          <path fill-rule="evenodd" d="M13.537 7.146a.5.5 0 010 .708l-5 5a.5.5 0 01-.708-.708l5-5a.5.5 0 01.707 0z" clip-rule="evenodd"></path>
                      </svg> */}
                  </a>
                <img class='img-responsive' id='lower' src={SidebarIMG}/>
            </div>

            <div class="sidenav-main">
              <br/>
                <div id="reset-message">
                    <h5>Enter your email address below.<br/>We'll send you a link to reset your password.</h5>
                </div>
                
                <div id="reset-form">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        {/* Email */}
                        <br/>
                        <TextField id="outlined-basic" helperText="Please use your DLSU email address" label="Email Address" variant="outlined" name="email" placeholder="john_delacruz@dlsu.edu.ph" value={this.state.fields["email"]} onChange={this.handleChange.bind(this, "email")}/>
                        {/* <input name="email" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}></input> */}
                        <span className="error">{this.state.errors["email"]}</span>
                        <br/>
                        <br/>
                        {this.renderRedirect()}
                        <input type="submit" class="btn btn-success" value="Send link" />
                    </form>                                    
                </div>
            </div>
        </div>        
      );
    }
  }
  export default ResetPassword;