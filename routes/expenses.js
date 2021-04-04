const router = require('express').Router()
const expenseCtrl = require('../controllers/expenses')


/* GET users listing. */
router.get('/', isLoggedIn, expenseCtrl.index)
router.get('/new/:id', expenseCtrl.new);
router.get('/:id', expenseCtrl.show); 
router.get('/update/:id', isLoggedIn, expenseCtrl.update)
router.post("/new/:id", isLoggedIn, expenseCtrl.create)
router.put('/:id', isLoggedIn, expenseCtrl.edit)
router.delete('/:id', isLoggedIn, expenseCtrl.delete);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;