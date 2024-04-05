import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  pictures: [{
    type: String,
    required: true
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    required: true
  }] 
});

export default mongoose.model('Post', postSchema);
