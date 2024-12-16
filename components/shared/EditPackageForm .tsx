/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updatePackage, deletePackage } from '@/app/action'
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
import { toast } from '../../hooks/use-toast'

interface Package {
  _id: string
  title: string
  description: string
  price: number
  image: string
  availableDates: string[]
}

export default function EditPackageForm({
  package: pkg,
}: {
  package: Package
}) {
  const [formData, setFormData] = useState({
    title: pkg.title,
    description: pkg.description,
    price: pkg.price,
    image: pkg.image,
    availableDates: pkg.availableDates.map((date) =>
      parse(date, 'yyyy-MM-dd', new Date())
    ),
  })
  const router = useRouter()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'price' ? parseFloat(value) : value,
    }))
  }

  const handleDateSelect = (dates: Date[] | undefined) => {
    if (dates) {
      setFormData((prevState) => ({
        ...prevState,
        availableDates: dates,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const packageData = {
        ...formData,
        availableDates: formData.availableDates.map((date) =>
          format(date, 'yyyy-MM-dd')
        ),
      }
      await updatePackage(pkg._id, packageData)
      toast({
        title: 'Success',
        description: 'Package updated successfully',
      })
      router.push('/admin')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update package',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this package?')) {
      try {
        await deletePackage(pkg._id)
        toast({
          title: 'Success',
          description: 'Package deleted successfully',
        })
        router.push('/admin')
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete package',
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Available Dates</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.availableDates.length > 0 ? (
                `${formData.availableDates.length} date(s) selected`
              ) : (
                <span>Pick dates</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="multiple"
              selected={formData.availableDates}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex justify-between gap-4">
        <Button type="submit" className="flex-1">
          Update Package
        </Button>
        <Button type="button" variant="destructive" onClick={handleDelete}>
          Delete Package
        </Button>
      </div>
    </form>
  )
}
