// *****************************
// @author - Prathamesh Patil  **
// ****************************

import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import SignUp from './components/SignUp';
import Login from './components/Login';
import SavedNews from './components/SavedNews';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {

  updateCountry(){
    window.location.pathname="/";
  }

  apiKey=process.env.REACT_APP_API_KEY;
  render() {
    
    //LOADING THE COUNTRY IN LOCALSTORAGE IF IT'S NOT ALREADY THERE
    if(!localStorage.getItem("country")){
      localStorage.setItem("country","in");
    }
    return (
      <>
        <BrowserRouter>
            <Navbar updateCountry={this.updateCountry}/>
          <Routes>
            <Route exact path="/" element={<News key='/' pageSize={6} apiKey={this.apiKey} category='general'/>}/>
            <Route exact path="/business" element={<News key='business' pageSize={6} apiKey={this.apiKey} category='business'/>}/>
            <Route exact path="/entertainment" element={<News key='entertainment' pageSize={6} apiKey={this.apiKey} category='entertainment'/>}/>
            <Route exact path="/health" element={<News key='health' pageSize={6} apiKey={this.apiKey} category='health'/>}/>
            <Route exact path="/science" element={<News key='science' pageSize={6} apiKey={this.apiKey} category='science'/>}/>
            <Route exact path="/technology" element={<News key='technology' pageSize={6} apiKey={this.apiKey} category='technology'/>}/>
            <Route exact path="/saved-news" key={'saved-news'} element={<SavedNews/>}/>
            <Route exact path="/signup" key={'signup'} element={<SignUp/>}/>
            <Route exact path="/login" key={'login'} element={<Login/>}/>
          </Routes>
        </BrowserRouter>
        
      </>
    )
  }
}

