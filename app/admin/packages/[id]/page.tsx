import { getPackage } from '@/app/action'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import EditPackageForm from '@/components/shared/EditPackageForm '

export default async function PackageDetail({
  params,
}: {
  params: { id: string }
}) {
  const id = params.id
  const pkg = await getPackage(id)

  if (!pkg) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Package</CardTitle>
        </CardHeader>
        <CardContent>
          <EditPackageForm package={pkg} />
        </CardContent>
      </Card>
    </div>
  )
}
