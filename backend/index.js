const express= require('express');
const app=express();
const bodyParser=require('body-parser');
const cors =require('cors');
const AuthRouter=require('./Routes/AuthRouter');
const ProductRouter=require('./Routes/ProductRouter');
require('dotenv').config();
require('./Models/db')
const PORT=process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);
app.get('/ping',(req,res)=>{
    res.send('pong')
})


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})