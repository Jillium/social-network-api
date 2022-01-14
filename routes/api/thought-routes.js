const router = require('express').Router();
const { addThought, deleteThought, addReaction, getThoughts, getThoughtById, updateThought, deleteReaction } = require('../../controllers/thought-controller');



// add thought
router.route('/:id').post(addThought);



router.route('/:id')
// get thought by Id
.get(getThoughtById)
// delete a thought
.delete(deleteThought)



// get all thoughts
router.route('/').get(getThoughts);



// update thought
router.route('/:id').put(updateThought);

// add a reaction
router.route('/:id/reactions').post(addReaction);

// delete a reaction
router.route('/:id/reactions/:reactionId').delete(deleteReaction);

module.exports = router;