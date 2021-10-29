import React, {useState} from 'react';
import Card from './card'

function Deposit(){
  const [show, setShow]     = useState(true);
  const [status, setStatus] = useState('');
  const [user, setUser]     = useState('');

  

  return(
      <Card 
      bgcolor= "primary"
      margin= "auto"
      header= "Deposit"
      status= {status}
      body= {show ?
          <AddMoney setShow={setShow} setStatus={setStatus}/> : 
          <Success setShow={setShow} setStatus={setStatus}/>
      }
      />
  );
}

function Success(props){
  return(
      <>
          <h1 className="display-6">Success</h1><br/>
          <button type="submit" className="btn btn-light" onClick={()=> props.setShow(true)}>Deposit more money</button> 
      </>
      

  )
}

function AddMoney(props){
  const [disabled, setDisabled] = useState(false);
  const [amount, setAmount]   = useState('');
  const [email, setEmail]       = useState('');
  

  const handle = ()=>{
    fetch(`/account/update/${email}/${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(JSON.stringify(data.value));
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
        }
    });

  };
  return(
      <>
        <p className="h3">Email</p>
        <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
        
        <p className="h3">Deposit Amount</p>
        <input className="form-control" 
        type="number" 
        value={amount} 
        placeholder="Add Money"
        onChange={e => {
            setAmount(e.currentTarget.value)
            if(Number(e.currentTarget.value) <= 0){
                setDisabled(true);
                props.setStatus('If you want to withdraw money go to withdraw page');
            } else {
                props.setStatus('');
                setDisabled(false);
            }
        }} /><br/>
        <button type="submit" disabled={disabled} className="btn btn-light" onClick={handle}>Deposit</button>
      </>
  );
}
  
  export default Deposit;
  