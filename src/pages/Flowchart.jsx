import React, { Component } from "react";
import '../css/Flowchart.css';
import SidebarIMG from '../images/Login.svg';
import Menu from '../components/Menu.jsx';

class Flowchart extends Component {
    constructor(props){
      super(props);
    }
    render() {
      return (
        <div>
            {this.props.menu()}

            <div class="sidemenu">
                <center><input type="submit" class="btn btn-success change-flowchart" value="ID Number, Course" /></center>
                <center><input type="submit" class="btn btn-success change-flowchart" value="ID Number, Course" /></center>
                <center><input type="submit" class="btn btn-success change-flowchart" value="ID Number, Course" /></center>
            </div>

            <div class="sidemenu-main">

                <center><h2>TITLE</h2></center>

                <div>
                    INSERT FLOWCHART HERE
                </div>
            </div>
        </div>        
      );
    }
  }
  export default Flowchart;