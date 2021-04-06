const Expense = require('../models/expense')
const User = require('../models/user')

module.exports = {
    index,
    new: newExpense,
    create,
    show,
    update,
    delete: deleteExpense,
    edit,
}

function edit(req, res) {
    Expense.findByIdAndUpdate(req.params.id, req.body)
    .then( expense => 
        res.redirect(`/expenses`)
    )
}

function update(req,res) {
    Expense.findById(req.params.id)
    .then( expense => {
        res.render('expenses/update', { 
        title: 'Update Expense', 
        expense,
        user: req.user
        })
    })
}

function deleteExpense(req, res) {
    Expense.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/expenses')
        })
}

function show(req, res) {
    Expense.findById(req.params.id)
    .then( (expense)  => {
        res.render('expenses/show', {expense})
    })
}

function create (req, res) {
    Expense.create(req.body)
    .then(expense => {
        req.user.expenses.push(expense._id)
        req.user.save()
        .then(() => {
            res.redirect('/expenses')
        })
    })
}

function newExpense(req, res) {
    res.render('expenses/new',{
    user: req.user}
    )
}

function index(req, res) {
    User.findById(req.user._id)
    .populate('expenses')
    .populate('incomes')
    .then(user => {
        res.render('expenses/index', {
            title: "Expenses",
            user, 
            expenses: user.expenses,
        })  
    })
}