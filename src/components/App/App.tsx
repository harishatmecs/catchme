import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from './App.module.scss';
import Header from '../Header/Header'
import Home from '../Home/Home'
import Services from '../Services/Services'
import About from '../About/About'
import Contact from '../Contact/Contact'

interface IProps {}
interface IState {
 }

class App extends PureComponent<IProps, IState> {
  public state: IState = {
 	}
  render() {
 
    return (
      <>
        <Router>

          <div>
          <Header />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/services" component={Services} /> 
              <Route path="/about" component={About} /> 
              <Route path="/contact" component={Contact} /> 
            </Switch>
          </div>
        </Router>
      </>
    );
    
  }
 
}

export default App;