import React,{ useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';
const App = () => {
  const[foodName,setFoodName]=useState("")
  const[days,setDays]=useState(0);
  const[foodList,setFoodList]= useState([]);

  useEffect(()=>{
    Axios.get('http://localhost:8001/read').then((response)=>{
      setFoodList(response.data);
    });
  },[]) 

  const addToList= () =>{
    Axios.post('http://localhost:8001/insert',{
      foodName:foodName,
      days:days,
    });
    
  
    
  };
  return (
    <>
    <div className='App' >

       <h1>MERN-CRUD PROJECT</h1>
      <input  className='fd' type="text" placeholder='food name' onChange={(event)=>{ setFoodName(event.target.value)  }}  required></input>
      <br></br><br></br>
      <input className='fd' type="text" placeholder='days since at'
      onChange={(event)=>{
        setDays(event.target.value)
      }}
      required></input>
       <br></br><br></br>
      <button  className='fd'id='bt' onClick={addToList} >submit</button>

      {foodList.map((val,key)=>{
        return(
          <div className='food'>
            <h1>FoodName:{val.foodName}</h1>
            <h1>Days:{val.days}</h1>
            <br /><br />
            <hr />
          </div>
        )
      })}
      
      </div>
    </>
  )
}

export default App
