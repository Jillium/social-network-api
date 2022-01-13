// Routes for User
const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controllers');

// Get all and post Users at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);



// get one, put(update) and delet user at /api/users
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


module.exports = router;