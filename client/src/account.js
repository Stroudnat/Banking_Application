import Card from './card';
import {useState} from 'react';
import auth from './firebase';
import './account.css'

function Account() {
const [user, setUser]                       = useState(null);
const [status, setStatus]                   = useState('');
const [isUser, setIsUser]                   = useState(false);
const [newUser, setNewUser]                 = useState(false);
const [submittedCreate, setSubmittedCreate] = useState(false);
const [submittedLogin, setSubmittedLogin]   = useState(false);

    return (
      <Card
      bgcolor="primary"
      textcolor="white"
      header="Account Info"
      title="Welcome Users"
      margin= "auto"
      setStatus={setStatus}
      status= {status}
      isUser={isUser}
      body= { isUser ?
      (newUser ? (submittedCreate ? <CreateMessage setSubmittedCreate={setSubmittedCreate}/> :<FormCreate setIsUser={setIsUser} setSubmittedLogin={setSubmittedLogin} setSubmittedCreate={setSubmittedCreate} setNewUser={setNewUser} setStatus={setStatus}/>) : 
      (submittedLogin ? <LoginMessage setUser={setUser} setNewUser={setNewUser} setSubmittedLogin={setSubmittedLogin}/> : <FormLogin setNewUser={setNewUser} setSubmittedLogin={setSubmittedLogin} setUser={setUser} setStatus={setStatus}/>)) :
      <Choice setNewUser={setNewUser} setIsUser={setIsUser}/>
      }
      
      />
    );
}

function Choice(props){

  const logout = ()=>{
    auth.signOut()
      .then(res => console.log('Logout Response: ', res))
      .catch((e) => console.warn(e.message));
  };

  return(
    <Card
    bgcolor='light'
    textcolor ='dark'
    header= 'Create or Loggin to Account'
    body={<>
    <Card
    header = {<h5 style={{color: 'black'}}>Create Account</h5>}
    body={
    <p id='create' className="h6">Not yet a user? click <a id="notUser" onClick={e =>{
      props.setIsUser(true);
      props.setNewUser(true);
    }}>here</a> to sign up</p>}
    />
    <Card
    header = {<h5 style={{color: 'black'}}>Login</h5>}
    body={
      <p id='login' className="h6" >Have an existing account? Click <a id="user" onClick={e =>{
        props.setIsUser(true);
        props.setNewUser(false);
      }}>here</a> to login</p>}
      />
    <button className="btn btn-secondary" id='signOut' onClick={logout}>Log Out</button>

    </>}
    />
  )
}

function FormLogin(props){
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event)=>{
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then(user =>{
        console.log(user.email);
        props.setUser(user);
        props.setSubmittedLogin(true);
      }).catch(err =>{
        console.log(err);
      });
      props.setStatus('Sign In Succsessful!');
  };

  const logout = ()=>{
    auth.signOut()
      .then(res =>{
        console.log('Logout Response: ', res);
        props.setStatus('');
      })
      .catch((e) => console.warn(e.message));
  };
  

return(
  <>
  Email<br/>
  <input 
  type='text' 
  onInput={e => setEmail(e.currentTarget.value)} 
  className="form-control" 
  value={email} 
  placeholder="Email Account"/><br/>
  Password<br/>
  <input 
  type="password" 
  onInput={e => setPassword(e.currentTarget.value)} 
  className="form-control" 
  value={password} 
  placeholder="Password"/><br/><br/>
  <button 
  type='button' 
  className='btn btn-light' 
  onClick={handleLogin}
  style={{marginRight:'3px'}}>SignIn</button>
  <button 
  type='button' 
  className='btn btn-light' 
  onClick={logout}
  style={{marginLeft:'3px'}}>Log Out</button>
  </>
)
}

function LoginMessage(props){
  return(
    <>
    <Card
    header= {<h5 style={{color: 'black'}}>Account Logged In</h5>}
    body= { 
    <>
    <h5 id="loginSuccess">Succsess!</h5> 
    <button className='btn btn-secondary' onClick={e =>{
      props.setUser(true);
      props.setNewUser(true);
      props.setSubmittedLogin(false);
    }}>Create Another Account/Go Back</button>
    </>}
    />
    </>
  )
}

function FormCreate(props){
  //name is set but not used, will have to set context maybe to share across app

  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [name, setName]               = useState(''); //change: dont need
  
  const handleCreate = (event)=>{
    // event.preventDefault();
    console.log(name, email, password);
    const url = `/account/create/${name}/${email}/${password}`;

    (async ()=> {
      var res = await fetch(url);
      var data = await res.json;
      console.log(data);
    })();

    auth.createUserWithEmailAndPassword(email, password)
      .then(user =>{
        console.log(user);
      }).catch(err =>{
        console.log(err);
      });

      props.setStatus('Account Created and Logged In!');
      props.setSubmittedCreate(true);
      setEmail('');
      setPassword('');
      setName('');
  };

  const logout = ()=>{
    auth.signOut()
      .then(res =>{
        console.log('Logout Response: ', res);
        props.setStatus('');
      })
      .catch((e) => console.warn(e.message));
  };
  
  return(
    <>
  Name<br/>
  <input 
  type='text' 
  onInput={e => setName(e.currentTarget.value)} 
  className="form-control" 
  value={name} 
  placeholder="John Doe"/><br/>
  Email<br/>
  <input 
  type='text' 
  onInput={e => setEmail(e.currentTarget.value)} 
  className="form-control" 
  value={email} 
  placeholder="Email Account"/><br/>
  Password<br/>
  <input 
  type="password" 
  onInput={e => setPassword(e.currentTarget.value)} 
  className="form-control" 
  value={password} 
  placeholder="Password"/><br/><br/>
  <button 
  type='button' 
  className='btn btn-light' 
  onClick={handleCreate}
  style={{marginRight:'3px'}}>Create Account</button>
  <button 
  type='button' 
  className='btn btn-light' 
  onClick={logout}
  style={{marginLeft:'3px'}}>Log Out</button><br/>
  <a id='createTag' onClick={e=>{
    props.setSubmittedLogin(false);
    props.setIsUser(true);
    props.setNewUser(false);
  }}>(Login Page)</a>

  
    </>
  )

}

function CreateMessage(props){
  return(
    <>
    <Card
    header= {<h5 style={{color: 'black'}}>Account Created</h5>}
    body= { 
    <>
    <h5 id="loginSuccess">Succsess!</h5> 
    <button className='btn btn-secondary' onClick={e => props.setSubmittedCreate(false)}>Back</button>
    </>}
    />
    </>
  )
}
  
  export default Account;