//importing the express
const express=require('express');
//importing the mongoose
const mongoose=require('mongoose');
//importing the cors for cross-origin stablishment
const cors=require('cors');
//use the express and create the app for backend
const app=express();
//importing the models which we create inside the models
const FoodModel=require("./models/Food")
//use the json to provide the data because we already know the data is store in json format
app.use(express.json())
//use the cors here
app.use(cors());
//establish the mongodb connection here
mongoose.connect("mongodb://localhost:27017/fooddata",{
    useNewUrlParser:true,
});

//Insert the data in the database we use post method
//cient side send the req and server respond to it
app.post('/insert',async(req,res)=>{
    //create two variavble here for storing the data comes from frontend side
    const foodName=req.body.foodName;
    const days=req.body.days;
    //pass the values which we store to the models means database
    const food=new FoodModel({
      foodName:foodName,
      days:days,
     
    });
    //use the try catch block to procedd and save the data into the database
    try{
        await food.save();
        res.send("Data inserted");
    }catch(err){
        console.log(err)
    }
  });

//Fetch the data from the database we use get method
app.get('/read',async(req,res)=>{
    //we already know to display the value in the database we use find method
    FoodModel.find().then((data) => {
        res.send(data);
       })
  });

//Server is establish on this port no which was 8001
app.listen(8001,() =>{
    console.log("server is running on 8001");
});
