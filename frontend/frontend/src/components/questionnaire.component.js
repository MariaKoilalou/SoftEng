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
class Questionnaire extends Component {

  constructor(props){
    super(props);
    this.state={
        id: props.secondHook.state.id,
        title: props.secondHook.state.title
    }
  }  
  componentDidMount(){
  }
  render() {
    return (
      <div><a>{this.state.title}</a></div>
    );
  }
}

export default withMyHook(Questionnaire);
