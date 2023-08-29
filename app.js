const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');
const app = express();
app.use(cors());

const expenseRoutes = require('./routes/expense-routes');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expenseRoutes);


sequelize.sync()
.then((result) => {
    console.log(result);
    app.listen(3000);
})
.catch(err => console.log(err));