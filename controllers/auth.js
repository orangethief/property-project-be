import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';

export const register = async (req, res, next) => {
  const user = new User(req.body);
  user.password = await bcrypt.hash(req.body.password, 10);
  try {
    await user.save();
    const secret = process.env.JWT_SECRET;
    const payload = user.serialize();
    const tokenOptions = { expiresIn: '1h' };
    const token = jwt.sign(payload, secret, tokenOptions);

    res.json({ data: { token } });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    throw new ApiError('Invalid credentials', 401);
  }

  if (await bcrypt.compare(req.body.password, user.password) != true) {
    throw new ApiError('Invalid credentials', 401);
  }

  const secret = process.env.JWT_SECRET;
  const payload = user.serialize();
  const tokenOptions = { expiresIn: '1h' };
  const token = jwt.sign(payload, secret, tokenOptions);

  res.json({ data: { token }})
};
