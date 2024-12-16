import { getPackage } from '@/app/action'
import BookingForm from '@/components/shared/BookingForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { notFound } from 'next/navigation'
export default async function PackageDetail({
  params,
}: {
  params: { id: string }
}) {
  const pkg = await getPackage(params.id)

  if (!pkg) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{pkg.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-4">{pkg.description}</p>
              <p className="text-2xl font-bold mb-4">${pkg.price} per person</p>
              <h2 className="text-xl font-semibold mb-2">Available Dates:</h2>
              <ul className="list-disc list-inside mb-4">
                {pkg.availableDates.map((date: string) => (
                  <li key={date}>{date}</li>
                ))}
              </ul>
            </div>
            <div>
              <BookingForm
                packageId={pkg._id}
                packageTitle={pkg.title}
                packagePrice={pkg.price}
                availableDates={pkg.availableDates}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
