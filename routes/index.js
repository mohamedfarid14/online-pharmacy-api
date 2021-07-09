const express = require('express');
const AuthCtrl = require('../controllers/userAuth');
const pharmacyAuthCtrl = require('../controllers/pharmacyAuth');
const SignupCtrl = require('../controllers/user/signup');
const LoginCtrl = require('../controllers/user/login');
const ProfileCtrl = require ('../controllers/user/profile')
const PharmacyReistrationCtrl = require('../controllers/pharmacy/pharmacyregistration');
const SearchCtrl = require('../controllers/user/search');
const OrdersCtrl= require('../controllers/user/orders');
const PharmacyLoginCtrl = require('../controllers/pharmacy/login');
const PharmacyProfileCtrl = require('../controllers/pharmacy/profile');
const PharmacyMedicineCtrl = require('../controllers/pharmacy/medicines');
const logoutCtrl = require('../controllers/user/logout');
const PharmacylogoutCtrl = require('../controllers/pharmacy/logout');
const UserOrdersCtrl = require('../controllers/user/showorder');
const UpdateOrdersCtrl = require ('../controllers/user/updateorder');
const PharmaUpdateOrdersCtrl = require ('../controllers/pharmacy/updateorder');
const GetUserCtrl = require ('../controllers/pharmacy/showusers');
const MedicineCtrl = require('../controllers/pharmacy/updatemedicines');
const SearchMedicineCtrl = require('../controllers/pharmacy/searchmedicine');
const showMedicinesCtrl = require('../controllers/pharmacy/searchmedicine');
const RemoveMedicinesCtrl = require('../controllers/pharmacy/deletemedicines');
const showOrdersCtrl = require('../controllers/pharmacy/showorders');
const ShowUserOrdersCtrl = require('../controllers/pharmacy/showorders');
const ShowPharmaciesCtrl = require('../controllers/user/showpharmacies');
const UpdateProfileCtrl = require('../controllers/user/updateprofile');
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

router.get('/userorders',[AuthCtrl.Auth,AuthCtrl.restictTo('user')],UserOrdersCtrl.ShowOrders);

router.patch('/updateorder/:id',[AuthCtrl.Auth,AuthCtrl.restictTo('user')],UpdateOrdersCtrl.UpdateOrder);

router.patch('/phupdateorder/:id',[pharmacyAuthCtrl.Auth,pharmacyAuthCtrl.restictTo('pharmacist')],PharmaUpdateOrdersCtrl.UpdateOrder);

router.post('/users/:id',[pharmacyAuthCtrl.Auth,pharmacyAuthCtrl.restictTo('pharmacist')],GetUserCtrl.User);

router.post('/updatemedicines',[pharmacyAuthCtrl.Auth,pharmacyAuthCtrl.restictTo('pharmacist')],MedicineCtrl.showmedicine);

router.get('/searchmedicine',[pharmacyAuthCtrl.Auth,pharmacyAuthCtrl.restictTo('pharmacist')],SearchMedicineCtrl.searchMed);

router.get('/showmedicines',[pharmacyAuthCtrl.Auth,pharmacyAuthCtrl.restictTo('pharmacist')],showMedicinesCtrl.Getallmed);

router.delete('/removemedicine',[pharmacyAuthCtrl.Auth,pharmacyAuthCtrl.restictTo('pharmacist')],RemoveMedicinesCtrl.deleteMed);

router.get('/showorders',[pharmacyAuthCtrl.Auth,pharmacyAuthCtrl.restictTo('pharmacist')],showOrdersCtrl.GetallOrders);

router.get('/userorders/:id',[pharmacyAuthCtrl.Auth,pharmacyAuthCtrl.restictTo('pharmacist')],ShowUserOrdersCtrl.GetUserOrders);

router.get('/showpharmacies',[AuthCtrl.Auth,AuthCtrl.restictTo('user')],ShowPharmaciesCtrl.ShowAllPharmacies);

router.patch('/updateprofile',[AuthCtrl.Auth,AuthCtrl.restictTo('user')],UpdateProfileCtrl.UpdateUserProfile);


module.exports = router;
