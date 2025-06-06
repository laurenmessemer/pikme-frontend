import { useNavigate } from "react-router-dom";
import { useReport } from "../../contexts/ReportContext.jsx";
import { usePagination } from "../../hooks/usePagination.jsx";
import CommonDataTable from "../common/DataTable.jsx";
import { useEffect } from "react";

// Columns for flagged users (reported users)
export const flaggedUserColumns = [
  {
    name: "ID",
    selector: (row) => row?.reported_user_id,
    width: "60px",
    minWidth: "60px",
    center:true,
    cell: (row) => row?.reported_user_id ?? "-",
  },
  {
    name: "Flagged User",
    selector: (row) => row?.username,
    minWidth: "150px",
    cell: (row) => row?.username ?? "-",
  },
  {
    name: "Username",
    selector: (row) => row?.username,
    minWidth: "150px",
    cell: (row) => row?.username ?? "-",
  },
  // {
  //   name: "User ID",
  //   selector: (row) => row?.reported_user_id,
  //   cell: (row) => row?.reported_user_id ?? "-",
  // },
  {
    name: "Report Count",
    selector: (row) => row?.count,
    minWidth: "140px",
    width: "140px",
    center: true,
    cell: (row) => row?.count ?? "-",
  },
];

const FlaggedUserReports = () => {
  const { reportedReports, reportedReportsLoading, fetchReportedReports } =
    useReport();

  //** Pagination
  const { paginationData, setPaginationData } = usePagination({
    perPageData: 5,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchReportedReports(paginationData);
    // eslint-disable-next-line
  }, [paginationData.page, paginationData.pageSize]);

  return (
    <div className="reports-table-half">
      <CommonDataTable
        tableColumns={flaggedUserColumns}
        tableData={reportedReports?.report || []}
        tableDataTotalCount={
          reportedReports?.reportCount || reportedReports.length
        }
        isLoading={reportedReportsLoading}
        pagination={reportedReports?.reportCount > 5}
        isRowClicked={true}
        paginationData={paginationData}
        setPaginationData={setPaginationData}
        title="Flagged Users"
        onRowClicked={(row) => {
          navigate(
            "/admin-console/reports/flagged-user/" + row.reported_user_id
          );
        }}
        sortServer
      />
    </div>
  );
};

export default FlaggedUserReports;
