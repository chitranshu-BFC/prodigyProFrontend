import React, {component} from 'react';
import $ from 'jquery';
import { Link,Redirect,withRouter   } from 'react-router-dom';

class Logout extends React.Component{

    constructor(props) {
        super(props);
       
        localStorage.clear();
        // history.push("/");
        // this.props.history.push("/");
        console.log("Logout");
        return false;

    }

    

    render(){
        return <Redirect to='/prodigypro/' />
        // window.location = 'http://localhost:3000/';
        
    }
}
export default Logout



