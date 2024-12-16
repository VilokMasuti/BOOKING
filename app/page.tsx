/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import { getPackages } from './action'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { PackageIcon, PlusCircle } from 'lucide-react'
import SearchForm from '../components/shared/SearchForm'
import Pagination from '../components/shared/Pagination'

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page =
    typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1
  const search =
    typeof searchParams.search === 'string' ? searchParams.search : ''
  const { packages, totalPages } = await getPackages(page, 10, search)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Available Tour Packages
      </h1>

      <SearchForm initialSearch={search} />
      <div className="mt-4 flex gap-4">
        <Link href="/admin/packages/new" passHref>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Package
          </Button>
        </Link>
        <Link href="/admin" passHref>
          <Button variant="outline">Go to Admin Panel</Button>
        </Link>
      </div>

      {packages.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {packages.map((pkg: any) => (
              <Card key={pkg._id}>
                <CardHeader>
                  <CardTitle>{pkg.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {pkg.description}
                  </p>
                  <p className="text-lg font-bold mb-2">${pkg.price}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/package/${pkg._id}`} passHref>
                    <Button>View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            search={search}
          />
        </>
      ) : (
        <Alert className="mt-8">
          <PackageIcon className="h-4 w-4" />
          <AlertTitle>No packages available</AlertTitle>
          <AlertDescription>
            There are currently no tour packages available.
            {search && (
              <>
                <br />
                Your search for {search} did not match any packages. Try
                clearing your search or check back later.
              </>
            )}
          </AlertDescription>
          <div className="mt-4 flex gap-4">
            <Link href="/admin/packages/new" passHref>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Package
              </Button>
            </Link>
            <Link href="/admin" passHref>
              <Button variant="outline">Go to Admin Panel</Button>
            </Link>
          </div>
        </Alert>
      )}
    </div>
  )
}
