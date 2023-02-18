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
        title: props.secondHook.state.title,
        question: {}
    }
  }  
  componentDidMount(){
    UserService.getq(this.state.id).then(
      respose =>{
        this.setState({
          id: respose.data.questionnaireID,
          title: respose.data.questionnaireTitle,
          question: respose.data.questions[0]
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
    var x ;
    const toQuestion=(qid,sid)=>{
      this.props.myHookValue("/intelliq_api/session/"+sid,{state:{qid: qid, sid:sid, question: this.state.question }});
    }
    const toSession=(id)=>{
        UserService.postSession(id).then(
            respose =>{
                console.log(respose.data);
                x=respose.data;
                toQuestion(id,x);
            }
        )
      }
      const toStats=(id)=>{
        this.props.myHookValue("/intelliq_api/stats/"+id,{state:{id: id,title: this.state.title}});
      }
    return (
        // <div><button type="button" class="btn btn-primary">Start Questionnaire</button></div>
       <div> 
      <div class ="center"><button type="button" class="btn btn-primary" onClick={()=>{toSession(this.state.id)}}>Start Questionnaire</button></div>
      <div class ="center1"><button type="button" class="btn btn-primary" onClick={()=>{toStats(this.state.id)}}>See stats</button></div>
      </div>
    );
  }
}

export default withMyHook(Questionnaire);
