
import mongoose from 'mongoose';
const { Schema } = mongoose;
/* an example
    const newComment = new Comment({
      userId: '642a9b9c8e6b9f0d2c8d6e7c',
      content: 'This is a great post!',
      createdAt: new Date(),
    });
    await newComment.save();

    // Read comments
    const comments = await Comment.find();

    // Update a comment
    const comment = await Comment.findById('123456789');
    comment.content = 'This is an updated comment.';
    await comment.save();

    // Delete a comment
    await Comment.findByIdAndDelete('123456789');    
*/

const commentSchema = new mongoose.Schema({
  userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
   },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});
const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
