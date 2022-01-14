const { User, Thought } = require('../models');


const thoughtController = {
    // post a thought
    // /api/thoughts
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.id },
                    { $push: { thoughts: _id }},
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with that id! "});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // add reaction to thought
    // /api/thoughts/:thoughtId/reactions
    addReaction({ params, body}, res) {
        Thought.findOneAndUpdate({ _id: params.id}, { $push: { reactions: body } }, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
 
    // delete a thought
    // /api/thoughts/:thoughtId
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id found' });
            }
            return User.findOneAndUpdate(
                { username: thoughtText.username },
                { $pull: { thoughts: params.id } },
                { new: true }
            ); 
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // get all thoughts
    // /api/thoughts
    getThoughts(req, res) {
        Thought.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },


    // get thought by ID
    // /api/thoughts/:thoughtId
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No thought found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //update thought
    // /api/thoughts/:thoughtId
    updateThought({ params, body}, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No thought found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },


    // delete reactions 
    // /api/thoughts/:thoughtId/reactions/:reactionId
    deleteReaction({ params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};
module.exports = thoughtController;