import { Schema, model, mongoose } from 'mongoose';

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String, },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property'}],
}, {timestamps: true}
);

export default model('User', userSchema);