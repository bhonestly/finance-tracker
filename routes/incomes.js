const router = require('express').Router()
const incomeCtrl = require('../controllers/incomes')


router.get('/', isLoggedIn, incomeCtrl.index)
router.get('/new/:id', isLoggedIn, incomeCtrl.new);
router.get('/:id', isLoggedIn, incomeCtrl.show); 
router.get('/update/:id', isLoggedIn, incomeCtrl.update);
router.post("/new/:id", isLoggedIn, incomeCtrl.create)
router.put('/:id', isLoggedIn, incomeCtrl.edit);
router.delete('/:id', isLoggedIn, incomeCtrl.delete);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;