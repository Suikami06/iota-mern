const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 5001;

app.get('/demotest',(req,res)=>{
    res.send('Hello World')
})




mongoose.connect("mongodb+srv://Souvik06:Suikami%4005@cluster0.zjtsxqk.mongodb.net/iota_mern");
const db = mongoose.connection;

app.use(express.json());

db.once('open',()=>{
    console.log("db connection successful");
})

db.on('err',()=>{

    console.log("error connecting database", err);
})

const dataschema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    phone : {
        type : Number,
        required : true
    }
});

const data = mongoose.model('data',dataschema);

app.post('/insert',(req,res)=>{
    const newData = new data({

        name : req.body.name,
        email : req.body.email,
        age : req.body.age,
        phone : req.body.phone,
    });

    newData.save().then(data=>{console.log("data inserted successfully");
        res.send(201).json(data);
    })
    .catch(err=>{
        console.error("error occurde",err);
        res.send(500).send("internal server error");
    });
});

app.get('/fetch',(req,res)=>{
    data.find({})
    .then(data1=>{
        res.json(data1);
    })
    .catch(err=>{
        console.log("error occured",err);
        res.status(500).send("internal server error");
    });
});


app.delete('/delete/:name',(req,res)=>{
    data.findOneAndDelete({name:req.params.name})
    .then(data1=>{

        if(!data1)
        {
            return res.send(404).send("data not found");

        }

        console.log("data deleted succesfully",data1)
        res.send(200).json("data deleted succesfully",data1);

    })
    .catch(err=>{
        console.error("error",err);
        res.send(500).json("internal server error");
    });
})



app.listen(port,()=>{
    console.log(`app is running on port ${port}`);
})