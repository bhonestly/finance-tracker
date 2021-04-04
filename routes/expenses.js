const router = require('express').Router()
const expenseCtrl = require('../controllers/expenses')


router.get('/', isLoggedIn, expenseCtrl.index);
router.get('/new/:id', isLoggedIn, expenseCtrl.new);
router.get('/:id', isLoggedIn, expenseCtrl.show); 
router.get('/update/:id', isLoggedIn, expenseCtrl.update);
router.post("/new/:id", isLoggedIn, expenseCtrl.create);
router.put('/:id', isLoggedIn, expenseCtrl.edit);
router.delete('/:id', isLoggedIn, expenseCtrl.delete);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;