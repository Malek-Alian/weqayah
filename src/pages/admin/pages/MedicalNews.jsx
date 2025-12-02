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
import NewPostDialog from '@/components/NewPostDialog';

// Mock data for medical news posts
const mockMedicalNews = [
  {
    id: 1,
    postNo: '01',
    title: 'Breakthrough in Cancer Treatment Research',
    editor: 'Ahmad',
    published: true,
    ads: 'Ad1, Ad2',
    postDate: '18 Aug, 2025',
  },
  {
    id: 2,
    postNo: '02',
    title: 'New Vaccine Development for Seasonal Flu',
    editor: 'Sarah',
    published: true,
    ads: 'Ad3',
    postDate: '17 Aug, 2025',
  },
  {
    id: 3,
    postNo: '03',
    title: 'Mental Health Awareness in Healthcare',
    editor: 'Ahmad',
    published: false,
    ads: 'Ad2, Ad4',
    postDate: '16 Aug, 2025',
  },
  {
    id: 4,
    postNo: '04',
    title: 'Telemedicine Trends in 2025',
    editor: 'Maria',
    published: true,
    ads: 'Ad1',
    postDate: '15 Aug, 2025',
  },
  {
    id: 5,
    postNo: '05',
    title: 'Nutrition Guidelines for Diabetic Patients',
    editor: 'Ahmad',
    published: true,
    ads: 'Ad2, Ad3, Ad5',
    postDate: '14 Aug, 2025',
  },
  {
    id: 6,
    postNo: '06',
    title: 'AI in Medical Diagnosis',
    editor: 'John',
    published: false,
    ads: 'Ad4',
    postDate: '13 Aug, 2025',
  },
  {
    id: 7,
    postNo: '07',
    title: 'Preventive Care Strategies',
    editor: 'Sarah',
    published: true,
    ads: 'Ad1, Ad3',
    postDate: '12 Aug, 2025',
  },
  {
    id: 8,
    postNo: '08',
    title: 'Emergency Medicine Updates',
    editor: 'Ahmad',
    published: true,
    ads: 'Ad2, Ad4, Ad5',
    postDate: '11 Aug, 2025',
  },
];

const columnHelper = createColumnHelper();

function MedicalNews() {
  const [data, setData] = useState(() => [...mockMedicalNews]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isNewPostDialogOpen, setIsNewPostDialogOpen] = useState(false);

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
    console.log('Managing post:', post);
    // Add your manage logic here
  };

  const handleNewPost = () => {
    setIsNewPostDialogOpen(true);
  };

  const handleSubmitPost = (postData) => {
    // Generate new post number
    const newPostNo = String(data.length + 1).padStart(2, '0');

    // Create new post object
    const newPost = {
      id: data.length + 1,
      postNo: newPostNo,
      title: postData.title,
      editor: 'Current User', // You can get this from auth context
      published: postData.isPublished,
      ads: 'Ad1, Ad2', // You can implement ad selection logic
      postDate: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    };

    // Add to data
    setData((prev) => [...prev, newPost]);

    // Close dialog
    setIsNewPostDialogOpen(false);

    console.log('New post created:', newPost);
  };

  return (
    <div className='min-h-screen'>
      <div className='mx-auto'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-foreground'>Latest News</h1>
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

        {/* New Post Dialog */}
        <NewPostDialog
          open={isNewPostDialogOpen}
          onOpenChange={setIsNewPostDialogOpen}
          onSubmit={handleSubmitPost}
        />
      </div>
    </div>
  );
}

export default MedicalNews;
