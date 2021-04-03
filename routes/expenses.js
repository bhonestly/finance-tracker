const router = require('express').Router()
const expenseCtrl = require('../controllers/expenses')


/* GET users listing. */
router.get('/', isLoggedIn, expenseCtrl.index)
router.get('/new/:id', expenseCtrl.new);
router.get('/:id', expenseCtrl.show); 
// router.post('/', expenseCtrl.create);
router.post("/new/:id", isLoggedIn, expenseCtrl.create)
router.put('/:id', expenseCtrl.update);
router.delete('/:id', expenseCtrl.delete);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;