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
    console.log(req.params.id)
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
    console.log("HERE", req.params.id)
    Expense.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/expenses')
        })
}

function show(req, res) {
    Expense.findById(req.params.id)
    .then( (Expense)  => {
        res.render('expenses/show', {expense})
    })
}

function create (req, res) {
    console.log(req.user)
    const expense = new Expense(req.body)
    expense.save()
    console.log(req.params.id)
    User.findById(req.params.id, (err, user, expense) => {
        console.log(user, expense)
        user.expenses.push(expense)
        user.save()
        .then(()=> {
        res.redirect(`/expenses`)
        }).catch(err =>{
        console.log(err)
        })
    })
}

function newExpense(req, res) {
    res.render('expenses/new',{
    user: req.user}
    )
}

function index(req, res) {
    Expense.find({}, function(err, expenses){
    res.render('expenses/index', {
    title: "Expenses",
    user: req.user, 
    expenses
})
})
}