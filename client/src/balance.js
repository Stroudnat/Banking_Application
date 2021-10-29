import { useEffect, useState } from "react";
import Card from "./card";

function Balance() {
  const [data, setData] = useState('');
  var cardList= [];

  useEffect(()=>{ //only runs once when page is loaded
    //fetch accounts from API
    fetch('/account/all')
      .then(response => response.json())
      .then(data =>{
        console.log(data);
        setData(JSON.stringify(data));
      });
  }, []);
  
    return (
      <Card 
      bgcolor="primary" 
      margin='auto' 
      header="All Data for Users" 
      body={data}/> 
    );
  }
  
  export default Balance;
  