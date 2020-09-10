import React, { Component } from "react";
import '../css/Preferences.css';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";
// import { IconButton, InputAdornment } from "@material-ui/core";
// import DateFnsUtils from '@date-io/date-fns';

import { green, red } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';

import MenuItem from '@material-ui/core/MenuItem';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import HomeIcon from '@material-ui/icons/Home';

import PropTypes from 'prop-types';

import ReactLoading from 'react-loading';

import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import { Row, Col } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Slider from '@material-ui/core/Slider';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import _ from 'underscore';
import { Redirect } from "react-router";

const GreenRadio = withStyles({
    root: {
      '&$checked': {
        color: green[600],
      },
      // '&label': {
      //   color: green[600],
      // }
    },
    checked: {},
    // label: {},
  })((props) => <Radio color="default" {...props} />)

  const PrettoSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8,
    },
    thumb: {
      height: 12,
      width: 12,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

const styles = theme => ({
    homeButton:{
        color: "green", 
        marginLeft: "10px",
        '&:hover': {
            color: "#79c879"
          },
    },

    iconStyle:{ 
        margin: "10px", 
          '&:hover': {
            color: green[500],
        },
    },
    buttonStyle:{
        marginBottom: "50px",
        textTransform: "none",
        width: "160px",
        borderRadius: "25px",
        padding: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
        backgroundColor: "#16775D",
        border: "none",
        color: "white",
        boxShadow: "6px 5px #e8f4ea",
        borderStyle: "solid",
        borderColor: "#16775D",
        marginTop: "20px",
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: "white",
            color: "#16775D"
        },
    
        formControl: {
        margin: theme.spacing(1),
        minWidth: 500,
        },
        selectEmpty: {
        marginTop: theme.spacing(2),
        },
    }
});

