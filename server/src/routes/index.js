const express = require('express')

const router = express.Router();

const { auth } = require('../middlewares/auth');

const { uploadFile } = require('../middlewares/uploadFile');
const { multipleUploadFile } = require('../middlewares/multipleUploadFile');

// Controller user
const {
  getUsers,
  updateProfile,
  deleteUser } = require('../controllers/user');

// Controller book
const {
  addBook,
  getBooks,
  getDetailBook,
  updateBook,
  deleteBook } = require('../controllers/book');

// Controller list book
const {
  addListBook,
  getListBook,
  deleteListBook } = require('../controllers/userListBook');

// Controller transaction
const {
  addTransaction,
  getTransactions,
  getDetailTransaction,
  updateTransaction,
  deleteTransaction } = require('../controllers/transaction');

const {
  register,
  login,
  checkAuth } = require('../controllers/auth');

// ----------------
router.post('/register', register);
router.post('/login', login);
router.get('/check-auth', auth, checkAuth);

// Route users
router.get('/users', auth, getUsers);
router.delete('/user/:id', deleteUser);
router.put('/user', auth, uploadFile('avatar'), updateProfile);

// Route book
router.post('/book', auth, multipleUploadFile('bookCover', 'bookFile'), addBook);
router.get('/books', getBooks);
router.get('/book/:id', getDetailBook);
router.put('/book/:id', auth, multipleUploadFile('bookCover', 'bookFile'), updateBook);
router.delete('/book/:id', auth, deleteBook);

// Route list book
router.post('/list-book', auth, addListBook);
router.get('/list-book', auth, getListBook);
router.delete('/list-book/:id', auth, deleteListBook);

// Route transaction
router.post('/transaction', auth, uploadFile('transferProof'), addTransaction);
router.get('/transactions', getTransactions);
router.get('/transaction/:id', auth, getDetailTransaction);
router.put('/transaction/:id', auth, updateTransaction);
router.delete('/transaction/:id', auth, deleteTransaction);

module.exports = router