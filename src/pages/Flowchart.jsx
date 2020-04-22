import React, { Component } from "react";
import '../css/Flowchart.css';
import SidebarIMG from '../images/Login.svg';
import Menu from '../components/Menu.jsx';

import { Flowpoint, Flowspace } from 'flowpoints';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import ReactLoading from 'react-loading';

import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import html2canvas from 'html2canvas';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = theme => ({
  flowchartText:{
      overflow: 'hidden',
      textOverflow: "ellipsis",
      textAlign: "center",
      fontSize: "0.7rem",
      // color: "green", 
      '&:hover': {
          color: "green"
        },
  },
    buttonStyle:{
        fontSize: "95%",
      textTransform: "none",
      width: "80%",
      borderRadius: "25px",
//      padding: "10px",
      paddingLeft: "5%",
      paddingRight: "3%",
      backgroundColor: "#16775D",
      border: "none",
      color: "white",
      boxShadow: "6px 5px #e8f4ea",
      borderStyle: "solid",
      borderColor: "#16775D",
//      marginTop: "20px",
      justifyContent: 'center',
      '&:hover': {
          backgroundColor: "white",
          color: "#16775D"
        },
    },
     buttonStyleOption:{
      textTransform: "none",
      width: "55%",
      borderRadius: "25px",
//      padding: "10px",
      paddingLeft: "5%",
      paddingRight: "3%",
      backgroundColor: "white",
        border: "solid 2px #16775D",
      color: "#16775D",
      boxShadow: "6px 5px #e8f4ea",
      borderStyle: "solid",
      borderColor: "#16775D",
//      marginTop: "20px",
      justifyContent: 'center',
      '&:hover': {
          
          backgroundColor: "#16775D",
          border: "none",
          color: "white",
        },
    }
});

class Flowchart extends Component {
    constructor(props){
      super(props);
      this.state = {
        // terms: [],
        courses: [],
        flowpoints: [],
        degreekey: '1',
        batchkey: '116',
        dataReceived: false,
        snackbar: false,
      }
    }

    componentDidMount() {
      // const degreekey = '1';
      // const batchkey = '116';
      axios.get('https://archerone-backend.herokuapp.com/api/flowcharttermslist/'+this.state.degreekey+'/'+this.state.batchkey+'/')
      .then(res => {
        res.data.map((term, i) => {
                // var termsList = this.state.terms;
                var coursesList = this.state.courses;
                var flowpointsList = this.state.flowpoints;
                var newTerm = {'id':term.id, 'degree':term.degree, 'batch': term.batch, 'courses': term.courses, 'tracks': term.tracks, 'year': term.year, 'term': term.term} 
                var currentTerm = term.term + 3 * (term.year - 1);
                var tracks = newTerm.tracks.split(',');
                var tempCoursesList = [];
                // termsList.push(newTerm);
                term.courses.map((course, j) => {
                  // var outputsList = {};
                  coursesList.push(course);
                  tempCoursesList.push(course);
                  // course.prerequisite_to.map((prereq_to) => {
                  //   outputsList[prereq_to] = { output: "right", input: "left" }                    
                  // })            
                  // flowpointsList.push({'key': course.id, 'name': course.course_code, 'units': course.units, 'startPosition': { x:(currentTerm-1)*85, y:tracks[j]*45 }, 'width': 70, 'height': 40, 'dragX': false, 'dragY': false, 'outputs': outputsList, 'year': term.year, 'term': term.term});
                })
                tempCoursesList.sort(function(a, b) {
                  var keyA = new String(a.course_code),
                    keyB = new String(b.course_code);
                  if (keyA < keyB) return -1;
                  if (keyA > keyB) return 1;
                  return 0;
                });
                for(var k = 0; k < tempCoursesList.length; k++) {
                  var outputsList = {};                  
                  tempCoursesList[k].prerequisite_to.map((prereq_to) => {
                    outputsList[prereq_to] = { output: "right", input: "left", inputColor: "#16775d", outputColor: "#16775d" }                    
                  })
                  tempCoursesList[k].soft_prerequisite_to.map((prereq_to) => {
                    outputsList[prereq_to] = { output: "right", input: "left", inputColor: "#16775d", outputColor: "#16775d", dash: "3" }                    
                  })
                  tempCoursesList[k].co_requisite.map((coreq) => {
                    outputsList[coreq] = { output: "auto", input: "auto", inputColor: "#16775d", outputColor: "#16775d"}                    
                  })
                  flowpointsList.push({'key': tempCoursesList[k].id, 'name': tempCoursesList[k].course_code, 'units': tempCoursesList[k].units, 'startPosition': { x:(currentTerm-1)*85, y:tracks[k]*50 }, 'width': 70, 'height': 40, 'dragX': false, 'dragY': false, 'outputs': outputsList, 'year': term.year, 'term': term.term});
                }
                console.log(tempCoursesList)               
                // this.setState({terms: termsList})
                this.setState({courses: coursesList})
                this.setState({flowpoints: flowpointsList})                
        })
        this.setState({dataReceived: true})
      })
    }
    
