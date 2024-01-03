const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productmodels')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))



mongoose.set("strictQuery",false)


//routes 

app.get('/',(req,res) => {
    res.send('Hello Node API')
})
app.get('/blog',(req,res) => {
    res.send('Hello Node API from blog')
})
app.get('/products',async(req,res) =>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})
app.get('/products/ :id',async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
app.post('/products',async(req,res) =>{
    // console.log(req.body);
    // res.send(req.body)
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
        
    }
})
//update a product 
app.put('/products/:id',async(req,res) => {
    try {
        const{id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        // can not find any product in database
        if(!product){
            return res.status(404).json({message:`can not find any product with ID ${id}`})
        }
        res.status(200).json(product);
        const updatepdatedProduct = await Product.findByID(id);
        res.status(200).json(updatepdatedProduct);
    } catch (error) {
        res.status(500).json({message:error.message})
    }

})
//delete a product 
app.delete('/products/:id',async(req,res) =>{
    try {
        const{id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:`can not find any prouct with ID ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message})
    }

})

mongoose.connect('mongodb+srv://akotoboadi18:asdrf900@cluster0.3x2vz5c.mongodb.net/Hospital?retryWrites=true&w=majority')
.then(() =>{
    console.log('Connected to MongoDB')

  app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
    });
  
}).catch((error) =>{
    console.log(error)

  })