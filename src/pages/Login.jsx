import React, { Component } from "react";
import '../css/Forms.css';
import SidebarIMG from '../images/Login.svg';
import { Redirect } from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  backBtn:{
    color: "white", 
    marginLeft: "5px",
  '&:hover': {
      color: "#d3d3d3"
    },
  },
});

class Login extends Component {
    constructor(props){
        super();

        this.state = {
            fields: {},
            errors: {},
            snackBar: false,
            loading: false,
            success: false,
     
        }

    }

    handleChange(field, e){    		
      let fields = this.state.fields;
      fields[field] = e.target.value;        
      this.setState({fields});
    }

    handleValidation = () => {
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      // EMAIL
      if(!fields["email"]){
        formIsValid = false;
        errors["email"] = "Required Email"
      }

      if(typeof fields["email"] !== "undefined"){
        let lastAtPos = fields["email"].lastIndexOf('@');
        let lastDotPos = fields["email"].lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
          formIsValid = false;
          errors["email"] = "Invalid Email";
        }
      }

      // PASSWORD
      if(!fields["pass"]){
        formIsValid = false;
        errors["pass"] = "Required Password"
      }

      this.setState({errors: errors});
      return formIsValid;
    }


    // test = () =>{
    //     console.log(this.state.token)
    //     axios.get('/api/auth/user/',
    //     {
    //         headers: {
    //             'X-CSRF-TOKEN': this.state.token,
    //         }
    //     })
    //     .then(res => {
    //         console.log(res);
    //         console.log(res.data);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
    // }
    
    state = {
        redirect: false
      }

      setRedirect = () => {
        this.setState({
          redirect: true
        })
        this.setState({loading:false});
        this.setState({success:true});
        
      }

      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
      }

      handleSubmit = (event) => {
        event.preventDefault();
        if(!this.state.loading){
          this.setState({loading: true});
          this.setState({success: false});
        }else{
          this.setState({success: true});
            this.setState({loading: false});
        } 
            

        
        if(this.handleValidation()){
          const data = {
              email: this.state.fields["email"],
              password: this.state.fields["pass"]
          }
          this.props.handle_login(data, (res) => {
            if(res){
              this.setRedirect();
            }else{
              this.setState({snackBar: true})
              this.setState({loading: false})
            }
          });
        }
        else{
          // alert("Form has invalid input.");
          this.setState({snackBar: true});
          this.setState({loading:false});
          
        }
      }
    
    handleCloseSnackBar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      this.setState({snackBar: false});
    }

    render() {
      const { classes } = this.props;
      return (
        <div>
            <div class="sidenav">
                <a className="backBtn" href="/">
                  <div className={"backBtn"}></div>
                  <ArrowBackIosIcon fontSize="large"className={classes.backBtn} viewBox="0 0 1 24"/> <span className="backBtn">Back</span>
                    {/* <svg class="bi bi-backspace" width="3em" height="3em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8.603 4h7.08a1 1 0 011 1v10a1 1 0 01-1 1h-7.08a1 1 0 01-.76-.35L3 10l4.844-5.65A1 1 0 018.603 4zm7.08-1a2 2 0 012 2v10a2 2 0 01-2 2h-7.08a2 2 0 01-1.519-.698L2.241 10.65a1 1 0 010-1.302L7.084 3.7A2 2 0 018.603 3h7.08z" clip-rule="evenodd"></path>
                        <path fill-rule="evenodd" d="M7.83 7.146a.5.5 0 000 .708l5 5a.5.5 0 00.707-.708l-5-5a.5.5 0 00-.708 0z" clip-rule="evenodd"></path>
                        <path fill-rule="evenodd" d="M13.537 7.146a.5.5 0 010 .708l-5 5a.5.5 0 01-.708-.708l5-5a.5.5 0 01.707 0z" clip-rule="evenodd"></path>
                    </svg> */}
                </a>
                <img class='img-responsive' id='lower' src={SidebarIMG}/>
            </div>

            <div class="sidenav-main">
                <div id="signup-message">
                    <h5>Not a member? <a href="/register">Sign up!</a></h5>
                </div>
                
                <div id="signup-form">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        {/* Email */}
                        <br/>
                        <TextField id="outlined-basic" helperText="Please use your DLSU email address" label="Email Address" variant="outlined" name="email" placeholder="john_delacruz@dlsu.edu.ph" value={this.state.fields["email"]} onChange={this.handleChange.bind(this, "email")}/>
                        {/* <input name="email" placeholder="john_delacruz@dlsu.edu.ph" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}></input> */}
                        <span className="error">{this.state.errors["email"]}</span>

                        <br/>
                        <br/>

                        {/* Password */}
                        <br/>
                        <TextField type="password" helperText="Must be a minimum of 8 characters" id="outlined-basic" label="Password" variant="outlined" name="pass" placeholder="●●●●●●●●" value={this.state.fields["pass"]} onChange={this.handleChange.bind(this, "pass")}/>
                        {/* <input type="password" name="pass" placeholder="●●●●●●●●" onChange={this.handleChange.bind(this, "pass")} value={this.state.fields["pass"]}></input> */}
                        <span className="error">{this.state.errors["pass"]}</span>

                        <br/>
                        <br/>

                        {this.renderRedirect()}
                        <input type="submit" style={{height: 0, width: 0, padding: 0, border: 0}} />
                        <div className={classes.root}>
                          <div className={classes.wrapper}> 
                            <Button
                              variant="contained"
                              color="primary"
                              className={"buttonClassname"}
                              disabled={this.state.loading}
                              onClick={this.handleSubmit}
                              style={{backgroundColor: "green"}}
                            >
                              Login
                            </Button>
                            {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                          </div>
                        </div>

                        
                    </form>
                    <Snackbar open={this.state.snackBar} autoHideDuration={4000} onClose={this.handleCloseSnackBar}>
                      <Alert onClose={this.handleCloseSnackBar} severity="error">
                      Failed to login
                      </Alert>
                    </Snackbar>
                    <br/>
                    
                    <p><a href="/password_reset">Forgot your password?</a></p>
                </div>
            </div>
        </div>        
      );
    }
  }

Login.propTypes={
  classes: PropTypes.object.isRequired,
};
  export default withStyles(styles)(Login);