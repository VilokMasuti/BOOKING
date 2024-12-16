/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from './lib/mongodb'
import Package from './models/Package'
import { Booking } from './models/Booking'
import { Types } from 'mongoose'

export async function getPackages(page = 1, limit = 10, search = '') {
  await connectToDatabase()
  const skip = (page - 1) * limit

  const query = search
    ? {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ],
      }
    : {}

  const packages = await Package.find(query).skip(skip).limit(limit).lean()

  const total = await Package.countDocuments(query)

  return {
    packages: JSON.parse(JSON.stringify(packages)),
    total,
    totalPages: Math.ceil(total / limit),
  }
}

export async function getPackage(id: string) {
  await connectToDatabase()
  const packageData = await Package.findById(id).lean()
  return JSON.parse(JSON.stringify(packageData))
}

export async function createBooking(bookingData: any) {
  await connectToDatabase()
  const result = await Booking.create(bookingData)
  revalidatePath('/admin')
  return JSON.parse(JSON.stringify(result))
}

export async function getBookings(id?: string) {
  await connectToDatabase()
  let bookings

  try {
    if (id) {
      if (!Types.ObjectId.isValid(id)) {
        return null
      }
      bookings = await Booking.findById(id).lean()
    } else {
      bookings = await Booking.find().lean()
    }

    return JSON.parse(JSON.stringify(bookings))
  } catch (error) {
    console.error('Error fetching booking(s):', error)
    return null
  }
}

export async function createPackage(packageData: any) {
  await connectToDatabase()
  const result = await Package.create(packageData)
  revalidatePath('/')
  revalidatePath('/admin')
  return JSON.parse(JSON.stringify(result))
}

export async function updatePackage(id: string, packageData: any) {
  await connectToDatabase()
  const result = await Package.findByIdAndUpdate(id, packageData, {
    new: true,
  }).lean()
  revalidatePath('/')
  revalidatePath('/admin')
  return JSON.parse(JSON.stringify(result))
}

export async function deletePackage(id: string) {
  await connectToDatabase()
  const result = await Package.findByIdAndDelete(id).lean()
  revalidatePath('/')
  revalidatePath('/admin')
  return JSON.parse(JSON.stringify(result))
}
