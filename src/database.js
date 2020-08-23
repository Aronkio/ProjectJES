const mongoose = require('mongoose');
const config = {
    autoIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

const URI = 'mongodb://localhost/ProjectJes';

mongoose.connect(URI, config)
    .then(db => console.log('DB Conectada'))
    .catch(err => console.error(err));


module.exports = mongoose;