/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from '@/components/ui/button'
import { jsPDF } from 'jspdf'

export default function GeneratePDF({ booking }: { booking: any }) {
  const generatePDF = () => {
    if (!booking) {
      console.error('Booking data is missing')
      return
    }

    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text('Invoice', 20, 20)

    doc.setFontSize(12)
    doc.text(`Customer: ${booking.name}`, 20, 40)
    doc.text(`Email: ${booking.email}`, 20, 50)
    doc.text(`Phone: ${booking.phoneNumber}`, 20, 60)
    doc.text(`Number of Travelers: ${booking.numberOfTravelers}`, 20, 70)

    if (booking.specialRequests) {
      doc.text(`Special Requests: ${booking.specialRequests}`, 20, 80)
    }

    doc.text(`Package: ${booking.packageTitle}`, 20, 100)
    doc.text(`Total Price: $${booking.totalPrice}`, 20, 110)

    doc.save(`invoice-${booking._id}.pdf`)
  }

  return (
    <Button onClick={generatePDF} disabled={!booking}>
      Download PDF Invoice
    </Button>
  )
}
