import React, { Component } from "react";
import '../css/Forms.css';
import SidebarIMG from '../images/Login.svg';
import { Redirect } from "react-router-dom";

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';


import { Container, Row, Col, Jumbotron, Card, CardBody } from "reactstrap";

const styles = theme => ({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonLogin: {
          fontSize: "100%",
          width: "110%",
          alignItems: 'center',
          justifyContent: 'center',
          textTransform: "none",
          borderRadius: "30px",
          padding: "10px",
          paddingLeft: "30px",
          paddingRight: "30px",
          backgroundColor: "green",
          border: "none",
          color: "white",
          boxShadow: "6px 5px #e8f4ea",
          borderStyle: "solid",
          borderColor: "green",
          '&:hover': {
              color: "green",
              backgroundColor: "#FFFFFF",
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
  
  var sectionStyle = {
    // width: "100%",
    minHeight: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflow: "hidden",
    backgroundImage: "linear-gradient(#086e53, #579d8b)"
  
  };

class EmailVerificationComplete extends Component {
    constructor(props) {
        super();
    }

    render() {
      const { classes } = this.props;
      return (
            <div style={sectionStyle}>
                <div className={"backBtn"}>
                <a className="backBtn" href="/">
                <ArrowBackIosIcon fontSize="large"className={classes.backBtn} viewBox="0 0 1 24"/> <span className="backBtn">Back</span>
                    </a>
                </div>
            

                <div style={{textAlign: 'center'}}>
                    <Row>
                        <Col />
                        <Col lg="8">
                        <h1 style={{color: "white"}}>
                            <img
                            alt=""
                            src="/logo.svg"
                            width="40"
                            height="40"
                            className="d-inline-block align-top"/> 
                        AnimoSched</h1>
                        <Jumbotron style={{padding: 32, backgroundColor: "white", marginLeft: "15%", marginRight: "15%", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                            <h3>
                            Your email has been verified!
                            </h3>

                            <a href="/login">
                            <Row horizontal = 'center' style={{justifyContent: "center"}}>
                                <div className={classes.root}>
                                <div className={classes.wrapper}> 
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.buttonLogin}
                

                                    style={{}}
                                    >
                                    Login here
                                    </Button>
                                  
                                </div>
                                </div>
                            </Row>
                            </a>


                        </Jumbotron>
                        </Col>
                        <Col />
                    </Row>
                </div>
        </div>    
      )
    
            // <div>
            //     <Redirect to="/login"></Redirect>
            //     <div class="sidenav">
            //         <a className="backBtn" href="/">
            //             <div className={"backBtn"}></div>
            //             <ArrowBackIosIcon fontSize="large" style={{color: "white", marginLeft: "5px"}} viewBox="0 0 1 24"/> <span className="backBtn">Back</span>
            //         </a>
            //         <img class='img-responsive' id='lower' src={SidebarIMG}/>
            //     </div>

            //     <div class="sidenav-main">
            //         <br/>
            //         <div id="reset-message">
            //             <h5>Your email has been verified!</h5><br />
            //             <h3><a href="/login">Log in?</a></h3>
            //         </div>              
            //     </div>
            // </div>        
    }
  }

  EmailVerificationComplete.propTypes={
    classes: PropTypes.object.isRequired,
  };
    export default withStyles(styles)(EmailVerificationComplete);