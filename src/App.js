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
  apiKey=process.env.REACT_APP_API_KEY;
  render() {
    return (
      <>
        <BrowserRouter>
            <Navbar/>
          <Routes>
            <Route exact path="/" element={<News key='/' country='in' pageSize={6} apiKey={this.apiKey} category='general'/>}/>
            <Route exact path="/business" element={<News key='business' country='in' pageSize={6} apiKey={this.apiKey} category='business'/>}/>
            <Route exact path="/entertainment" element={<News key='entertainment' country='in' pageSize={6} apiKey={this.apiKey} category='entertainment'/>}/>
            <Route exact path="/health" element={<News key='health' country='in' pageSize={6} apiKey={this.apiKey} category='health'/>}/>
            <Route exact path="/science" element={<News key='science' country='in' pageSize={6} apiKey={this.apiKey} category='science'/>}/>
            <Route exact path="/technology" element={<News key='technology' country='in' pageSize={6} apiKey={this.apiKey} category='technology'/>}/>
            <Route exact path="/saved-news" element={<SavedNews/>}/>
            <Route exact path="/signup" element={<SignUp/>}/>
            <Route exact path="/login" element={<Login/>}/>
          </Routes>
        </BrowserRouter>
        
      </>
    )
  }
}

