const { User, Thought } = require('../models');

// CRUD methods on user 
const userController = {
    // get all users
    // /api/users
    getAllUsers(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // get one user by id
    // /api/user/:userId
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .then(dbUserData => {
                // if no user is found send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id ' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create a user
    // /api/users
    createUser({ body}, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

   // update user by id
   // /api/users/:Id
   updateUser({ params, body}, res) {
       User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
   } ,

   // delete user
   // /api/users/:Id
   deleteUser({ params}, res) {
       User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id! '});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
   },

   // add friends
   // /api/users/:userId/friends/:friendId
   addFriend({ params }, res) {
       User.findOneAndUpdate(
           { _id: params.id },
           { $push: { friends: params.friendId } },
           { new: true}
       )
       .then(dbUserData => {
           if (!dbUserData) {
               res.status(404).json({ message: "No user found with this id!" });
               return;
           }
           res.json(dbUserData);
       })
       .catch(err => res.status(400).json(err));
   },
  


   // delete friends
   // /api/users/:userId/friends/:friendId
   deleteFriend({ params }, res) {
       User.findOneAndUpdate(
           { _id: params.id },
           { $pull: { friends: { friendId: params.friendId } } },
           { new: true }
       )
       .then(dbUserData => res.json(dbUserData))
       .catch(err => res.json(err));
   }
};

module.exports = userController;