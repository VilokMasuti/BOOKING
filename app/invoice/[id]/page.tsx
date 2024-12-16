import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import GeneratePDF from '@/components/GeneratePDF'
import { getBookings } from '@/app/action'
import { notFound } from 'next/navigation'
export default async function Invoice({ params }: { params: { id: string } }) {
  const id = params.id
  const booking = await getBookings(id)

  if (!booking) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Customer Details</h2>
            <p>
              <strong>Name:</strong> {booking.name}
            </p>
            <p>
              <strong>Email:</strong> {booking.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {booking.phoneNumber}
            </p>
            <p>
              <strong>Number of Travelers:</strong> {booking.numberOfTravelers}
            </p>
            {booking.specialRequests && (
              <p>
                <strong>Special Requests:</strong> {booking.specialRequests}
              </p>
            )}
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Package Details</h2>
            <p>
              <strong>Package:</strong> {booking.packageTitle}
            </p>
            <p>
              <strong>Total Price:</strong> ${booking.totalPrice}
            </p>
          </div>
          <GeneratePDF booking={booking} />
        </CardContent>
      </Card>
    </div>
  )
}
