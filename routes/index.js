const express = require('express');
const AuthCtrl = require('../controllers/userAuth');
const pharmacyAuthCtrl = require('../controllers/pharmacyAuth')
const SignupCtrl = require('../controllers/user.js/signup');
const LoginCtrl = require('../controllers/user.js/login');
const ProfileCtrl = require ('../controllers/user.js/profile')
const PharmacyReistrationCtrl = require('../controllers/pharmacy/pharmacyregistration');
const SearchCtrl = require('../controllers/user.js/search');
const OrdersCtrl= require('../controllers/user.js/orders');
const PharmacyLoginCtrl = require('../controllers/pharmacy/login');
const PharmacyProfileCtrl = require('../controllers/pharmacy/profile');
const PharmacyMedicineCtrl = require('../controllers/pharmacy/medicines');
const logoutCtrl = require('../controllers/user.js/logout');
const PharmacylogoutCtrl = require('../controllers/pharmacy/logout');

const router = new express.Router;


router.post('/signup',SignupCtrl.Signup);

router.post('/login',LoginCtrl.Login);

router.get('/profile',[AuthCtrl.Auth,AuthCtrl.restictTo('user')],ProfileCtrl.Userprofile);

router.get('/search',[AuthCtrl.Auth,AuthCtrl.restictTo('user')],SearchCtrl.Search);

router.post('/order',[AuthCtrl.Auth,AuthCtrl.restictTo('user')],OrdersCtrl.order);

router.post('/logout',[AuthCtrl.Auth,AuthCtrl.restictTo('user')],logoutCtrl.logout);

router.post('/pharmacyRequestRegister',PharmacyReistrationCtrl.PharmacyReistration);

router.post('/Pharmacylogin',PharmacyLoginCtrl.PharmacyLogin);

router.get('/pharmacyprofile',[pharmacyAuthCtrl.Auth,pharmacyAuthCtrl.restictTo('pharmacist')],PharmacyProfileCtrl.PharmacyProfile);

router.post('/pharmacyaddmedicine',[pharmacyAuthCtrl.Auth,pharmacyAuthCtrl.restictTo('pharmacist')],PharmacyMedicineCtrl.addMedicine);

router.post('/pharmacylogout',[pharmacyAuthCtrl.Auth,pharmacyAuthCtrl.restictTo('pharmacist')],PharmacylogoutCtrl.logout);



module.exports=router;