const { Thought, User } = require('../models');

module.exports = {
//   // Get all thoughts
//   getThoughts(req, res) {
//     Thought.find()
//       .then(thoughts => res.json(thoughts))
//       .catch(err => res.status(500).json(err));
//   },
// getThoughts(req, res){
//     try {
//         Thought.find(); // Ensure Thought is defined and has a find method
//         res.status(200).json(thoughts);
//     } catch (err) {
//         console.error(err); // Log the error for debugging
//         res.status(500).json({ error: err.message });
//     }
// },
getThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find(); // Await the result of the find method
      res.status(200).json(thoughts);
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ error: err.message });
    }
  },

  // Get a single thought by ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then(thought => !thought ? res.status(404).json({ message: 'No thought found with this ID!' }) : res.json(thought))
      .catch(err => res.status(500).json(err));
  },

  // Create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(thought => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then(user => !user ? res.status(404).json({ message: 'Thought created, but no user found with this ID!' }) : res.json('Thought created!'))
      .catch(err => res.status(500).json(err));
  },

  // Update a thought by ID
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true, runValidators: true })
      .then(thought => !thought ? res.status(404).json({ message: 'No thought found with this ID!' }) : res.json(thought))
      .catch(err => res.status(500).json(err));
  },

  // Delete a thought by ID
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then(thought => !thought ? res.status(404).json({ message: 'No thought found with this ID!' }) : res.json({ message: 'Thought deleted!' }))
      .catch(err => res.status(500).json(err));
  },

  // Add a reaction to a thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then(thought => !thought ? res.status(404).json({ message: 'No thought found with this ID!' }) : res.json(thought))
      .catch(err => {
        console.error('Error adding reaction:', err);
        res.status(500).json(err);
      });
  },

  // Remove a reaction from a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then(thought => !thought ? res.status(404).json({ message: 'No thought found with this ID!' }) : res.json(thought))
      .catch(err => res.status(500).json(err));
  },
};