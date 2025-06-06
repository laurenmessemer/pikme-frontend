import { useReport } from "../../contexts/ReportContext.jsx";
import { usePagination } from "../../hooks/usePagination.jsx";
import CommonDataTable from "../common/DataTable.jsx";
import { useEffect } from "react";

const ReportedImages = () => {
  const { reportedImages, reportedImagesLoading, fetchReportedImages } =
    useReport();

  //** Pagination
  const { paginationData, setPaginationData } = usePagination({
    perPageData: 5,
  });

  useEffect(() => {
    fetchReportedImages(paginationData);
    // eslint-disable-next-line
  }, [paginationData.page, paginationData.pageSize]);

  // Columns for reported images
  const reportedImageColumns = [
    {
      name: "ID",
      selector: (row) => row?.reported_user_id,
      width: "60px",
      minWidth: "60px",
      center: true,
      cell: (row) => row?.reported_user_id ?? "-",
    },
    {
      name: "Theme",
      selector: (row) => row?.theme_name,
      minWidth: "120px",
      cell: (row) => row?.theme_name ?? "-",
    },
    // {
    //   name: "Image",
    //   selector: (row) => row?.image_url,
    //   width: "100px",
    //   cell: (row) =>
    //     row?.image_url ? (
    //       <img
    //         src={row.image_url}
    //         alt="Reported content"
    //         style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
    //       />
    //     ) : "-"
    // },
    {
      name: "Username",
      selector: (row) => row?.username,
      minWidth: "150px",
      cell: (row) => row?.username ?? "-",
    },
    {
      name: "Competition ID",
      selector: (row) => row?.competition_id,
      minWidth: "160px",
      width: "160px",
      center: true,
      cell: (row) => row?.competition_id ?? "-",
    },
    {
      name: "Report Count",
      selector: (row) => row?.count,
      minWidth: "140px",
      width: "140px",
      center: true,
      cell: (row) => row?.count ?? "-",
    },
  ];

  return (
    <div className="reports-table-half">
      <CommonDataTable
        tableColumns={reportedImageColumns}
        tableData={reportedImages?.report || []}
        tableDataTotalCount={
          reportedImages?.reportCount || reportedImages.length
        }
        isLoading={reportedImagesLoading}
        pagination={reportedImages?.reportCount > 5}
        paginationData={paginationData}
        setPaginationData={setPaginationData}
        title="Flagged Entries (Images)"
        sortServer
      />
    </div>
  );
};

export default ReportedImages;
