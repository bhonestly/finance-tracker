const Expense = require('../models/expense')
const User = require('../models/user')
module.exports = {
    index,
    new: newExpense,
    create,
    show,
    update,
    delete: deleteExpense,

}

function deleteExpense(req, res) {
    Expense.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/expense')
        })
}

function update(req, res) {
    req.body.done = !!req.body.done
    Expense.findByIdAndUpdate(req.params.id,req.body)
    .then(Expense => {
        res.redirect('/expenses')
    })
}
function show(req, res) {
    Expense.findById(req.params.id)
    .then( (Expense)  => {
        res.render('expenses/show', {expense})
    })
}
// function create(req, res) {
//     req.body.done = false;
//     Expense.create(req.body)
//     .then(() => {
//         res.redirect('/expenses')
//     })
// }
// function create (req, res) {

//   console.log(req.params.id)
//   User.findById(req.params.id, (err, user) => {
//     user.expenses.push(req.body.expenses)
//     user.save()
//     .then(()=> {
//       res.redirect(`/expenses`)
//   }).catch(err =>{
//       console.log(err)
//   })
// })
// }

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