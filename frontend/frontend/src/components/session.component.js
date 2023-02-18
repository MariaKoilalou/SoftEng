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
class Session extends Component {

  constructor(props){
    super(props);
    this.state={
        qid: props.secondHook.state.qid,
        sid: props.secondHook.state.sid,
        question: props.secondHook.state.question,
        options: [{OptText: "WAITING"},{OptText: "WAITING"},{OptText: "WAITING"}]
    }
  }  
  componentDidMount(){
    UserService.getOptions(this.state.qid, this.state.question.Question_id).then(
        respose =>{
          this.setState({
            options: respose.data.options
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
    console.log(this.state.question);
    const optionClicked = (option) => {
        if(option.NextQuestion_id=="-"){
            UserService.postAnswer(this.state.qid,this.state.question.Question_id,this.state.sid,option.Option_id).then(
                this.props.myHookValue("/intelliq_api/")
            )    
        }
        else{UserService.postAnswer(this.state.qid,this.state.question.Question_id,this.state.sid,option.Option_id).then(
            UserService.getQuestion(this.state.qid,option.NextQuestion_id).then(
                respose =>{
                    this.setState({
                        question: {Question_id: respose.data.Question_id, Text: respose.data.Text},
                        options: respose.data.options
                    })
                }
            )
        )}
      };
    return (
    <div>
    {/* 3. Show results or show the question game  */}
    { (
      /* 5. Question Card  */
      <div className="question-card">
        {/* Current Question  */}
        <h3 className="question-text">{this.state.question.Text}</h3>

        {/* List of possible answers  */}
        <ul>
          {this.state.options.map((option) => {
            return (
              <li
                key={option.Option_id}
                onClick={() => optionClicked(option)}
              >
                {option.OptText}
              </li>
            );
          })}
        </ul>
      </div>
    )}
  </div>
    );
  }
}

export default withMyHook(Session);
