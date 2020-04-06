import React, {Component} from 'react';
import '../css/BoxInfo.css';

class BoxInfo extends Component {
    constructor(props){
        super(props);
    }
    state = {  
        boxContent: this.props.content,
        id: this.props.id,
        // boxContent: ['Match Preferences','> Earliest Start Time: 9:15 AM', '> earliest End Time: 2:15 PM', '> Break Preferences: 15 minutes', '', 'Unmatched Preferences', '> Professor Bob Uy not included'],
        // courseConflicts: ['> HUMALIT conflicts with with ClassB2', '> KASPIL conflicts with with ClassC3']
    }

    render() { 
        
        return ( 
            <div className="boxinfoContainer" key={this.state.id}>
                {this.state.boxContent.map((pref, index)=>(
                <p key={index + this.state.id}>{pref}</p>
                ))}
            </div>
         );
    }
}
 
export default BoxInfo;