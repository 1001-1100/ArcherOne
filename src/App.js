// frontend/src/App.js

import React, { Component } from "react";
import './App.css';

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

// PAGES
import MainPage from "./pages/Index.jsx";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import ResetPasswordPage from "./pages/ResetPassword.jsx";
import ResetPasswordDonePage from "./pages/ResetPasswordDone.jsx";
import ResetPasswordConfirmPage from "./pages/ResetPasswordConfirm.jsx";
import ResetPasswordCompletePage from "./pages/ResetPasswordComplete.jsx";
import ProfilePage from "./pages/Profile.jsx";
import FlowchartPage from "./pages/Flowchart.jsx";
import GenerateSchedulePage from "./pages/GenerateSchedule.jsx";
import GenerateScheduleFriendsPage from "./pages/GenerateScheduleFriends.jsx";
import PreferencesPage from "./pages/Preferences.jsx";
import SearchCoursesPage from "./pages/SearchCourses.jsx";
import SearchCoursesSimplePage from "./pages/SearchCoursesSimple.jsx";
import SearchCoursesGuestPage from "./pages/SearchCoursesGuest.jsx";
import ViewFriendsPage from "./pages/FriendPage.jsx";
import SurveyPage from "./pages/Survey.jsx";
import AdminPage from "./pages/Admin.jsx";
import Menu from "./components/Menu.jsx";
import CompareSchedulePage from "./pages/CompareSchedule.jsx";
import EmailVerificationCompletePage from "./pages/EmailVerificationComplete.jsx";
import SurveyThanksPage from "./pages/SurveyThanks.jsx";

