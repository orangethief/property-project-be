import { Schema, model, mongoose } from 'mongoose';

const propertySchema = new Schema({
  title: { type: String, },
  type: { type: String, enum: ['apartement', 'house', 'condo', 'townhouse', 'villa', 'office', 'retail'], required: true },
  location: { type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true} },
  price: { type: Number,},
  description: { type: String,},
  images: { type: [String] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}},
  {timestamps: true});


propertySchema.index({ location: '2dsphere' });
export default model('Property', propertySchema);