const GreenCheckbox = withStyles({
    root: {
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



class Survey extends Component {
    constructor(props){
        super(props)
        this.state = {

            selectedValue: 0,
            dataReceived: true,
            currentWords: [],
            words: ['Accessible', 'Effortless', 'Ordinary', 'Advanced', 'Empowering', 'Organised', 'Ambiguous', 'Energetic', 'Overwhelming', 'Annoying', 'Engaging', 'Patronising', 'Appealing', 'Entertaining', 'Poor quality', 'Approachable', 'Exciting', 'Powerful', 'Attractive', 'Expected', 'Predictable', 'Awkward', 'Familiar', 'Professional', 'Boring', 'Fast', 'Relevant', 'Bright', 'Faulty', 'Reliable', 'Business-like', 'Flexible', 'Responsive', 'Busy', 'Fresh', 'Rigid', 'Clean', 'Friendly', 'Satisfying', 'Clear', 'Frustrating', 'Secure', 'Cluttered', 'Fun', 'Simple', 'Compelling', 'Hard to Use', 'Simplistic', 'Complex', 'High quality', 'Slow', 'Comprehensive', 'Illogical', 'Sophisticated', 'Confusing', 'Impressive', 'Stable', 'Consistent', 'Inadequate', 'Stimulating', 'Contradictory', 'Incomprehensible', 'Straightforward', 'Controllable', 'Inconsistent', 'Stressful', 'Convenient', 'Ineffective', 'System-oriented', 'Counter-intuitive', 'Innovative', 'Time-consuming', 'Creative', 'Insecure', 'Time-saving', 'Credible', 'Intimidating', 'Too technical', 'Cutting edge', 'Intuitive', 'Trustworthy', 'Dated', 'Irrelevant', 'Unattractive', 'Desirable', 'Meaningful', 'Unconventional', 'Difficult', 'Misleading', 'Understandable', 'Distracting', 'Motivating', 'Unpredictable', 'Dull', 'New', 'Unrefined', 'Easy to use', 'Non-standard', 'Usable', 'Effective', 'Obscure', 'Useful', 'Efficient', 'Old', 'Vague'],
            wordList : [],
            susResult: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,] /*[{question: "I think I would like to use this system frequently", value: "4"}]*/,
            ueqResult: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,] /*[{question: "annoying/enjoyable", value:"3"}]*/,
            nasaResult: [0, 0, 0, 0, 0, 0,] /*[{question: "demand", value:"3"}]*/,
            smeqResult: 0,
            panasResult: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,] /*[{question: "interested", value: "2"}]*/,
            stressResult: [0,0,0,0,0] /*[{question: "I find creating schedules for myself to be stressful", value: "1"}]*/,
            wordResult: []/*[{word: "Accessible", value: "5"}, {word: "Appealing", value: "1"}]*/,
            cognitiveResult: [0,0,0,0,0,0,0,0,0,0,0,0,0,],
            decisionResult: [0,0,0,0,0,0,],
            groupResult: [0,0,0,0,0,0,0,0,0,],
            comments: "",
            stressComments: "",
            cognitiveComments: "",
            decisionComments: "",
            groupComments: "",
            name: "",
            groupno: "",
            method: "",
            snackBarText: "",
            snackBar: false,
            redirect: false
        }
    }

    componentDidMount(){
        var id = 1;
        const wordList = []
        this.state.words.sort().map(word => {
            wordList.push(
                {
                    id: id,
                    word: word,
                    checked: false
                }
            )
            id += 1
        })
        this.setState({wordList})
    }

    checkEmptyFields = () => {
        if(this.state.smeqResult == 0 || this.state.name.trim() == "" || this.state.groupno.trim() == "" || this.state.method.trim() == ""){
            return false
        }
        if(this.state.susResult.includes(0)){
            return false
        }
        if(this.state.ueqResult.includes(0)){
            return false
        }
        if(this.state.nasaResult.includes(0)){
            return false
        }
        if(this.state.panasResult.includes(0)){
            return false
        }
        if(this.state.stressResult.includes(0)){
            return false
        }
        if(this.state.cognitiveResult.includes(0)){
            return false
        }
        if(this.state.decisionResult.includes(0)){
            return false
        }
        if(this.state.groupResult.includes(0)){
            return false
        }
        return true

    }

    handleChange = (e) => {
        this.setState({selectedValue: e.target.value})
    }

//     handleWordChange = (event) => {
//       var newWordList = this.state.wordList;
//       var newCurrentWords = [];
//       newWordList[event.target.id - 1].checked = event.target.checked;
//       if(event.target.checked){
//         newCurrentWords = this.state.currentWords;
//         newCurrentWords.push(newWordList[event.target.id - 1]);
//       }else{
//         this.state.currentWords.map(word => {
//             if(event.target.id != word.id){
//                 newCurrentWords.push(word)
//             }
//         })
//       }
//       this.setState({wordList: newWordList, currentWords: newCurrentWords});
//    };
        susScale = (statement, id) => {
            return (
            <div className="scale">
                <span className={"survey-statements"}>{statement}</span>
                <RadioGroup row aria-label="position" name={"sus"+id}  onChange={(event)=>this.handleRadioChange(event, "sus", id)}>
                    <span >Strongly Disagree</span>
                    <FormControlLabel
                    value="1"
                    control={<GreenRadio/>}
                    label="1"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="2"
                    control={<GreenRadio/>}
                    label="2"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="3"
                    control={<GreenRadio/>}
                    label="3"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="4"
                    control={<GreenRadio/>}
                    label="4"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="5"
                    control={<GreenRadio/>}
                    label="5"
                    labelPlacement="top"
                    />
                <span>Strongly Agree</span>
                </RadioGroup>
            </div>
            )
        }

        stressScale = (statement, id) => {
            return (
            <div className="scale">
                <span className={"survey-statements"}>{statement}</span>
                <RadioGroup row aria-label="position" name="position" onChange={(event)=>this.handleRadioChange(event, "stress", id)}>
                    <span >Strongly Disagree</span>
                    <FormControlLabel
                    value="1"
                    control={<GreenRadio/>}
                    label="1"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="2"
                    control={<GreenRadio/>}
                    label="2"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="3"
                    control={<GreenRadio/>}
                    label="3"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="4"
                    control={<GreenRadio/>}
                    label="4"
                    labelPlacement="top"
                    />
                <span>Strongly Agree</span>
                </RadioGroup>
            </div>
            )
        }

        ueqScale = (left, right, type, id) => {
            if(type){
                return (
                // <Row horizontal = 'center' style={{justifyContent: "center"}}>
                <div className="scale" style={{placeItems: "center", justify: "center"}}>
                    <RadioGroup row aria-label="position" name={"ueq"+id}  onChange={(event)=>this.handleRadioChange(event, "ueq", id)}>
                        <Grid container spacing={1}>
                                            
                            <Grid item xs={2}>
                            <span>{left}</span>
                            </Grid>

                            <Grid item xs={8}>
                            <FormControlLabel
                            value="-3"
                            control={<GreenRadio/>}
                            label="1"
                            labelPlacement="top"
                            />
                            <FormControlLabel
                            value="-2"
                            control={<GreenRadio/>}
                            label="2"
                            labelPlacement="top"
                            />
                            <FormControlLabel
                            value="-1"
                            control={<GreenRadio/>}
                            label="3"
                            labelPlacement="top"
                            />
                            <FormControlLabel
                            value="0"
                            control={<GreenRadio/>}
                            label="4"
                            labelPlacement="top"
                            />
                            <FormControlLabel
                            value="1"
                            control={<GreenRadio/>}
                            label="5"
                            labelPlacement="top"
                            />
                            <FormControlLabel
                            value="2"
                            control={<GreenRadio/>}
                            label="6"
                            labelPlacement="top"
                            />
                            <FormControlLabel
                            value="3"
                            control={<GreenRadio/>}
                            label="7"
                            labelPlacement="top"
                            />
                            </Grid>
                        <Grid item xs={2}>
                        <span>{right}</span>
                        </Grid>
                    </Grid>
                    </RadioGroup>
                </div>
                // </Row>
                )
            }else{
                return (
                // <Row horizontal = 'center' style={{justifyContent: "center"}}>
                <div className="scale">
                    <RadioGroup row aria-label="position" name={"ueq"+id}  onChange={(event)=>this.handleRadioChange(event, "ueq", id)}>
                    <Grid container spacing={1}>
                                            
                        <Grid item xs={2}>
                        <span>{left}</span>
                        </Grid>

                        <Grid item xs={8}>
                        <FormControlLabel
                        value="3"
                        control={<GreenRadio/>}
                        label="1"
                        labelPlacement="top"
                        />
                        <FormControlLabel
                        value="2"
                        control={<GreenRadio/>}
                        label="2"
                        labelPlacement="top"
                        />
                        <FormControlLabel
                        value="1"
                        control={<GreenRadio/>}
                        label="3"
                        labelPlacement="top"
                        />
                        <FormControlLabel
                        value="0"
                        control={<GreenRadio/>}
                        label="4"
                        labelPlacement="top"
                        />
                        <FormControlLabel
                       value="-1"
                        control={<GreenRadio/>}
                        label="5"
                        labelPlacement="top"
                        />
                        <FormControlLabel
                        value="-2"
                        control={<GreenRadio/>}
                        label="6"
                        labelPlacement="top"
                        />
                        <FormControlLabel
                        value="-3"
                        control={<GreenRadio/>}
                        label="7"
                        labelPlacement="top"
                        />
                        </Grid>
                        <Grid item xs={2}>
                            <span>{right}</span>
                        </Grid>
                    </Grid>
                    </RadioGroup>
                </div>
                // </Row>
                )
            }

        }

        basicScale = (statement, id, type) => {
            return (
            <div className="scale">
                <span className={"survey-statements"}>{statement}</span>
                <RadioGroup row aria-label="position" name={type+id}  onChange={(event)=>this.handleRadioChange(event, type, id)}>
                    <span >Very Difficult</span>
                    <FormControlLabel
                    value="1"
                    control={<GreenRadio/>}
                    label="1"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="2"
                    control={<GreenRadio/>}
                    label="2"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="3"
                    control={<GreenRadio/>}
                    label="3"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="4"
                    control={<GreenRadio/>}
                    label="4"
                    labelPlacement="top"
                    />
                <span>Very Easy</span>
                </RadioGroup>
                
            </div>
            )
        }

        panasScale = (statement, id) => {
            return (
            <div className="scale">
                <span className={"survey-statements"}>{statement}</span>
                <RadioGroup row aria-label="position" name={"panas"+id}  onChange={(event)=>this.handleRadioChange(event, "panas", id)}>
                    <span >Very slightly or not at all</span>
                    <FormControlLabel
                    value="1"
                    control={<GreenRadio/>}
                    label="1"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="2"
                    control={<GreenRadio/>}
                    label="2"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="3"
                    control={<GreenRadio/>}
                    label="3"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="4"
                    control={<GreenRadio/>}
                    label="4"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="5"
                    control={<GreenRadio/>}
                    label="5"
                    labelPlacement="top"
                    />
                <span>Extremely</span>
                </RadioGroup>
                
            </div>
            )
        }

        nasaScale = (type, statement, id) => {
            return (
            <div className="scale">
                 <h5>{type}</h5>
                <span className={"survey-statements"}>{statement}</span>
                <RadioGroup row aria-label="position" name={"nasa"+id}  onChange={(event)=>this.handleRadioChange(event, "nasa", id)}>
                   
                    <span >Very Low</span>
                    <FormControlLabel
                    value="1"
                    control={<GreenRadio/>}
                    label="1"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="2"
                    control={<GreenRadio/>}
                    label="2"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="3"
                    control={<GreenRadio/>}
                    label="3"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="4"
                    control={<GreenRadio/>}
                    label="4"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="5"
                    control={<GreenRadio/>}
                    label="5"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="6"
                    control={<GreenRadio/>}
                    label="6"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="7"
                    control={<GreenRadio/>}
                    label="7"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="8"
                    control={<GreenRadio/>}
                    label="8"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="9"
                    control={<GreenRadio/>}
                    label="9"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="10"
                    control={<GreenRadio/>}
                    label="10"
                    labelPlacement="top"
                    />
                <span>Very High</span>
                </RadioGroup>
            </div>
            )
        }

 
    handleRadioChange = (event, type, index) => {
        // console.log(event.target.value);
        console.log(type);
        // console.log(index);
        if(type == "smeq"){
            this.state.smeqResult = event;
        }else{
            var score = event.target.value;
        }
        if(type == "sus"){
            var susResult = this.state.susResult;
            susResult.splice(index, 1, score);
            console.log(susResult);
            console.log(this.state.susResult);
        }else if(type == "ueq"){
            var ueqResult = this.state.ueqResult;
            ueqResult.splice(index, 1, score);
            console.log(ueqResult);
            console.log(this.state.ueqResult);
        }else if (type == "nasa"){
            var nasaResult = this.state.nasaResult;
            nasaResult.splice(index, 1, score);
            console.log(nasaResult);
            console.log(this.state.nasaResult);
        }else if (type == "panas"){
            var panasResult = this.state.panasResult;
            panasResult.splice(index, 1, score);
            console.log(panasResult);
            console.log(this.state.panasResult);
        }else if (type == "stress"){
            var stressResult = this.state.stressResult;
            stressResult.splice(index, 1, score);
            console.log(stressResult);
            console.log(this.state.stressResult);
        }else if (type == "cognitive"){
            var cognitiveResult = this.state.cognitiveResult;
            cognitiveResult.splice(index, 1, score);
            console.log(cognitiveResult);
            console.log(this.state.cognitiveResult);
        }else if (type == "decision"){
            var decisionResult = this.state.decisionResult;
            decisionResult.splice(index, 1, score);
            console.log(decisionResult);
            console.log(this.state.decisionResult);
        }else if (type == "group"){
            var groupResult = this.state.groupResult;
            groupResult.splice(index, 1, score);
            console.log(groupResult);
            console.log(this.state.groupResult);
        }

        
        }
    
    handleName=(event)=>{
        this.setState({name: event.target.value});
    }
    handleField=(event, type)=>{
        var explanation = event.target.value;
        this.handleFieldChange(event, type)
    }
    handleFieldChange = (event, type) => {
        var explanation = event.target.value;
        if(type == "name"){
            this.state.name = explanation;
            console.log(this.state.name)
            // this.setState({name: explanation});
        }else if (type == "groupno"){
            this.state.groupno = explanation;
            // this.setState({groupno: explanation});
        }else if(type == "method"){
            this.state.method = explanation;
            // this.setState({method: explanation});
        }else if (type == "cogntive"){
            // var cognitiveExplanation = this.state.cognitiveExplanation;
            // cognitiveExplanation.splice(index, 1, explanation);
            // console.log(cognitiveExplanation);
            // console.log(this.state.cognitiveExplanation);

        }else if (type == "decision"){
            // var decisionExplanation = this.state.decisionExplanation;
            // decisionExplanation.splice(index, 1, explanation);
            // console.log(decisionExplanation);
            // console.log(this.state.decisionExplanation);

        }else if (type == "group"){
            // var groupExplanation = this.state.groupExplanation;
            // groupExplanation.splice(index, 1, explanation);
            // console.log(groupExplanation);
            // console.log(this.state.groupExplanation);

        }else if (type == "comments"){
            this.state.comments = explanation;

        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        console.log("submit pressed")
        if(this.checkEmptyFields()){
            var results = {
                susResult: this.state.susResult,
                ueqResult: this.state.ueqResult,
                nasaResult: this.state.nasaResult,
                smeqResult: this.state.smeqResult,
                panasResult: this.state.panasResult,
                stressResult: this.state.stressResult,
                cognitiveResult: this.state.cognitiveResult,
                decisionResult: this.state.decisionResult,
                groupResult: this.state.groupResult,
                comments: this.state.comments,
                name: this.state.name,
                groupno: this.state.groupno,
                method: this.state.method
            }
            console.log(JSON.stringify(results).length)
            axios.post('https://animosched-backend-backup.herokuapp.com/api/surveys/',{
                data: JSON.stringify(results)
            })
            .then(res => {
                this.setState({redirect: true})
            }).catch(err => {
                this.setState({snackBarText: "Error in submitting form.", snackBar: true})
            })
        }else{
            this.setState({snackBarText: "You have unanswered questions.", snackBar: true})
        }

        // if (value === 'best') {
        //   setHelperText('You got it!');
        //   setError(false);
        // } else if (value === 'worst') {
        //   setHelperText('Sorry, wrong answer!');
        //   setError(true);
        // } else {
        //   setHelperText('Please select an option.');
        //   setError(true);
        // }
        
      };

      handleCloseSnackBar = () => {
          this.setState({snackBar: false})
      }


    render() {
        const { classes } = this.props;
        const valuetext = "1";
        const marks = [
            {
              value: 1.367578,
              label: 'Not at all hard to do',
            },
            {
              value: 11.62609,
              label: 'Not very hard to do',
            },
            {
              value: 25.53207,
              label: 'A bit hard to do',
            },
            {
              value: 36.47449,
              label: 'Fairly hard to do',
            },
            {
              value: 56.30762,
              label: 'Rather hard to do',
            },
            {
              value: 70.66954,
              label: 'Pretty hard to do',
            },
            {
              value: 85.03146,
              label: 'Very hard to do',
            },
            {
              value: 101.4450,
              label: 'Very very hard to do',
            },
            {
              value: 113.4133,
              label: 'Tremendously hard to do',
            },
          ];
        const susStatements = [
            'I think I would like to use this system frequently',
            'I found the system unnecessarily complex',
            'I thought the system was easy to use',
            'I think that I would need the support of a technical person to be able to use this system',
            'I found the various functions in this system well integrated',
            'I thought there was too much inconsistency in this system',
            'I would imagine that most people will learn to use this system very quickly',
            'I found the system very cumbersome (difficult/awkward) to use the system very quickly',
            'I felt very confident using the system',
            'I needed to learn a lot of things before I could get going with this system',
        ]

        const cognitiveStatements = [
            'Overall, the task of creating a schedule for yourself was?',
            'Keeping track of the classes I like was?',
            'Keeping track of the classes I dislike was?',
            'Keeping track of all the necessary information I need to create my schedule was?',
            "Keeping track of the classes I can't get (full or unavailable) was?",
            "Keeping track of what I want in a schedule was?",
            "Organizing my choices and options was?",
            "Visualizing my schedule was?",
            'Resolving course conflicts was?',
            'Creating different schedule possibilities was?',
            "Keeping track of the different schedule possibilities was?",
            "Keeping track of the schedule I want was?",
            'Adjusting my schedule based on changes was?',
           
        ]

        const decisionStatements = [
            'Overall, making decisions while creating a schedule was?',
            'Efficiently weighing my choices and options was?',
            'Picking my classes was?',
            'Picking a final schedule was?',
            'Picking between equally good choices was?',
            'Picking between equally bad choices was?',
        ]

        const collabStatements = [
            'Overall, the task of creating a schedule with your friends was?',
            'Coordinating with my friends to create a schedule was?',
            'Coordinating possible similar classes with all of my friends was?',
            "Factoring in my friends' preferences in my schedule was?",
            "Keeping track and resolving possible conflicts between our schedules was?",
            "Creating multiple possible schedules with my friends was?",
            "Adjusting my schedule due to sudden changes with my friends was?",
            "Comparing my schedule with my friends' schedule was?",
            'Picking a schedule my friends and I are happy with',
        ]

        const panasStatements =[
            // 'Interested',
            // 'Distressed',
            // 'Excited',
            'Upset',
            // 'Strong',
            // 'Guilty',
            // 'Scared',
            'Hostile',
            // 'Enthusiastic',
            // 'Proud',
            // 'Irritable',
            'Alert',
            'Ashamed',
            'Inspired',
            'Nervous',
            'Determined',
            'Attentive',
            // 'Jittery',
            'Active', 
            'Afraid'
        ]

        const ueqStatements = [
            ['annoying', 'enjoyable', true],
            ['not understandable', 'understandable', true],
            ['creative', 'dull', false],
            ['easy to learn', 'difficult to learn', false],
            ['valuable', 'inferior', false],
            ['boring', 'exciting',true],
            ['not interesting', 'interesting', true],
            ['unpredictable', 'predictable', true],
            ['fast', 'slow', false],
            ['inventive', 'conventional', false],
            ['obstructive', 'supportive', true],
            ['good', 'bad', false],
            ['complicated', 'easy', true],
            ['unlikable', 'pleasing', true],
            ['usual', 'leading edge', false],
            ['unpleasant', 'pleasant', true],
            ['secure', 'not secure', false],
            ['motivating', 'demotivating', false],
            ['meets expectations', 'does not meet expectations', false],
            ['inefficient', 'efficient', true],
            ['clear', 'confusing', false],
            ['impractical', 'practical', true],
            ['organized', 'cluttered', false],
            ['attractive', 'unattractive', false],
            ['friendly', 'unfriendly', false],
            ['conservative', 'innovative', true]
        ]

        const nasaStatements = [
            ['Mental Demand', 'How mentally demanding was the task?'],
            ['Physical Demand', 'How physically demanding was the task?'],
            ['Temporal Demand', 'How hurried or rushed was the pace of the task?'],
            ['Performance', 'How successful were you in accomplishing what you were asked to do?'],
            ['Effort', 'How hard did you have to work to accomplish your level of performance?'],
            ['Frustration', 'How insecure, discouraged, irritated, stressed, and annoyed were you?'],
        ]

        const stressStatements = [
            'I find creating schedules for myself to be stressful',
            'I think coordinating class schedules with my friends is stressful',
            'I find it stressful to re-adjust just my schedule because of sudden changes',
            'I find it stressful to re-adjust my schedule with my friends after sudden changes',
            'It is stressful to keep track of a lot of things for creating my/our schedule',
            
        ]


      return (
        <div>
            {this.props.menu('preferences')}

                {this.state.dataReceived ? 
                <div className="survey-category">
                   <div>
                    {this.state.redirect ?
                    <Redirect to="/surveythanks"></Redirect>
                    : null}
                   <form onSubmit={this.handleSubmit}>
                    <h1 style={{marginTop: "20px"}}>Survey</h1>
                    <span>Please make sure to answer all the questions in the questionnaires below, you're not allowed to skip any questions. All of these questions are related to the method you used for the experiment and your experience with it. Thank you!</span>
                    <div>
                    <br></br>
                    
                    <h3>Participant Details</h3>
                    <TextField id="outlined-basic" label="Last Name, First Name"  name="fullName" placeholder="Velasco, John" style={{marginRight: "25", width: "750"}} onChange={(event)=>this.handleField(event, "name")}></TextField>
                    <br></br>
                    <br></br>
                    <TextField id="outlined-basic" label="Group Number"  name="Group Number" placeholder="A1" style={{marginRight: "25", width: "750"}} onChange={(event)=>this.handleField(event, "groupno")}></TextField>
                    <br></br>
                    <br></br>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Method Used</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        style={{width: "230px"}}
                        onChange={(event)=>this.handleField(event, "method")}
                        >
                        <MenuItem value={"Traditional Method"}>Your own usual method</MenuItem>
                        <MenuItem value={"AnimoSched Method"}>AnimoSched method</MenuItem>
                        </Select>
                    </FormControl>
                    </div>
                        <div>
                        </div>
                            <div className="timePreferences">
                                <h2>SUS Survey
                                </h2>
                                <p>Please accomplish all the questions with the first answer you think of. All of these questions pertain to the method you used for the experiment.
                                    Feel free to ask for clarifications if you do not understand the question. Thank you!</p>
                                <p>*note: System refers to the method or process you use to create a schedule in this experiment.</p>
                                
                                <div className="preference-category-content">
                                    {susStatements.map((statement, index)=> 
                                        this.susScale(statement, index)
                                    )}
                                </div>
                            </div>

                            <div className="ueq-survey">
                                <h2>User Experience Questionnaire
                                </h2>
                                <p>For the assessment of the method or process you used for this experiment, please fill out the following questionnaire.
                                    The questionnaire consists of pairs of contrasting attributes that may apply to
                                    the process. The circles between the attributes represent gradations between
                                    the opposites. You can express your agreement with the attributes by ticking
                                    the circle that most closely reflects your impression</p>
                                <p>Please decide spontaneously. Don’t think too long about your decision to
                                    make sure that you convey your original impression.</p>
                                <p>Sometimes you may not be completely sure about your agreement with a
                                    particular attribute or you may find that the attribute does not apply completely
                                    to the particular process. Nevertheless, please tick a circle in every line.</p>
                                <p>It is your personal opinion that counts. Please remember: there is no wrong or
                                    right answer!</p>
                                <div className="preference-category-content">
                                <Row horizontal = 'center' style={{justifyContent: "center"}}>
                                    <div style={{placeItems: "center"}}>
                                        {ueqStatements.map((statement, index )=> 
                                        this.ueqScale(statement[0], statement[1], statement[2], index)
                                    )}</div>
                                </Row>
                                </div>
                            </div>

                            <div className="nasa-survey">
                                <h2>NASA TLX
                                </h2>
                                <span>This questionnaire assesses the work load you've experienced with the tasks.</span>
                                <div className="preference-category-content">
                                        {nasaStatements.map((statement, index )=> 
                                        this.nasaScale(statement[0], statement[1], index)
                                    )}
                                </div>
                            </div>

                            <div className="workloadPreferences">
                                <h2>Subjective Mental Effort Questionnaire (SMEQ)
                                </h2>
                                <span>To assess mental effort you exerted in the tasks, use the slider that goes from 0-150 to specify the difficulty. The levels of difficulty are also found in the slider.</span>
                                <div className="preference-category-content" >
                                
                                <Row horizontal = 'center' style={{justifyContent: "center"}}>
                                <div className="scale" style={{height: 500, placeItems: "center"}}>
                                <PrettoSlider
                                valueLabelDisplay="auto"
                                orientation="vertical"
                                // getAriaValueText={valuetext}
                                defaultValue={0}
                                aria-labelledby="vertical-slider"
                                marks={marks}
                                max={150}
                                onChange={(event, value)=>this.handleRadioChange(value , "smeq", "none")}
                                />
                                </div>
                                </Row>
                                </div>
                            </div>

                            <div className="panas-survey">
                                <h2>PANAS
                                </h2>
                                <span>This questionnaire contains 10-items of emotions. Please answer them based on all the emotions you've felt throughout the tasks.</span>
                                <div className="preference-category-content">
                                        {panasStatements.map((statement, index) => 
                                        this.panasScale(statement, index)
                                    )}
                                </div>
                            </div>

                            <div className="stress-survey">
                                <h2>Stress
                                </h2>
                                <p>We want to understand which specific parts of the process makes you feel stressed. Please answer the scale and explain your answer so we may understand what your logic and thought process was behind it.</p>
                                <div className="preference-category-content">
                                    {stressStatements.map((statement, index) => 
                                        this.stressScale(statement, index)
                                    )}
                                     
                                </div>
                            </div>

                            {/* <div className="classDetails">
                                <h2>Word List</h2>
                                
                                <div className="preference-category-content">
                                
                                    <div className={'wordlist-survey'}>
                                        <div className={'subheader'}>Word List</div>
                                        <p>Step 1: Read over the following list of words. Considering the method you have just used, tick those
                                        words that best describe your experience with it. You can choose as many words as you wish. </p>
                                        <Grid container spacing={1}> */}
                                            {/* <Grid item xs={12}>
                                            <Grid item xs={4}>
                                            
                                            <FormGroup>
                                              {this.state.wordList.filter(word => word.id < 36).map((filteredWord)=>{
                                                  return <FormControlLabel control = {<GreenCheckbox checked={filteredWord.checked} onChange={this.handleWordChange} id={filteredWord.id}  color="primary"/>}label={filteredWord.word} />;
                                                })}
                                            
                                            </FormGroup>
                                            </Grid>

                                            <Grid item xs={4}>
                                            <FormGroup>
                                                {this.state.wordList.filter(word => word.id >= 36 && word.id <= 70).map((filteredWord)=>{
                                                  return <FormControlLabel control = {<GreenCheckbox checked={filteredWord.checked} onChange={this.handleWordChange} id={filteredWord.id}  color="primary"/> } label={filteredWord.word} />;
                                                })}
                                                {/* <FormControlLabel
                                                control = {<GreenCheckbox checked={this.state.wordList[0].checked} onChange={this.handleWordChange} id={this.state.wordList[0].id}  color="primary"/>}label={this.state.wordList[0].word} />
                                                <FormControlLabel
                                                control = {<GreenCheckbox checked={this.state.wordList[1].checked} onChange={this.handleWordChange} id={this.state.wordList[1].id} color="primary"/>}label={this.state.wordList[1].word} />
                                                <FormControlLabel
                                                control = {<GreenCheckbox checked={this.state.wordList[2].checked} onChange={this.handleWordChange} id={this.state.wordList[2].id} color="primary"/>}label={this.state.wordList[2].word}/>
                                                <FormControlLabel
                                                control = {<GreenCheckbox checked={this.state.wordList[3].checked} onChange={this.handleWordChange} id={this.state.wordList[3].id} color="primary"/>}label={this.state.wordList[3].word} /> */}
                                            {/* </FormGroup>
                                            </Grid>

                                            <Grid item xs={4}>
                                            <FormGroup>
                                                {this.state.wordList.filter(word => word.id > 70 && word.id <= 105).map((filteredWord)=>{
                                                  return <FormControlLabel control = {<GreenCheckbox checked={filteredWord.checked} onChange={this.handleWordChange} id={filteredWord.id}  color="primary"/>}label={filteredWord.word} />;
                                                })} */}
                                                {/* <FormControlLabel
                                                control = {<GreenCheckbox checked={this.state.wordList[0].checked} onChange={this.handleWordChange} id={this.state.wordList[0].id}  color="primary"/>}label={this.state.wordList[0].word} />
                                                <FormControlLabel
                                                control = {<GreenCheckbox checked={this.state.wordList[1].checked} onChange={this.handleWordChange} id={this.state.wordList[1].id} color="primary"/>}label={this.state.wordList[1].word} />
                                                <FormControlLabel
                                                control = {<GreenCheckbox checked={this.state.wordList[2].checked} onChange={this.handleWordChange} id={this.state.wordList[2].id} color="primary"/>}label={this.state.wordList[2].word}/>
                                                <FormControlLabel
                                                control = {<GreenCheckbox checked={this.state.wordList[3].checked} onChange={this.handleWordChange} id={this.state.wordList[3].id} color="primary"/>}label={this.state.wordList[3].word} /> */}
                                            {/* </FormGroup>
                                            </Grid>
                                        </Grid>

                                        
                                        <p>Step 2: Now look at the words you have ticked. Input five of these words in the box below that you think are most
                                    descriptive of the product. </p>
                                        <Autocomplete
                                            multiple
                                            id="tags-outlined"
                                            options={this.state.currentWords}
                                            getOptionLabel={(option) => option.word}
                                            // defaultValue={}
                                            filterSelectedOptions
                                            renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                label=""
                                                // placeholder=""
                                            />
                                            )} */}
                                        {/* /> */}
                                        {/* </Grid> */}
                                    {/*</div>
                                  </div>
                                </div> */}


                            
                          
                            <div className="cognitive-survey">
                                <h2>Cognitive Load & Decision-making
                                </h2>
                                <p>
                                We want to understand which specific parts of the process makes you feel overwhelmed (cognitive load) and your thoughts on decision-making. 
                                </p>
                                <div className="preference-category-content">
                                    {cognitiveStatements.map((statement, index )=> 
                                        this.basicScale(statement, index, "cognitive")
                                    )}
                                   
                                    {decisionStatements.map((statement, index )=> 
                                        this.basicScale(statement, index, "decision")
                                    )}
                                 
                                    {collabStatements.map((statement, index) => 
                                        this.basicScale(statement, index, "group")
                                    )}
                             
                                </div>
                                     
                            </div>

                            {/* <div className="decision-survey">
                                <h2>Decision-Making
                                </h2>
                                <p>
                                We want to understand your thoughts in decision-making when creating schedules with the given method or process. Please answer the scale and explain your answer so we may understand what your logic and thought process was behind it.
                                </p>
                                <div className="preference-category-content">
                                    {decisionStatements.map((statement, index )=> 
                                        this.basicScale(statement, index, "decision")
                                    )}
                                     <div>
                                     <h5>Please include any other insights you had about decision-making and your explanation for how you answered the questions above.</h5>
                                        <TextField
                                        id="standard-full-width"
                                        label="Explain your answer above here including the thought process you had related to it"
                                        style={{ margin: 8 }}
                                        placeholder="Answer here"
                                        fullWidth
                                        margin="normal"
                                        onChange={(event)=>this.handleField(event, "decision")}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="collab-survey">
                                <h2>Group Schedule Coordination
                                </h2>
                                <p>
                                We want to understand your thoughts in coordinating with your friends when creating schedules with the given method or process. Please answer the scale and explain your answer so we may understand what your logic and thought process was behind it.
                                </p>
                                <div className="preference-category-content">
                                    {collabStatements.map((statement, index) => 
                                        this.basicScale(statement, index, "group")
                                    )}
                                     <div>
                                     <h5>Please include any other insights you had about group schedule coordination and your explanation for how you answered the questions above.</h5>
                                        <TextField
                                        id="standard-full-width"
                                        label="Explain your answer above here including the thought process you had related to it"
                                        style={{ margin: 8 }}
                                        placeholder="Answer here"
                                        fullWidth
                                        margin="normal"
                                        onChange={(event)=>this.handleField(event, "group")}
                                        />
                                    </div>
                                </div>
                            </div> */}
                            
                            <div className="comments-survey">
                                <h2>Comments
                                </h2>
                                <p>Feel free to leave any interesting comments and insights here if it was not covered in any of the questions above.</p>
                                <div className="preference-category-content">
                                    <TextField
                                    id="standard-full-width"
                                    label="Comments, insights, realizations"
                                    style={{ margin: 8 }}
                                    placeholder="Answer here"
                                    fullWidth
                                    margin="normal"
                                    onChange={(event) => this.handleField(event, "comments")}
                                    // InputLabelProps={{
                                    //     shrink: true,
                                    // }}
                                    />
                                </div>
                            </div>

                            <center><Button
                                variant="contained"
                                className={classes.buttonStyle}
                                onClick={this.handleSave}
                                type="submit"
                                >
                                SUBMIT
                            </Button></center>
                    </form>
                    </div>             
                              <Snackbar open={this.state.snackBar} autoHideDuration={4000} onClose={this.handleCloseSnackBar}>
                                <Alert onClose={this.handleCloseSnackBar} severity="error">
                                  {this.state.snackBarText}
                                </Alert>
                              </Snackbar>
                </div>
                : 
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh"}}>
                    <ReactLoading type={'spin'} color={'#9BCFB8'} height={'5%'} width={'5%'}/>
                </div> }
            {/* </div> */}

        </div>        
      );
    }
  }

  Survey.propTypes={
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(Survey);