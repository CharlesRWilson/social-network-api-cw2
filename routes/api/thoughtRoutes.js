// // routes/api/thoughtRoutes.js
// const router = require('express').Router();
// const {
//   getThoughts,
//   getSingleThought,
//   createThought,
//   updateThought,
//   deleteThought,
//   addReaction,
//   removeReaction,
// } = require('../../controllers/thoughtController');

// router.route('/').get(getThoughts).post(createThought);
// router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
// router.route('/:thoughtId/reactions').post(addReaction);
// router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

// module.exports = router;

const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;
