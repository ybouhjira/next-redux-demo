import { useGetBooksQuery } from "@/redux/api";

export default function Books() {
  const { data, error, isLoading } = useGetBooksQuery();

  if (error) {
    throw error;
  }

  return (
    <div>
      {isLoading && <div>Loading...</div>}

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 m-8">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publication Year</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((book: any) => (
                <tr
                  key={book.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th className="">{book.id}</th>
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {book.title}
                  </th>
                  <th>{book.author}</th>
                  <th>{book.publication_year}</th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
