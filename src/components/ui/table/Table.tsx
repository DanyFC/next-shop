interface Props {
  headers: string[];
  children: React.ReactNode;
}

const Table = ({ headers, children }: Props) => {
  return (
    <table className="min-w-full">
      <thead className="bg-gray-200 border-b">
        <tr>
          {
            headers.map((header, index) => (
              <th key={index} scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                {header}
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  )
}
export default Table