    exportSched = () => {
        window.scrollTo(0, 0);
        html2canvas(document.querySelector("#flowchart-area")).then(canvas => {
    //      document.location.href = canvas.toDataURL().replace('image/png', 'image/octet-stream');
            var filename = "flowchart" + ".png";
         
            this.saveAs(canvas.toDataURL(), filename); 


        });
        
        this.setState({snackbar: true});

//        let snackBarVariables = [...this.state.snackBarVariables];
//        this.setState({snackbarMsg: "Your schedule image is downloading!"});
//        snackBarVariables[0].snackBarSuccess = true;
        // snackBarVariables[1].snackBarFailed = true;
//        this.setState({snackBarVariables});
//        console.log(snackBarVariables);
  }
  
  saveAs = (uri, filename) => {

    var link = document.createElement('a');

    if (typeof link.download === 'string') {

        link.href = uri;
        link.download = filename;

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);

    } else {

        window.open(uri);

    }
}

  handleCloseBar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({snackbar: false});
    }

    render() {
      const { classes } = this.props;
      return (
        <div>
            {this.props.menu('flowchart')}

            {this.state.dataReceived ? 
            <div>
              <div class="sidemenu" >
                  <center>
                      {/*<Button
                      variant="contained"
                      className={classes.buttonStyleOption}
                         // style={{display:"none", width: "0%", margin: "none"}}
                      >
                      CSS 116 CS
                    </Button>*/}
                      <input type="submit" class="btn btn-success change-flowchart" value="CCS 116 CS" />
                  </center>
                  {/* <center><input type="submit" class="btn btn-success change-flowchart" value="ID Number, Course" /></center> */}
                  {/* <center><input type="submit" class="btn btn-success change-flowchart" value="ID Number, Course" /></center> */}
              </div>

              <div class="sidemenu-main-flow">
                <br/>
                  <center><h2 style={{width: "80%"}}>YOUR FLOWCHART</h2></center>
                  <div class="flowchart-area" id="flowchart-area">
                    <div class="flowchart-header-parent">
                      <div class="header-year-parent">
                        <div class="header-year">Year 1</div>
                        <div class="header-term-parent">
                          <div class="header-term">Term 1</div>
                          <div class="header-term">Term 2</div>
                          <div class="header-term">Term 3</div>
                        </div>
                      </div>
                      <div class="header-year-parent">
                        <div class="header-year">Year 2</div>
                        <div class="header-term-parent">
                          <div class="header-term">Term 1</div>
                          <div class="header-term">Term 2</div>
                          <div class="header-term">Term 3</div>
                        </div>
                      </div>
                      <div class="header-year-parent">
                        <div class="header-year">Year 3</div>
                        <div class="header-term-parent">
                          <div class="header-term">Term 1</div>
                          <div class="header-term">Term 2</div>
                          <div class="header-term">Term 3</div>
                        </div>
                      </div>
                      <div class="header-year-parent">
                        <div class="header-year">Year 4</div>
                        <div class="header-term-parent">
                          <div class="header-term">Term 1</div>
                          <div class="header-term">Term 2</div>
                          <div class="header-term">Term 3</div>
                        </div>
                      </div>
                    </div>
                      <Flowspace theme="green" variant="paper" background="white" connectionSize="2" style={{ overflow: 'hidden', height:"100%", width:"100" }}>
                        {
                          Object.keys(this.state.flowpoints).map(key => {
                            const point = this.state.flowpoints[key]
                            return (
                              <Flowpoint
                                key={point.key}
                                startPosition={point.startPosition} 
                                width={point.width} 
                                height={point.height} 
                                dragX={point.dragX} 
                                dragY={point.dragY} 
                                outputs={point.outputs}>
                                <div className={classes.flowchartText}>{point.name}<br />{point.units}</div>
                              </Flowpoint>

                              // <Flowpoint
                              //   key={key}
                              //   startPosition={point.pos}
                              //   onClick={() => {
                              //     var selected_point = this.state.selected_point
                              //     if (selected_point === key) {
                              //       selected_point = null
                              //     } else {
                              //       selected_point = key
                              //     }
                              //     this.setState({selected_point})
                              //   }}
                              //   onDrag={position => {
                              //     var flowpoints = this.state.flowpoints
                              //     flowpoints[key].position = position
                              //     this.setState({flowpoints})
                              //   }}>                                
                              // </Flowpoint>
                            )
                          })
                        }
                    </Flowspace>
                  </div>
              </div>
                
                <div class="exportmenu" >
                  <center><Button
                      variant="contained"
                      className={classes.buttonStyle}
                      onClick={this.exportSched}
                      endIcon={ <GetAppIcon/>}
                      >
                      Export
                    </Button></center>
                    <Snackbar open={this.state.snackbar} autoHideDuration={4000} onClose={this.handleCloseBar}>
                    <Alert onClose={this.handleCloseBar} severity="success">
                    Your flowchart image is downloading!
                    </Alert>
                </Snackbar>
                </div>
            </div>
            : 
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh"}}>
              <ReactLoading type={'spin'} color={'#9BCFB8'} height={'5%'} width={'5%'}/>
            </div>
           }
        </div>        
      );
    }
  }

  Flowchart.propTypes={
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(styles)(Flowchart);