const router = require('express').Router()
const incomeCtrl = require('../controllers/incomes')


/* GET users listing. */
router.get('/', isLoggedIn, incomeCtrl.index)
router.get('/new/:id', incomeCtrl.new);
router.get('/:id', incomeCtrl.show); 
// router.post('/', incomeCtrl.create);
router.post("/new/:id", isLoggedIn, incomeCtrl.create)
router.put('/:id', incomeCtrl.update);
router.delete('/:id', incomeCtrl.delete);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;