const Income = require('../models/expense')
const User = require('../models/user')

module.exports = {
    index,
    new: newIncome,
    create,
    show,
    update,
    delete: deleteIncome,
    edit,
}

function edit(req, res) {
    console.log(req.params.id)
    Income.findByIdAndUpdate(req.params.id, req.body)
    .then( income => 
        res.redirect(`/incomes`)
    )
}

function update(req,res) {
    Income.findById(req.params.id)
    .then( incomes => {
        res.render('incomess/update', { 
        title: 'Update Income', 
        income,
        user: req.user
        })
    })
}

function deleteIncome(req, res) {
    console.log("HERE", req.params.id)
    Income.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/incomes')
        })
}

function show(req, res) {
    Income.findById(req.params.id)
    .then( (income)  => {
        res.render('incomes/show', {income})
    })
}

function create (req, res) {
    Income.create(req.body)
    .then(income => {
        req.user.incomes.push(income._id)
        req.user.save()
        .then(() => {
            res.redirect('/incomes')
        })
    })
}

function newIncome(req, res) {
    res.render('incomes/new',{
    user: req.user}
    )
}

function index(req, res) {
    User.findById(req.user._id)
    .populate('incomes')
    .then(user => {
        res.render('incomes/index', {
            title: "Incomess",
            user, 
            incomes: user.incomes,
        })  
    })
}