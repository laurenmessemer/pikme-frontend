import { useEffect, useState } from "react";
import { useReport } from "../../contexts/ReportContext.jsx";
import { usePagination } from "../../hooks/usePagination.jsx";
import CommonDataTable from "../common/DataTable.jsx";
import { useNavigate } from "react-router-dom";
import WinnerImagePopup from "../Popups/WinnerImagePopup.jsx";
import { REPORT_STATUS_CLASSES, REPORT_FILTER_OPTIONS } from "../../constant/appConstants.js";

const AllReports = () => {
  const [selectedImage, setSelectedImage] = useState(null);
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

  const allReportsColumns = [
    {
      name: "ID",
      selector: (row) => row?.id,
      width: "60px",
      minWidth: "60px",
      center: true,
      cell: (row) => row?.id ?? "-",
    },
    {
      name: "Image",
      selector: (row) => row?.image_url,
      width: "80px",
      center: true,
      minWidth: "80px",
      cell: (row) =>
        row?.image_url ? (
          <img
            src={row.image_url}
            onClick={() => setSelectedImage(row.image_url)}
            alt="Reported content"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        ) : (
          "-"
        ),
    },
    {
      name: "Status",
      selector: (row) => row?.final_status,
      minWidth: "190px",
      width: "190px",
      center: true,
      cell: (row) => (
        <span className={`status-tag ${REPORT_STATUS_CLASSES[row?.final_status]}`}>
          {row?.final_status}
        </span>
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
      selector: (row) => row?.reporter_user_username,
      minWidth: "150px",
      cell: (row) => row?.reporter_user_username ?? "-",
    },
    {
      name: "Reported User",
      selector: (row) => row?.reported_user_username,
      minWidth: "140px",
      cell: (row) => row?.reported_user_username ?? "-",
    },
    {
      name: "Theme",
      selector: (row) => row?.theme_name,
      minWidth: "120px",
      cell: (row) => row?.theme_name ?? "-",
    },
    {
      name: "Competition ID",
      selector: (row) => row?.competition_id,
      minWidth: "150px",
      width: "150px",
      center: true,
      cell: (row) => row?.competition_id ?? "-",
    },
    {
      name: "Contest ID",
      selector: (row) => row?.competition_contest_id,
      minWidth: "130px",
      width: "130px",
      center: true,
      cell: (row) => row?.competition_contest_id ?? "-",
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
          {REPORT_FILTER_OPTIONS.map((id) => (
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
      {selectedImage && (
        <WinnerImagePopup
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
          isFullView={true}
        />
      )}
    </div>
  );
};

export default AllReports;
