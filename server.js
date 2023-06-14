const express= require('express');
const app= express();
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
const request = require("request");

const https= require('https');
const { response } = require('express');

app.use(express.static("Public"));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post('/',(req,res)=>{
    console.log("hello");
})

app.get('/contact.html',(req,res)=>{
    res.sendFile(__dirname+"/contact.html");
})

app.post('/contact.html',(req,res)=>{
    const fname= req.body.fname;
    const lname= req.body.lname;
    const email= req.body.email;
    //console.log(fname+lname+email);
    if(!fname || !lname || !email)
    {
        res.sendFile(__dirname+"/failure.html");
    }
    const data ={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                }
            }
            
           

        ]
    }
    const jsonData=JSON.stringify(data);
    const url ="https://us10.api.mailchimp.com/3.0/lists/bb9ebdbe83";
    const options={
        method:"POST",
        auth:"shaan:415cf92111c20b47d8e1cad309d5099d-us10"
    }

  const request=  https.request(url,options,(response)=>{
       response.on("data",(data)=>{
           const statusCode=response.statusCode;
           if(statusCode===200)
           res.sendFile(__dirname+"/success.html");
           else
           res.sendFile(__dirname+"/failure.html");
       })
       
    })
    request.write(jsonData);
    request.end();

 // res.redirect("/");
})
app.post("/again",(req,res)=>{
    res.redirect('/contact.html');
})
app.post("/Home",(req,res)=>{
    res.redirect('/');
})
app.listen(process.env.PORT || 3000 , ()=>{
    console.log("server started at port 3000");
})




// api key =415cf92111c20b47d8e1cad309d5099d-us10
    // list id=bb9ebdbe83