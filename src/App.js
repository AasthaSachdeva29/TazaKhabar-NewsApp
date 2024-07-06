
import './App.css';


import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  
  Route,
  Routes,
 
  
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
   apiKey='86a2d27d01fc410f9d9f0151fd3664ee'
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
   render(){
    return (
      <div>
          <Router>
          <NavBar/>
          <LoadingBar
          height={3}
        color='#f11946'
        progress={this.state.progress}
       
      />
          <Routes>
          <Route exact path="/business" element={  <News apiKey={this.apiKey} setProgress={this.setProgress} key="business" pageSize={20} category='business'/>}></Route>
          <Route exact path="/entertainment" element={  <News apiKey={this.apiKey} setProgress={this.setProgress} key="entertainment" pageSize={20} category='entertainment'/>}></Route>
          <Route exact path="/" element={  <News apiKey={this.apiKey} setProgress={this.setProgress} key="general" pageSize={20} category='general'/>}></Route>
          <Route exact path="/health" element={  <News apiKey={this.apiKey} setProgress={this.setProgress} key="health" pageSize={20} category='health'/>}></Route>
          <Route exact path="/science" element={  <News apiKey={this.apiKey} setProgress={this.setProgress}  key="science" pageSize={20} category='science'/>}></Route>
          <Route exact path="/sports" element={  <News apiKey={this.apiKey} setProgress={this.setProgress} key="sports" pageSize={20} category='sports'/>}></Route>
          <Route exact path="/technology" element={  <News apiKey={this.apiKey} setProgress={this.setProgress} key="technology" pageSize={20} category='technology'/>}></Route>
          </Routes>
          
        
          
          </Router>
      </div>
    )
  }
}



