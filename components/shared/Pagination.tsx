import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  search: string
}

export default function Pagination({
  currentPage,
  totalPages,
  search,
}: PaginationProps) {
  const getPageUrl = (page: number) => {
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : ''
    return `/?page=${page}${searchParam}`
  }

  return (
    <div className="flex justify-center gap-2 mt-8">
      {currentPage > 1 && (
        <Link href={getPageUrl(currentPage - 1)} passHref>
          <Button variant="outline">Previous</Button>
        </Link>
      )}
      {currentPage < totalPages && (
        <Link href={getPageUrl(currentPage + 1)} passHref>
          <Button variant="outline">Next</Button>
        </Link>
      )}
    </div>
  )
}
