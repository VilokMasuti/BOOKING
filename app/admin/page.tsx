/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import Link from 'next/link'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getBookings, getPackages } from '../action'

export default async function Admin() {
  const { packages } = await getPackages()
  const bookings = await getBookings()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Tour Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/admin/packages/new" passHref>
              <Button className="mb-4">Add New Package</Button>
            </Link>
            <ul className="space-y-2">
              {packages.map((pkg: any) => (
                <li key={pkg._id} className="flex justify-between items-center">
                  <span>{pkg.title}</span>
                  <Link href={`/admin/packages/${pkg._id}`} passHref>
                    <Button variant="outline">Edit</Button>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {bookings.map((booking: any) => (
                <li
                  key={booking._id}
                  className="flex justify-between items-center"
                >
                  <span>
                    {booking.name} - {booking.packageTitle}
                  </span>
                  <Link href={`/invoice/${booking._id}`} passHref>
                    <Button variant="outline">View Invoice</Button>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
