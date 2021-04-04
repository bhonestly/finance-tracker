const income = require('../models/income')
const User = require('../models/user')

module.exports = {
    index,
    new: newIncome,
    create,
    show,
    update,
    delete: deleteIncome,

}

function deleteIncome(req, res) {
    Income.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/income')
        })
}

function update(req, res) {
    req.body.done = !!req.body.done
    Expense.findByIdAndUpdate(req.params.id,req.body)
    .then(Income => {
        res.redirect('/incomes')
    })
}

function show(req, res) {
    Expense.findById(req.params.id)
    .then( (Income)  => {
        res.render('incomes/show', {income})
    })
}

function create (req, res) {
    console.log(req.user)
    const income = new Income(req.body)
    income.save()
    console.log(req.params.id)
    User.findById(req.params.id, (err, user, income) => {
        console.log(user, income)
      user.incomes.push(income)
      user.save()
      .then(()=> {
        res.redirect(`/incomes`)
    }).catch(err =>{
        console.log(err)
    })
  })
  }
  

function newIncome(req, res) {
  res.render('incomes/new',{
    user: req.user}
    )
}

function index(req, res) {
  income.find({}, function(err, incomes){
  res.render('incomes/index', {
  title: "Incomes",
  user: req.user, 
  incomes
})
})
}