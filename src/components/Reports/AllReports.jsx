import { useEffect, useState } from "react";
import { useReport } from "../../contexts/ReportContext.jsx";
import { usePagination } from "../../hooks/usePagination.jsx";
import CommonDataTable from "../common/DataTable.jsx";
import { useNavigate } from "react-router-dom";

export const allReportsColumns = [
  {
    name: "ID",
    selector: (row) => row?.id,
    width: "60px",
    minWidth: "60px",
    center: true,
    cell: (row) => row?.id ?? "-",
  },
  {
    name: "Status",
    selector: (row) => row?.status,
    minWidth: "140px",
    width: "140px",
    center: true,
    cell: (row) => (
      <>
        {row?.status === "Violation" ? (
          <span className="status-tag ban">{row?.status}</span>
        ) : row.status === "No Violation" ? (
          <span className="status-tag warn">{row?.status}</span>
        ) : (
          <span className="status-tag normal">{row?.status}</span>
        )}
      </>
    ),
  },
  {
    name: "Report Time",
    selector: (row) => row?.createdAt,
    minWidth: "130px",
    width: "130px",
    center: true,
    cell: (row) =>
      row?.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
  },
  {
    name: "Reporting User",
    selector: (row) => row?.Reporter?.username,
    minWidth: "150px",
    cell: (row) => row?.Reporter?.username ?? "-",
  },
  {
    name: "Reported User",
    selector: (row) => row?.ReportedUser?.username,
    minWidth: "140px",
    cell: (row) => row?.ReportedUser?.username ?? "-",
  },
  {
    name: "Theme",
    selector: (row) => row?.Competition?.Contest?.Theme?.name,
    minWidth: "120px",
    cell: (row) => row?.Competition?.Contest?.Theme?.name ?? "-",
  },
  {
    name: "Contest ID",
    selector: (row) => row?.competition_id,
    minWidth: "130px",
    width: "130px",
    center: true,
    cell: (row) => row?.competition_id ?? "-",
  },
  {
    name: "Report Category",
    selector: (row) => row?.categories,
    minWidth: "160px",
    cell: (row) =>
      Array.isArray(row?.categories)
        ? row.categories.join(", ")
        : row?.categories ?? "-",
  },
];
const options = ["All", "Violation", "No Violation", "New"];
const AllReports = () => {
  const { allReports, allReportsLoading, fetchAllReports } = useReport();
  const navigate = useNavigate();
  //** Pagination
  const { paginationData, setPaginationData, clearPagination } = usePagination({
    perPageData: 10,
  });
  const [filterValue, setFilterValue] = useState("All");

  useEffect(() => {
    fetchAllReports({ ...paginationData, filter: filterValue });
    // eslint-disable-next-line
  }, [paginationData.page, paginationData.pageSize, filterValue]);

  return (
    <div className="reports-table-full">
      <div className="reports-header-with-select">
        <h2 className="custom-heading-title">
          Reports - WARNING POTENTIALLY UNSAFE CONTENT
        </h2>
        <select
          className="common-filter-select"
          id="report-filter"
          value={filterValue}
          onChange={(e) => {
            clearPagination();
            setFilterValue(e.target.value);
          }}
        >
          {options.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </div>
      <CommonDataTable
        tableColumns={allReportsColumns}
        tableData={allReports?.report || []}
        tableDataTotalCount={allReports?.reportCount || allReports.length}
        isLoading={allReportsLoading}
        pagination={allReports?.reportCount > 10}
        paginationData={paginationData}
        setPaginationData={setPaginationData}
        isRowClicked={true}
        onRowClicked={(row) => {
          navigate("/admin-console/reports/" + row.id);
        }}
      />
    </div>
  );
};

export default AllReports;
