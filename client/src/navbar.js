import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import auth from './firebase';

function Navbar() {
  const [user, setUser] = useState(null);

useEffect(() =>{
  const unsubscribe = auth.onAuthStateChanged(userAuth =>{
    if(userAuth){
      console.log(userAuth);
      setUser({uid: userAuth?.uid, email: userAuth?.email});
    } else {
      setUser(null);
    }
  })
  return unsubscribe
},[])

    return (
  (user ? 
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#/">BadBank</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
          <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#/account/">Account</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/deposit/">Deposit</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/withdraw/">Withdraw</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/balance/">Balance</a>
            </li>
          </ul>
        </div>
        <p>{user.email}</p>
      </div>
</nav> :
<nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#/">BadBank</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
          <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#/account/">Account</a>
            </li>
          </ul>
        </div>
      </div>
</nav>)
    );
  }
  
  export default Navbar;
  