import { Schema, model, mongoose } from 'mongoose';

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property'}],
}, {timestamps: true}
);

userSchema.methods.serialize = function () {
  return {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    profilePicture: this.profilePicture,
    favorites: this.favorites,
  };
};

export default model('User', userSchema);
