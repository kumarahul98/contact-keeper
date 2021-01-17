const express = require('express');
const app = express();
const connectDB = require('./config/db');

connectDB();

// Init Middleware
app.use(express.json({extended: false}));

//Get operation
app.get('/',(req,res)=> res.jsonp({msg: 'welcome to contact keeper'}));


//Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));
const PORT= process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));