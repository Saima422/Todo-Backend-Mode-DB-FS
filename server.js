const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require('./app');

switch(process.env.OPERATION_MODE){
    case "database":
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true})
            .then((con)=>{
                console.log('Connected to database');
        
                const port = process.env.PORT || 3000; 
        
                app.listen(port, ()=>{
                    console.log(`Server Started on port ${port}`);
                });
            }).catch((error)=>{
                console.log('Error in connecting to database', error);
            })
        break;
    
    case "file":
        const port = process.env.PORT || 3000; 
        app.listen(port, ()=>{
            console.log(`Server Started on port ${port}`);
        });
        break;
}
