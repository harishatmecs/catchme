import React from 'react';
import styles from './App.module.scss';
import Header from '../Header/Header'
import Home from '../Home/Home'

function App() {
  return (
    <div className={styles.App}>
    <Header />
    <Home/> 
      
 
  </div>
  );
}

export default App;
