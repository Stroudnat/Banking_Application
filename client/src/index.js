import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import Navbar from './navbar';
import Home from './home';
import Account from './account';
import Deposit from './deposit';
import Withdraw from './withdraw';
import Balance from './balance';

function SinglePageApp() {

  return (
    <HashRouter>
      <div id='container'>
        <Navbar/>
        <Route path="/" exact component={Home}/>
        <Route path="/account/" component={Account}/>
        <Route path="/deposit/" component={Deposit}/>
        <Route path="/withdraw/" component={Withdraw}/>
        <Route path="/balance/" component={Balance}/>
      </div>
    </HashRouter>
  );
}




ReactDOM.render(
  <React.StrictMode>
    <SinglePageApp />
  </React.StrictMode>,
  document.getElementById('root')
);
