const mongoose = require('mongoose')
const express = require('express')
const Customer = require('./routes/customer')
const Restaurant = require('./routes/cafe')
const cors = require('cors');
const app = express()
mongoose
    .connect('mongodb+srv://ziyan:ziyanjin@cluster0.wtcyk.mongodb.net/CS615?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Database.'))
    .catch(err => console.error('Something went wrong.', err))

app.use(cors({ origin: '*' }));
app.use(express.json())
app.use('/customer', Customer)
app.use('/restaurant', Restaurant)
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Connected To port ' + port))