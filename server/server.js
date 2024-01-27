const express=require("express");
const app= express();

const cors = require("cors");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");

app.use(cors());
app.use(bodyparser.json());

//db start

//connect to mongodb

mongoose.connect("mongodb://0.0.0.0:27017/MongoDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

//to db connected

const db =mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Connected to mongodb"));

//create schema for collection

const crudSchema= new mongoose.Schema({
    userName:String,
    password:String,
    email:String,
    phonenumber:Number
});

const CrudModel =mongoose.model("crud_table_backend", crudSchema);

app.get("/get-all", async (req,res)=>{
    const data =await CrudModel.find();
    res.send(data);
});
app.post("/register", async (req,res)=>{
    const {userName, password, email, phonenumber} =req.body;
    console.log(req.body);
    const post_data = new CrudModel({
        userName,
        password,
        email,
        phonenumber
    });

    await post_data.save();
    res.send("Data posted" + post_data);
});

app.post("/signin", async (req, res)=>{
    const {userName, password} =req.body;
    const user= await CrudModel.findOne({userName});
    if(!user) {
        return res.status(401).json({error:"Invalid username"});
    }
    if(password !== user.password) {
        return res.status(401).json({error:"Invalid password"});
    }
     res.json({message:"Authentication succesfull"});
});

app.get("/:id", async (req,res)=>{
    const id = req.params.id;
    try{
        const find_one= await CrudModel.findById(id);
        res.send(find_one);
    }catch (err) {
        res.send(err);
    }
});

app.put("/update/:id",async (req,res)=>{
    const id =req.params.id;
    const {userName,email,phonenumber,password} = req.body;
    try{
        await CrudModel.findByIdAndUpdate(id, {userName,email,phonenumber});
        res.send("Data updated" );
    }catch (err) {
        res.send(err);
    }
});

app.delete("/delete/:id",async (req,res)=>{
    const id =req.params.id;
    console.log(id);
    try{
        await CrudModel.findByIdAndDelete(id);
        res.send("Data updated");
    }catch (err) {
        res.send(err);
    }
});

const PORT = 6060;
app.listen(PORT, () =>{
    console.log(`Server listening at the PORT: ${PORT}`);
})

