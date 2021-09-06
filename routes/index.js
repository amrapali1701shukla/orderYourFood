var express = require('express');
var router = express.Router();
const productModel = require('./product')
const multer = require('multer');
var salesModel = require('./sales');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    const filename = Math.floor(Math.random()*10000000) + Date.now() + file.originalname;
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

router.get('/', function(req, res) {
  productModel.find()
    .then(function(products){
      res.render('index', {products});
    })
});


router.get('/create', function(req, res) {
  res.render('create');
});

router.post('/create', upload.single('img'), function(req, res) {
  var filename = `../images/uploads/${req.file.filename}`;
  
  productModel.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.desc,
    image: filename
  }).then(function(product){
    res.redirect('/create');
  })
});

router.post('/order',function(req,res){
  salesModel.create({
    order:req.body.orders,
    price:req.body.price,
    contactNumber:req.body.number,
    address:req.body.address
  }).then(function(a){
    res.send(a);
    console.log(a);
  })
  
});

router.get('/orders',function(req,res){
  res.render('show');
})

module.exports = router;
