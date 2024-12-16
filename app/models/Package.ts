import mongoose from 'mongoose'

const PackageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    availableDates: {
      type: [String],
      required: [true, 'Available dates are required'],
    },
  },
  { timestamps: true }
)

export default mongoose.models.Package ||
  mongoose.model('Package', PackageSchema)
