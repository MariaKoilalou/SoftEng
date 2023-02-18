import React, { Component } from "react";

import {Routes, Route, BrowserRouter, Link, useNavigate, useLocation} from 'react-router-dom';

import UserService from "../services/user.service";

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const myHookValue = useNavigate();
    const secondHook = useLocation();
    return <Component myHookValue={myHookValue} secondHook={secondHook} />;
  }
}

class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      id: props.secondHook.state.id,
      title: props.secondHook.state.title,
      nums: 0
  }
  }

  componentDidMount(){

    UserService.getSessionNum(this.state.id).then(
      respose =>{
        this.setState({
          nums: respose.data.sessionCount
        });
      },
      error =>{
        this.setState({
          content:
            (error.response && error.response.data )||
              error.message || error.toString()

        });
      }
    );
  }
  render() {
    console.log(this.state.nums);
    return (
      <div>
        <div class ="center"><button type="button" class="btn btn-primary" >The questionnaire has been answered {this.state.nums} times</button></div>
      </div>
    );
  }
}

export default withMyHook(Home);