import Property from '../models/Property.js';
import ApiError from '../utils/ApiError.js';

export const getProperties = async (req, res) => {
  const properties = await Property.find().select({
    "_id": 1,
    "title" : 1,
    "type" : 1,
    "location" : 1,
    "price" : 1,
    "images" : 1,
    "userId" : 1,
  });
  res.status(200).json({properties});
};

export const getPropertiesWithPagination = async (req, res) => {
  let { page = 1, limit = 10, lat = null, lng = null, radius = 50, paginated = true } = req.query;
  if (lat !== null && lng !== null) {
    const properties = await Property.find({
      location: {
        $geoWithin: {
          $centerSphere: [
            [ lng, lat ],
            radius / 6378.1 // km to radians conversion
          ]
        }
      }
    });
    return res.status(200).json({properties});
  }

  if (paginated == 'false') {
    return getProperties(req, res);
  }

  page = parseInt(page);
  limit = parseInt(limit);
  const properties = await Property.find().skip((page-1)*limit).limit(limit);
  const totalPropertiesCount = await Property.countDocuments();
  const totalPages = Math.ceil(totalPropertiesCount / limit);

  res.status(200).json({properties, totalPropertiesCount, totalPages, currentPage: page, itemsPerPage: limit});
}

export const getPropertyById = async (req, res) => {
  const { id } = req.params;
  const property = await Property.findById(id);
  if (!property) {
    throw new ApiError('Not found', 404);
  }

  res.status(200).json(property);
}

export const createProperty = async (req, res) => {
  const {
    body: { title, type, location, price, description, images, userId},
  } = req;
  const property = await Property.create({ title, type, location, price, description, images, userId});

  res.status(201).json(property);
};

export const updateProperty = async (req, res) => {
  const {
    body: {title, type, location, price, description, images, userId},
    params: { id},
  } = req;
  const property = await Property.findByIdAndUpdate(id, { title, type, location, price, description, images, userId }, { new :true });

  res.status(200).json(property);
};

export const deleteProperty = async (req,res) => {
  const { id } = req.params;
  if (!await Property.findById(id)) {
    throw new ApiError('Not found', 404);
  }

  await Property.findByIdAndDelete(id);

  res.status(200).json({message: 'Property deleted successfully'});
};
