const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const project = require('./routes/projects')


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

if (!config.get('myPrivateKey')) {
    console.error('FATAL ERROR: myPrivateKey is not defined');
    process.exit(1);
};

app.use((req, res, next) => {
    console.log('use for mongoose callback');
    if (mongoose.connection.readyState) {
        next();
    } else {
        require('./mongo')().then(() => next());
    }
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true )

app.use(express.json());
app.use('/', project);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));