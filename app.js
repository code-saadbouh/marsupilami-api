const express = require('express'); 
const app = express();
const connectDB = require('./database/Connection')
const Port = process.env.Port || 3000; 
connectDB();


//IMPORT ROUTES
const MarsupilamiRoute = require('./routes/Marsupilami');
const UserMarsupilamiRoute = require('./routes/Auth');

//MIDDLEWARE
app.use(express.json({extended:false})); 



//ROUTE MIDDLEWARES
app.use('/Marsupilami', MarsupilamiRoute);
app.use('/UserMarsupilami', UserMarsupilamiRoute);


app.get('/', async(req, res) => {
    res.send('Welcome to MARSUPILAMI API')
})

app.listen(Port, () => console.log('Server Started Chief !'));
