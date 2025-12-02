import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

// Mock data for blog posts
const mockBlogs = [
  {
    id: 1,
    postNo: '01',
    title: 'Understanding Mental Health in the Digital Age',
    editor: 'Ahmad',
    published: true,
    ads: 'Ad1, Ad2',
    postDate: '18 Aug, 2025',
  },
  {
    id: 2,
    postNo: '02',
    title: 'Healthy Lifestyle Tips for Busy Professionals',
    editor: 'Sarah',
    published: true,
    ads: 'Ad3',
    postDate: '17 Aug, 2025',
  },
  {
    id: 3,
    postNo: '03',
    title: 'The Future of Telemedicine and Remote Healthcare',
    editor: 'Ahmad',
    published: false,
    ads: 'Ad2, Ad4',
    postDate: '16 Aug, 2025',
  },
  {
    id: 4,
    postNo: '04',
    title: 'Nutrition and Wellness: A Complete Guide',
    editor: 'Maria',
    published: true,
    ads: 'Ad1',
    postDate: '15 Aug, 2025',
  },
  {
    id: 5,
    postNo: '05',
    title: 'Preventive Care: Your Health Investment',
    editor: 'Ahmad',
    published: true,
    ads: 'Ad2, Ad3, Ad5',
    postDate: '14 Aug, 2025',
  },
  {
    id: 6,
    postNo: '06',
    title: 'Managing Chronic Conditions at Home',
    editor: 'John',
    published: false,
    ads: 'Ad4',
    postDate: '13 Aug, 2025',
  },
  {
    id: 7,
    postNo: '07',
    title: 'Exercise and Mental Health Connection',
    editor: 'Sarah',
    published: true,
    ads: 'Ad1, Ad3',
    postDate: '12 Aug, 2025',
  },
  {
    id: 8,
    postNo: '08',
    title: 'Healthcare Technology Trends 2025',
    editor: 'Ahmad',
    published: true,
    ads: 'Ad2, Ad4, Ad5',
    postDate: '11 Aug, 2025',
  },
];

const columnHelper = createColumnHelper();

function Blogs() {
  const [data] = useState(() => [...mockBlogs]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo(
    () => [
      columnHelper.accessor('postNo', {
        header: 'Post No.',
        cell: (info) => (
          <span className='font-medium text-gray-700'>{info.getValue()}.</span>
        ),
      }),
      columnHelper.accessor('title', {
        header: 'Title',
        cell: (info) => (
          <span className='text-gray-900 font-medium'>{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('editor', {
        header: 'Editor',
        cell: (info) => (
          <span className='text-gray-700'>{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('published', {
        header: 'Published?',
        cell: (info) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              info.getValue()
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {info.getValue() ? 'Yes' : 'No'}
          </span>
        ),
      }),
      columnHelper.accessor('ads', {
        header: 'Ads',
        cell: (info) => (
          <span className='text-gray-700 text-sm'>{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('postDate', {
        header: 'Post Date',
        cell: (info) => (
          <span className='text-gray-700'>{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('id', {
        header: 'Repay',
        cell: (info) => (
          <Button
            variant='outline'
            size='sm'
            className='border-primary text-primary hover:bg-primary/10'
            onClick={() => handleManage(info.row.original)}
          >
            Manage
          </Button>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  const handleManage = (post) => {
    console.log('Managing blog post:', post);
    // Add your manage logic here
  };

  const handleNewPost = () => {
    console.log('Creating new blog post');
    // Add your new post logic here
  };

  return (
    <div className='min-h-screen'>
      <div className='mx-auto'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-foreground'>Blog Posts</h1>
        </div>

        {/* Table Card */}
        <div className='bg-background rounded-lg shadow-sm border border-border overflow-hidden'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className='border-b'>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className='text-primary font-semibold text-sm'
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className='hover:bg-gray-50 transition-colors'
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className='h-24 text-center text-gray-500'
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        <div className='flex items-center justify-between mt-4'>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
          <div className='text-sm text-gray-700'>
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </div>
        </div>

        {/* New Post Button */}
        <div className='flex justify-center mt-8'>
          <Button
            onClick={handleNewPost}
            className='bg-secondary hover:bg-secondary/80 text-secondary-foreground px-8 py-3 rounded-lg font-medium text-base'
          >
            New Post
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
