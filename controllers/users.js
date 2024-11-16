import User from '../models/User.js';
import Property from '../models/Property.js';
import ApiError from '../utils/ApiError.js';

export const getUsers = async(req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};


export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError('Not found', 404);
  }
  res.status(200).json(user);
};

export const createUser = async (req, res) => {
  const {
    body: { firstName, lastName, email, profilePicture, favorites },
  } = req;

  if (await User.findOne({ email })) {
    throw new ApiError('Not found', 404);
  }

  const user = await User.create({ firstName, lastName, email, profilePicture, favorites});
  res.status(201).json(user);
};

export const updateUser = async (req, res) => {
  const {
    body: { firstName, lastName, email, profilePicture, favorites},
    params: {id},
  } = req;

  if (!await User.findById(id)) {
    throw new ApiError('Not found', 404);
  }

  if (await User.findOne({ email })) {
    throw new ApiError('Email must be unique', 400);
  }

  const user = await User.findByIdAndUpdate(id, { firstName, lastName, email, profilePicture, favorites }, { new: true});
  res.status(200).json(user);
}

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!await User.findById(id)) {
    throw new ApiError('Not found', 404);
  }

  await User.findByIdAndDelete(id);

  res.status(200).json({ message: 'User deleted successfully' });
};

export const addFavorite = async (req, res) => {
  const { userId, propertyId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError('Not found', 404);
  }

  const property = await Property.findById(propertyId);
  if (!property) {
    throw new ApiError('Not found', 404);
  }

  user.favorites.push(propertyId);
  await user.save();

  res.status(200).json({ message: 'Property added to favorites!' });
}

export const removeFavorite = async (req, res) => {
  const { userId, propertyId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError('Not found', 404);
  }

  const property = await Property.findById(propertyId);
  if (!property) {
    throw new ApiError('Not found', 404);
  }

  user.favorites = user.favorites.filter(favorite => favorite != propertyId);
  await user.save();
  res.status(200).json({ message: 'Property removed from favorites!' });
}

export const getAllFavorites = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).populate('favorites');
  if (!user) {
    throw new ApiError('Not found', 404);
  }

  res.status(200).json(user);
}
