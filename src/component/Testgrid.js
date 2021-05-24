import React from "react";
import { useTable, useFilters } from "react-table";

function Table({ columns, data }) {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter
    }),
    []
  );

  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter }
  }) {
    const count = preFilteredRows.length;

    return (
      <input
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    );
  }

  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes
    },
    useFilters
  );

  // Render the UI for your table
  return (
    <table
      {...getTableProps()}
      border={1}
      style={{ borderCollapse: "collapse", width: "100%" }}
    >
      <thead>
        {headerGroups.map((group) => (
          <tr {...group.getHeaderGroupProps()}>
            {group.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.render("Header")}
                <div>{column.canFilter ? column.render("Filter") : null}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        {footerGroups.map((group) => (
          <tr {...group.getFooterGroupProps()}>
            {group.headers.map((column) => (
              <td {...column.getFooterProps()}>{column.render("Footer")}</td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
}

function Testgrid() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Heading 1",
        Footer: "Footer 1",
        columns: [
          {
            Header: "Sub Heading 1a",
            accessor: "firstcolumn"
          },
          {
            Header: "Sub Heading 1b",
            accessor: "secondcolumn"
          }
        ]
      },
      {
        Header: "Heading 2",
        Footer: "Footer 2",
        columns: [
          {
            accessor: "thirdcolumn"
          }
        ]
      }
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        firstcolumn: "Row 1 Column 1",
        secondcolumn: "Row 1 Column 2",
        thirdcolumn: "Row 1 Column 3"
      },
      {
        firstcolumn: "Row 2 Column 1",
        secondcolumn: "Row 2 Column 2",
        thirdcolumn: "Row 2 Column 3"
      },
      {
        firstcolumn: "Row 3 Column 1",
        secondcolumn: "Row 3 Column 2",
        thirdcolumn: "Row 3 Column 3"
      },
      {
        firstcolumn: "Row 4 Column 1",
        secondcolumn: "Row 4 Column 2",
        thirdcolumn: "Row 4 Column 3"
      },
      {
        firstcolumn: "Row 5 Column 1",
        secondcolumn: "Row 5 Column 2",
        thirdcolumn: "Row 5 Column 3"
      },
      {
        firstcolumn: "Row 6 Column 1",
        secondcolumn: "Row 6 Column 2",
        thirdcolumn: "Row 6 Column 3"
      },
      {
        firstcolumn: "Row 7 Column 1",
        secondcolumn: "Row 7 Column 2",
        thirdcolumn: "Row 7 Column 3"
      },
      {
        firstcolumn: "Row 8 Column 1",
        secondcolumn: "Row 8 Column 2",
        thirdcolumn: "Row 8 Column 3"
      },
      {
        firstcolumn: "Row 9 Column 1",
        secondcolumn: "Row 9 Column 2",
        thirdcolumn: "Row 9 Column 3"
      },
      {
        firstcolumn: "Row 10 Column 1",
        secondcolumn: "Row 10 Column 2",
        thirdcolumn: "Row 10 Column 3"
      },
      {
        firstcolumn: "Row 11 Column 1",
        secondcolumn: "Row 11 Column 2",
        thirdcolumn: "Row 11 Column 3"
      },
      {
        firstcolumn: "Row 12 Column 1",
        secondcolumn: "Row 12 Column 2",
        thirdcolumn: "Row 12 Column 3"
      }
    ],
    []
  );

  return <Table columns={columns} data={data} />;
}

export default Testgrid;