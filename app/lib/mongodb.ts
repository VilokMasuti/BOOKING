/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose'

let isConnected = false

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true)

  if (!process.env.MONGODB_URI) {
    console.error('MISSING MONGODB_URI')
    return
  }

  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB is already connected')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'travel',
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    })
    isConnected = true
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection failed:', error)
    throw new Error('MongoDB connection error')
  }
}
