import React, {useState} from 'react'
import Card from './card';

function Withdraw(){
  const [show, setShow]     = useState(true);
  const [status, setStatus] = useState('');
  return(
      <Card 
      bgcolor= "primary"
      margin= "auto"
      header= "Withdraw"
      status= {status}
      body= {show ?
        <TakeMoney setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}  
      />
  );
}

function WithdrawMsg(props) { //props come from Withdraw
  return(
      <>
          <h1 className="display-6">Success</h1>
          <button type="submit" className="btn btn-light" onClick={()=> props.setShow(true)}>Take More Money Out</button>
      </>
  )
}

function TakeMoney(props){
  const [disabled, setDisabled] = useState(false);
  const [amount, setAmount] = useState('');
  const [email, setEmail]       = useState('');
  
  const handle = () => {
    fetch(`/account/update/${email}/-${amount}`)
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
          value={email} 
          onChange={e => setEmail(e.currentTarget.value)}/><br/>
          
          <p className="h3">Withdraw</p>
          <input className="form-control" 
          type="number" 
          value={amount} 
          placeholder="Withdraw Amount"
          onChange={e=> {
              setAmount(e.currentTarget.value);
              if(Number(e.currentTarget.value)<= 0){
                  setDisabled(true);
                  props.setStatus("If you want to add money, go to deposit");
              } else {
                  setDisabled(false);
                  props.setStatus("");
              }
          }} /><br/>
          
          <button type="submit" disabled={disabled} className="btn btn-light" onClick={handle}>Withdraw</button>
      </>
  );
}
  
  export default Withdraw;
  