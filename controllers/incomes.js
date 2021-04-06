const Income = require('../models/income')
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
    Income.findByIdAndUpdate(req.params.id, req.body)
    .then( income => 
        res.redirect(`/incomes`)
    )
}

function update(req,res) {
    Income.findById(req.params.id)
    .then( income => {
        res.render('incomes/update', { 
        title: 'Update Income', 
        income,
        user: req.user
        })
    })
}

function deleteIncome(req, res) {
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
    .populate('expenses')
    .then(user => {
        let monthlyChange = 0
        user.incomes.forEach(i => {switch(i.timePeriod) {
            case 'weekly':
              monthlyChange += 4 * i.amount
              break;
            case 'biweekly':
              monthlyChange += 2 * i.amount
              break;
            case 'monthly':
              monthlyChange += i.amount
              break;
          }})
        res.render('incomes/index', {
            title: "Incomes",
            user, 
            incomes: user.incomes,
        })  
    })
}