import axios from 'axios';
import qs from 'qs';
import queryString from 'query-string'
import {useCookies} from 'react-cookie'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      logged_in: localStorage.getItem('token') ? true : false,
      first_name: localStorage.getItem('first_name'),
      last_name: localStorage.getItem('last_name'),
      user_id: localStorage.getItem('user_id'),
      colleges:{},
      degrees:{}
    };
  }

  // this.state.logged_in --> indicates if user is logged in or not

  componentDidMount(){

    // var cookie = 'qi0ftcskpd1eiufxhopx8xqsx5dsqlos';
    // console.log('cookie check')
    // console.log(cookie)

    //   axios.get('https://archerone-backend.herokuapp.com/api/auth/user/',
    //   {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     withCredentials: true
    //   })
    //   .then(res => {
    //     console.log(res)
    //     this.setState({
    //       logged_in: true,
    //       first_name: res.data.first_name,
    //       last_name: res.data.last_name,
    //       id_num: ''
    //     })
    //   })
    //   .catch(error => {
    //     console.log(error.response)
    //   })
  }

  componentWillMount(){
    var checkDate = '09/02/20-1'
    var integrityCheck = localStorage.getItem('integrity_check')
    if(integrityCheck != checkDate){
      this.wipe_logout()
      localStorage.setItem('integrity_check', checkDate)
    }

    // if(this.state.logged_in){
    //   axios.get('https://archerone-backend.herokuapp.com/api/auth/user/',
    //   {
    //     headers: {
    //       Authorization: `JWT ${localStorage.getItem('token')}` 
    //     },
    //     withCredentials: true
    //   })
    //   .then(res => {
    //     this.setState({
    //       logged_in: true,
    //       first_name: res.data.first_name,
    //       last_name: res.data.last_name,
    //       id_num: ''
    //     })
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
    // }
  }

  handle_login = (data, _callback) => {
    axios.post('https://archerone-backend.herokuapp.com/api/auth/login/', data,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('first_name', res.data.user.first_name);
        localStorage.setItem('last_name', res.data.user.last_name);
        localStorage.setItem('user_id', res.data.user.id);
        this.setState({
          logged_in: true,
          first_name: res.data.user.first_name,
          last_name: res.data.user.last_name,
          user_id: res.data.user.id,
        })
        _callback(null);
    })
    .catch(error => {
        console.log(error.response)
        _callback(error.response);
    });
  }

  responseGoogle = (data, _callback) => {
    const email = data.email
    const lastName = data.lastName
    const firstName = data.firstName
    axios.post('https://archerone-backend.herokuapp.com/api/googlelogin/',{
      email, firstName, lastName 
    }).then(res => {
        // localStorage.setItem('token', res.data.token);
        if(res['loggedIn']){
          localStorage.setItem('first_name', firstName);
          localStorage.setItem('last_name', lastName);
          localStorage.setItem('user_id', res['user']);
          this.setState({
            logged_in: true,
            first_name: firstName,
            last_name: lastName,
            user_id: res['user'],
          })
        }
      _callback(res['loggedIn'])
    }).catch(err => {
      console.log(err)
      console.log(err.response)
    })
    // this.setState({redirect: true})
  }


  handle_register = (data, _callback) => {
    axios.post('https://archerone-backend.herokuapp.com/api/auth/registration/', data,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('first_name', res.data.user.first_name);
        localStorage.setItem('last_name', res.data.user.last_name);
        localStorage.setItem('user_id', res.data.user.id);
        this.setState({
          logged_in: true,
          first_name: res.data.user.first_name,
          last_name: res.data.user.last_name,
          user_id: res.data.user.id,
        })
        _callback(null);
    })
    .catch(error => {
        console.log(error)
        _callback(error);
    });
  }

  handle_resetPassword = (data, _callback) => {
    axios.post('https://archerone-backend.herokuapp.com/api/auth/password/reset/', data,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        console.log(res.data);
        console.log(res.data.email);
        _callback(true);
    })
    .catch(error => {
        console.log(error.response)
        _callback(false);
    });
  }

  handle_resetPasswordConfirm = (data, _callback) => {
    axios.post('https://archerone-backend.herokuapp.com/api/auth/password/reset/confirm/', data,
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        console.log(res.data);
        _callback(true);
    })
    .catch(error => {
        console.log(error.response)
        _callback(false);
    });
  }

  wipe_logout = () => {
    localStorage.clear();
    this.setState({
      logged_in: false,
      first_name: '',
      last_name: '',
      id_num: '',
    });
    return (
      <Redirect to="/login" />
    );
  }

  handle_logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('id_num');
    localStorage.removeItem('hints');
    this.setState({
      logged_in: false,
      first_name: '',
      last_name: '',
      id_num: '',
    });
    return (
      <Redirect to="/login" />
    );
  }

  loginPage = (props) => {
    return (
      <LoginPage
        handle_login={this.handle_login}
        responseGoogle={this.responseGoogle}
        props={props}
      />
    );
  }

  registerPage = (props) => {
    return (
      <RegisterPage
        handle_register={this.handle_register}
        props={props}
      />
    );
  }

  resetPasswordPage = () => {
    return (
      <ResetPasswordPage
        handle_resetPassword={this.handle_resetPassword}
      />
    );
  }

  resetPasswordDonePage = () => {
    return (
      <ResetPasswordDonePage/>
    );
  }

  resetPasswordConfirmPage = () => {
    return (
      <ResetPasswordConfirmPage
        handle_resetPasswordConfirm={this.handle_resetPasswordConfirm}
      />
    );
  }

  resetPasswordCompletePage = () => {
    return (
      <ResetPasswordCompletePage/>
    );
  }

  menu = () => {
    return (
      <Menu
        handle_logout={this.handle_logout}
        logged_in={this.state.logged_in}
        first_name={this.state.first_name}
        last_name={this.state.last_name}
      />
    )
  }

  menu = (currentPage) => {
    return (
      <Menu
        handle_logout={this.handle_logout}
        logged_in={this.state.logged_in}
        first_name={this.state.first_name}
        last_name={this.state.last_name}
        currentPage={currentPage}
      />
    )
  }

  mainPage = (props) => {
    console.log(props.location.search)
    var data = qs.parse(props.location.search)
    console.log(data)
    return (
      <MainPage
        menu={this.menu}
        logged_in={this.state.logged_in}
      />
    )
  }

  redirected = (props) => {
    const [cookies, setCookie] = useCookies(['sessionid', 'XCSRF-TOKEN'])
    var data = queryString.parse(props.location.search)
    localStorage.setItem('sessionid',data['sessionid'])
    localStorage.setItem('XCSRF-TOKEN',data['XCSRF-TOKEN'])
    setCookie('sessionid', data['sessionid'], {path:'/'})
    setCookie('XCSRF-TOKEN', data['XCSRF-TOKEN'], {path:'/'})
    return (
      <Redirect to="/" />
    )
  }

  profilePage = () => {
    return (
      <ProfilePage
        menu={this.menu}
      />
    )
  }

  generateSchedulePage = () => {
    return (
      <GenerateSchedulePage
        menu={this.menu}
      />
    )
  }

  preferencesPage = () => {
    return (
      <PreferencesPage
        menu={this.menu}
      />
    )
  }

  searchCoursesPage = () => {
    return (
      <SearchCoursesPage
        menu={this.menu}
      />
    )
  }

  searchCoursesGuestPage = () => {
    return (
      <SearchCoursesGuestPage
        menu={this.menu}
      />
    )
  }

  searchCoursesSimplePage= () => {
    return (
      <SearchCoursesSimplePage
        menu={this.menu}
      />
    )
  }

  viewFriendsPage = () => {
    return (
      <ViewFriendsPage
        menu={this.menu}
      />
    )
  }

  flowchartPage = () => {
    return (
      <FlowchartPage
        menu={this.menu}
      />
    )
  }

  compareSchedulePage = (props) => {
    return (
      <CompareSchedulePage
        menu={this.menu}
        params={props.match.params}
      />
    )
  }

  generateScheduleFriendsPage = (props) => {
    console.log(props)
    return (
      <GenerateScheduleFriendsPage
        menu={this.menu}
        props={props}
        params={props.match.params}
      />
    )
  }

  surveyPage = (props) => {
    return (
      <SurveyPage
        menu={this.menu}
        params={props.match.params}
      />
    )
  }

  surveyThanksPage = (props) => {
    return (
      <SurveyThanksPage
        menu={this.menu}
        params={props.match.params}
      />
    )
  }

  adminPage = (props) => {
    return (
      <AdminPage
        params={props.match.params}
      />
    )
  }

  emailVerificationCompletePage = () => {
    return (
      <EmailVerificationCompletePage/>
    );
  }

  render() {

    return (
      <Router>
        <Switch>
          <Route exact path="/" render={this.mainPage} />
          <Route exact path="/redirect" render={this.redirected} />
          <Route exact path="/survey" render={this.surveyPage} />
          <Route exact path="/surveythanks" render={this.surveyThanksPage} />
          <Route exact path="/admin" render={this.adminPage} />
          {!this.state.logged_in &&
          <Route exact path="/login" component={this.loginPage}/>
          }
          {!this.state.logged_in &&
          <Route exact path="/search_courses" component={this.searchCoursesGuestPage}/>
          }
          {!this.state.logged_in &&
          <Route exact path="/search_courses_simple" component={this.searchCoursesSimplePage}/>
          }
          <Route exact path="/search_courses" component={this.searchCoursesPage} />
          <Route exact path="/register" component={this.registerPage} />
          <Route exact path="/email_verified" component={this.emailVerificationCompletePage} />
          <Route exact path="/password_reset" component={this.resetPasswordPage} />
          <Route exact path="/password_reset_done" component={this.resetPasswordDonePage} />
          <Route path="/reset/:uidb64/:token" component={this.resetPasswordConfirmPage} />
          <Route exact path="/password_reset_complete" component={this.resetPasswordCompletePage} />
          {this.state.logged_in && 
          <Route exact path="/profile" component={this.profilePage} />
          }
          {this.state.logged_in && 
          <Route exact path="/flowchart" component={this.flowchartPage} />
          }
          {this.state.logged_in && 
          <Route exact path="/generateSchedule" component={this.generateSchedulePage} />
          }
          {this.state.logged_in && 
          <Route exact path="/preferences" component={this.preferencesPage} />
          }
          {this.state.logged_in && 
          <Route exact path="/view_friends" component={this.viewFriendsPage} />
          }
          {this.state.logged_in && 
          <Route exact path="/compare_schedule/:id/" component={this.compareSchedulePage} />
          }
          {this.state.logged_in && 
          <Route exact path="/coordinate_schedule/" component={this.generateScheduleFriendsPage} />
          }
          {this.state.logged_in && 
          <Route exact path="/coordinate_schedule/:id/" component={this.generateScheduleFriendsPage} />
          }
          <Route exact path="/logout" component={this.handle_logout} />
          {/* <Route exact path="/404" component={MainPage} /> change to 404 page */}
          {this.state.logged_in
          ? <Redirect to="/" />
          : <Redirect to="/login" />
          }
        </Switch>
      </Router>
    );
  }
}
export default App;
