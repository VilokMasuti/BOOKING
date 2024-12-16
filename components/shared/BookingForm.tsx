'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBooking } from '../../app/action'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format, parse } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

export default function BookingForm({
  packageId,
  packageTitle,
  packagePrice,
  availableDates,
}: {
  packageId: string
  packageTitle: string
  packagePrice: number
  availableDates: string[]
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    numberOfTravelers: 1,
    specialRequests: '',
    date: undefined as Date | undefined,
  })
  const router = useRouter()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'numberOfTravelers' ? parseInt(value, 10) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.date) {
      alert('Please select a date')
      return
    }
    const bookingData = {
      ...formData,
      packageId,
      packageTitle,
      totalPrice: packagePrice * formData.numberOfTravelers,
      date: format(formData.date, 'yyyy-MM-dd'),
    }
    try {
      const result = await createBooking(bookingData)
      if (result && result.insertedId) {
        router.push(`/invoice/${result.insertedId}`)
      } else {
        throw new Error('Booking creation failed')
      }
    } catch (error) {
      console.error('Error creating booking:', error)
      alert('Failed to create booking. Please try again.')
    }
  }

  const availableDateObjects = availableDates.map((date) =>
    parse(date, 'yyyy-MM-dd', new Date())
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="numberOfTravelers">Number of Travelers</Label>
        <Input
          id="numberOfTravelers"
          name="numberOfTravelers"
          type="number"
          value={formData.numberOfTravelers}
          onChange={handleChange}
          min="1"
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.date ? (
                format(formData.date, 'PPP')
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.date}
              onSelect={(date: Date | undefined) =>
                setFormData((prev) => ({ ...prev, date }))
              }
              disabled={(date) =>
                !availableDateObjects.some(
                  (availableDate) =>
                    availableDate.getDate() === date.getDate() &&
                    availableDate.getMonth() === date.getMonth() &&
                    availableDate.getFullYear() === date.getFullYear()
                )
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Label htmlFor="specialRequests">Special Requests (optional)</Label>
        <Textarea
          id="specialRequests"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" className="w-full">
        Book Now
      </Button>
    </form>
  )
}
