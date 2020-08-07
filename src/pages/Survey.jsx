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



class Preferences extends Component {
    constructor(props){
        super(props)
        this.state = {

            selectedValue: 0,
            dataReceived: true,
            currentWords: [],
            words: ['Accessible', 'Effortless', 'Ordinary', 'Advanced', 'Empowering', 'Organised', 'Ambiguous', 'Energetic', 'Overwhelming', 'Annoying', 'Engaging', 'Patronising', 'Appealing', 'Entertaining', 'Poor quality', 'Approachable', 'Exciting', 'Powerful', 'Attractive', 'Expected', 'Predictable', 'Awkward', 'Familiar', 'Professional', 'Boring', 'Fast', 'Relevant', 'Bright', 'Faulty', 'Reliable', 'Business-like', 'Flexible', 'Responsive', 'Busy', 'Fresh', 'Rigid', 'Clean', 'Friendly', 'Satisfying', 'Clear', 'Frustrating', 'Secure', 'Cluttered', 'Fun', 'Simple', 'Compelling', 'Hard to Use', 'Simplistic', 'Complex', 'High quality', 'Slow', 'Comprehensive', 'Illogical', 'Sophisticated', 'Confusing', 'Impressive', 'Stable', 'Consistent', 'Inadequate', 'Stimulating', 'Contradictory', 'Incomprehensible', 'Straightforward', 'Controllable', 'Inconsistent', 'Stressful', 'Convenient', 'Ineffective', 'System-oriented', 'Counter-intuitive', 'Innovative', 'Time-consuming', 'Creative', 'Insecure', 'Time-saving', 'Credible', 'Intimidating', 'Too technical', 'Cutting edge', 'Intuitive', 'Trustworthy', 'Dated', 'Irrelevant', 'Unattractive', 'Desirable', 'Meaningful', 'Unconventional', 'Difficult', 'Misleading', 'Understandable', 'Distracting', 'Motivating', 'Unpredictable', 'Dull', 'New', 'Unrefined', 'Easy to use', 'Non-standard', 'Usable', 'Effective', 'Obscure', 'Useful', 'Efficient', 'Old', 'Vague'],
            wordList : []
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

    handleChange = (e) => {
        this.setState({selectedValue: e.target.value})


    }

    handleWordChange = (event) => {
      var newWordList = this.state.wordList;
      var newCurrentWords = [];
      newWordList[event.target.id - 1].checked = event.target.checked;
      if(event.target.checked){
        newCurrentWords = this.state.currentWords;
        newCurrentWords.push(newWordList[event.target.id - 1]);
      }else{
        this.state.currentWords.map(word => {
            if(event.target.id != word.id){
                newCurrentWords.push(word)
            }
        })
      }
      this.setState({wordList: newWordList, currentWords: newCurrentWords});
   };
        susScale = (statement) => {
            return (
            <div className="scale">
                <span className={"survey-statements"}>{statement}</span>
                <RadioGroup row aria-label="position" name="position" >
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

        stressScale = (statement) => {
            return (
            <div className="scale">
                <span className={"survey-statements"}>{statement}</span>
                <RadioGroup row aria-label="position" name="position" >
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
                <div>
                <TextField
                id="standard-full-width"
                label="Explain your answer above here including the thought process you had related to it"
                style={{ margin: 8 }}
                placeholder="Answer here"
                fullWidth
                margin="normal"
                // InputLabelProps={{
                //     shrink: true,
                // }}
                />
                </div>
            </div>
            )
        }

        ueqScale = (left, right, type) => {
            if(type){
                return (
                // <Row horizontal = 'center' style={{justifyContent: "center"}}>
                <div className="scale" style={{placeItems: "center", justify: "center"}}>
                    <RadioGroup row aria-label="position" name="position" >
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
                    <RadioGroup row aria-label="position" name="position" >
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

        basicScale = (statement) => {
            return (
            <div className="scale">
                <span className={"survey-statements"}>{statement}</span>
                <RadioGroup row aria-label="position" name="position" >
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
                <div>
                <TextField
                id="standard-full-width"
                label="Explain your answer above here including the thought process you had related to it"
                style={{ margin: 8 }}
                placeholder="Answer here"
                fullWidth
                margin="normal"
                // InputLabelProps={{
                //     shrink: true,
                // }}
                />
                </div>
            </div>
            )
        }

        panasScale = (statement) => {
            return (
            <div className="scale">
                <span className={"survey-statements"}>{statement}</span>
                <RadioGroup row aria-label="position" name="position" >
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

        nasaScale = (type, statement) => {
            return (
            <div className="scale">
                 <h5>{type}</h5>
                <span className={"survey-statements"}>{statement}</span>
                <RadioGroup row aria-label="position" name="position" >
                   
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
            'I needed to learn a lot of things before I could get going with this system confident using the system',
        ]

        const cognitiveStatements = [
            'Overall, the task of creating a schedule for yourself was?',
            'Keeping track of the classes I like.',
            'Keeping track of the classes I dislike.',
            'Resolving course conflicts.',
            'Keeping track of the schedule I want.',
            'Adjusting my schedule based on changes.',
            'Keeping track of all the necessary information I need to know for my schedule'
        ]

        const decisionStatements = [
            'Efficiently weighing my options and decisions.',
            'Picking my classes.',
            'Picking a final schedule.',
            'Prioritizing my preferences.',
        ]

        const collabStatements = [
            'Coordinating with my friends to create a schedule',
            'Coordinating with my friends with the similar classes we need',
            'Picking a schedule my friends and I are happy with',
        ]

        const panasStatements =[
            'Interested',
            'Distressed',
            'Excited',
            'Upset',
            'Strong',
            'Guilty',
            'Scared',
            'Hostile',
            'Enthusiastic',
            'Proud',
            'Irritable',
            'Alert',
            'Ashamed',
            'Inspired',
            'Nervous',
            'Determined',
            'Attentive',
            'Jittery',
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
            ['friendly', 'friendly', false],
            ['conservative', 'innovative', true]
        ]

        const nasaStatements = [
            ['Mental Demand', 'How mentally demanding was the task?'],
            ['Physical Demand', 'How physically demanding was the task?'],
            ['Temporal Demand', 'How hurried or rushed was the pace of the task?'],
            ['Performance', 'How successful were you in accomplishing what you were asked to do?'],
            ['Effort', 'How hard did you have to work to accomplish your level of performance?'],
            ['Frustration', 'How insecure, discourages, irritated, stressed, and annoyed were you?'],
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
                  <h1 style={{marginTop: "20px"}}>Survey</h1>
                  <span>Please make sure to answer all the questions in the questionnaires below, you're not allowed to skip any questions. All of these questions are related to the method you used for the experiment and your experience with it. Thank you!</span>
                    <div>
                    <br></br>
                    <h3>Participant Details</h3>
                    <TextField id="outlined-basic" label="Last Name, First Name"  name="fullName" placeholder="Velasco, John" style={{marginRight: "25", width: "750"}}></TextField>
                    <br></br>
                    <br></br>
                    <TextField id="outlined-basic" label="Group Number"  name="Group Number" placeholder="A1" style={{marginRight: "25", width: "750"}}></TextField>
                    <br></br>
                    <br></br>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Method Used</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        style={{width: "230px"}}
                      
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
                                    {susStatements.map(statement => 
                                        this.susScale(statement)
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
                                        {ueqStatements.map(statement => 
                                        this.ueqScale(statement[0], statement[1], statement[2])
                                    )}</div>
                                </Row>
                                </div>
                            </div>

                            <div className="nasa-survey">
                                <h2>NASA TLX
                                </h2>
                                <span>This questionnaire assesses the work load you've experienced with the tasks.</span>
                                <div className="preference-category-content">
                                        {nasaStatements.map(statement => 
                                        this.nasaScale(statement[0], statement[1])
                                    )}
                                </div>
                            </div>

                            <div className="workloadPreferences">
                                <h2>Subjective Mental Effort Questionnaire (SMEQ)
                                </h2>
                                <span>To assess mental effort you exerted in the tasks, use the slider that goes from 0-150 to specify the difficulty. The levels of difficulty is also found in the slider.</span>
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
                                />
                                </div>
                                </Row>
                                </div>
                            </div>

                            <div className="panas-survey">
                                <h2>PANAS
                                </h2>
                                <span>This questionnaire contains 20-items of emotions. Please answer them based on all the emotions you've felt throughout the tasks.</span>
                                <div className="preference-category-content">
                                        {panasStatements.map(statement => 
                                        this.panasScale(statement)
                                    )}
                                </div>
                            </div>

                            <div className="stress-survey">
                                <h2>Stress
                                </h2>
                                <p>We want to understand which specific parts of the process makes you feel stressed. Please answer the scale and explain your answer so we may understand what your logic and thought process was behind it.</p>
                                <div className="preference-category-content">
                                    {stressStatements.map(statement => 
                                        this.stressScale(statement)
                                    )}
                                </div>
                            </div>

                            <div className="classDetails">
                                <h2>Word List</h2>
                                
                                <div className="preference-category-content">
                                
                                    <div className={'wordlist-survey'}>
                                        <div className={'subheader'}>Word List</div>
                                        <p>Step 1: Read over the following list of words. Considering the method you have just used, tick those
                                        words that best describe your experience with it. You can choose as many words as you wish. </p>
                                        <Grid container spacing={1}>
                                            {/* <Grid item xs={12}> */}
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
                                            </FormGroup>
                                            </Grid>

                                            <Grid item xs={4}>
                                            <FormGroup>
                                                {this.state.wordList.filter(word => word.id > 70 && word.id <= 105).map((filteredWord)=>{
                                                  return <FormControlLabel control = {<GreenCheckbox checked={filteredWord.checked} onChange={this.handleWordChange} id={filteredWord.id}  color="primary"/>}label={filteredWord.word} />;
                                                })}
                                                {/* <FormControlLabel
                                                control = {<GreenCheckbox checked={this.state.wordList[0].checked} onChange={this.handleWordChange} id={this.state.wordList[0].id}  color="primary"/>}label={this.state.wordList[0].word} />
                                                <FormControlLabel
                                                control = {<GreenCheckbox checked={this.state.wordList[1].checked} onChange={this.handleWordChange} id={this.state.wordList[1].id} color="primary"/>}label={this.state.wordList[1].word} />
                                                <FormControlLabel
                                                control = {<GreenCheckbox checked={this.state.wordList[2].checked} onChange={this.handleWordChange} id={this.state.wordList[2].id} color="primary"/>}label={this.state.wordList[2].word}/>
                                                <FormControlLabel
                                                control = {<GreenCheckbox checked={this.state.wordList[3].checked} onChange={this.handleWordChange} id={this.state.wordList[3].id} color="primary"/>}label={this.state.wordList[3].word} /> */}
                                            </FormGroup>
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
                                            )}
                                        />
                                        {/* </Grid> */}
                                    </div>
                                  </div>
                                </div>


                            
                          
                            <div className="cognitive-survey">
                                <h2>Cognitive Load
                                </h2>
                                <p>
                                We want to understand which specific parts of the process makes you feel overwhelmed with cogntive load. Please answer the scale and explain your answer so we may understand what your logic and thought process was behind it.
                                </p>
                                <div className="preference-category-content">
                                    {cognitiveStatements.map(statement => 
                                        this.basicScale(statement)
                                    )}
                                </div>
                            </div>

                            <div className="decision-survey">
                                <h2>Decision-Making
                                </h2>
                                <p>
                                We want to understand your thoughts in decision-making when creating schedules with the given method or process. Please answer the scale and explain your answer so we may understand what your logic and thought process was behind it.
                                </p>
                                <div className="preference-category-content">
                                    {decisionStatements.map(statement => 
                                        this.basicScale(statement)
                                    )}
                                </div>
                            </div>


                            <div className="collab-survey">
                                <h2>Group Schedule Coordination
                                </h2>
                                <p>
                                We want to understand your thoughts in coordinating with your friends when creating schedules with the given method or process. Please answer the scale and explain your answer so we may understand what your logic and thought process was behind it.
                                </p>
                                <div className="preference-category-content">
                                    {collabStatements.map(statement => 
                                        this.basicScale(statement)
                                    )}
                                </div>
                            </div>
                            
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
                                >
                                SUBMIT
                            </Button></center>

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

  Preferences.propTypes={
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(Preferences);