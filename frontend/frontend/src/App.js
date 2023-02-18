import logo from './logo.svg';
import React from 'react';
import UserService from "./services/user.service";
import './App.css';
import Home from "./components/home.component";
import 'bootstrap/dist/css/bootstrap.css';
import Questionnaire from "./components/questionnaire.component";
import Session from "./components/session.component";
import Create from "./components/create.component";
import Stats from "./components/stats.component";
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
          <Link to={"/intelliq_api/"} className="navbar-brand">
            IntelliQ
          </Link>
        </nav>
      <Routes>
        <Route path="/intelliq_api" element={<Home />}/>
        <Route path="/intelliq_api/questionnaire/:id" element={<Questionnaire/>} />
        <Route path="/intelliq_api/session/:id" element={<Session/>} />
        <Route path="/intelliq_api/create" element={<Create/>}/>
        <Route path="intelliq_api/stats/:id" element={<Stats/>}/>
      </Routes>
    </BrowserRouter>
      </div>
    );
  }
}

export default App;
