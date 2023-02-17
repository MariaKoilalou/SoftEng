import logo from './logo.svg';
import React from 'react';
import UserService from "./services/user.service";
import './App.css';
import Home from "./components/home.component";
import 'bootstrap/dist/css/bootstrap.css';
import Questionnaire from "./components/questionnaire.component";
import {Routes, Route, BrowserRouter, Link, useNavigate} from 'react-router-dom';


class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      content: [{Questionnaire_id: -1,Title: "Yolo"}]
    };
  }



  render(){
    return (
      <div>
        <BrowserRouter>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            IntelliQ
          </Link>
        </nav>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/questionnaire/:id" element={<Questionnaire/>} />
      </Routes>
    </BrowserRouter>
      </div>
    );
  }
}

export default App;
