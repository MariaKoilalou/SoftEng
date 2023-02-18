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

class Create extends Component {
  constructor(props){
    super(props);

    this.state = {
      content: [{Questionnaire_id: -1,Title: "Yolo"}]
    };
  }

  componentDidMount(){
  }

  render() {
    return (
      <div><a>ENTER TITLE</a></div>
    );
  }
}

export default withMyHook(Create);
