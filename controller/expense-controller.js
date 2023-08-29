const Expense = require('../models/expense-data');

exports.createExpense = (req,res,next) => {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    Expense.create({
        amount:amount,
        description:description,
        category:category
    })
    .then((result) => {
        console.log('Data created Successfully');
        res.json({message:'User Created Successfuly',data: result});
    })
    .catch(err => console.log(err));
};

exports.getAllExpense = (req,res,next) => {
    Expense.findAll()
    .then(expenses => {
        res.json(expenses);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message:'Error creating expense'});
    })
};

exports.deleteExpense = (req,res,next) => {
    const expenseId = req.params.id;
    Expense.findByPk(expenseId)
    .then(expense => {
        if(!expense){
           return res.json({message:'expense not found'});
        }

        return expense.destroy();
    })
    .then(result => {
        console.log('Expense deleted Successfully');
    })
    .catch(err => console.log("Error deleting Expense")); 
}