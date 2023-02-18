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

    this.state = {
      content: [{Questionnaire_id: -1,Title: "Yolo"}]
    };
  }

  componentDidMount(){

    const deleteFirst=(d)=>{
      var x = d.shift();
      return d;
    }
    UserService.getQuestionnaire().then(
      respose =>{
        this.setState({
          content: deleteFirst(respose.data)
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
  table(){
    const toQuestionnaire=(id,title,question)=>{
      this.props.myHookValue("/intelliq_api/questionnaire/"+id,{state:{id:id,title:title}});
    }
    return (
      <table class='table table-bordered table-condensed table-striped table-hover'>
        <thead>
          <td><h4><b>Questionnaire id</b></h4></td>
          <td><h4><b>Questionnaire title</b></h4></td>
        </thead>
        <tbody>
          {this.state.content.map((d) =>{
            return (
              <tr class="table-row" onClick={()=>{toQuestionnaire(d.Questionnaire_id,d.Title)}}>
                <td><a>{d.Questionnaire_id}</a></td>
                <td>{d.Title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  render() {
    return (
      <div>{this.table()}</div>
    );
  }
}

export default withMyHook(Home);
