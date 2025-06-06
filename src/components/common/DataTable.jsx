import DataTable from "react-data-table-component";
import NoData from "./NoData";
import CustomSvgIcon from "../../constant/CustomSvgIcons";
import TableLoader from "./TableLoader";

const CommonDataTable = ({
  tableColumns,
  tableData,
  tableDataTotalCount,
  isLoading = false,
  title = "",
  pagination = true,
  paginationData,
  setPaginationData,
  onPaginationChange,
  customStyles = {},
  isSorting = false,
  className = "",
  handleSort,
  isRowClicked = false,
  onRowClicked = null,
  loaderRows = 6,
  loaderColumns = null,
}) => {
  const defaultCustomStyles = {
    ...customStyles,
  };

  const handlePagination = (page) => {
    if (setPaginationData) {
      setPaginationData((prev) => ({ ...prev, page: page }));
    }
    if (onPaginationChange) {
      onPaginationChange(page);
    }
  };
  const handlePaginationPerPage = (perPage, page) => {
    if (setPaginationData) {
      setPaginationData((prev) => ({ ...prev, pageSize: perPage, page: 1 }));
    }
    if (onPaginationChange) {
      onPaginationChange(page);
    }
  };

  // Calculate columns count if not provided
  const columnsCount = loaderColumns || tableColumns?.length || 4;
  const paginationComponentOptions = {
    rowsPerPageText: "Page:",
  };
  return (
    <div className={`common-custom-table`}>
      {title && <h2 className="custom-heading-title">{title}</h2>}
      <div
        className={`table-responsive ${
          isLoading || tableData?.length === 0 ? "loading" : ""
        }`}
      >
        {isLoading ? (
          <TableLoader rows={loaderRows} columns={columnsCount} />
        ) : (
          <DataTable
            key={paginationData?.pageSize}
            columns={tableColumns}
            data={Array.isArray(tableData) ? tableData : []}
            paginationRowsPerPageOptions={[5, 10, 25]}
            paginationTotalRows={tableDataTotalCount}
            onSort={handleSort}
            progressPending={false}
            paginationDefaultPage={paginationData?.page}
            noHeader
            responsive
            paginationServer
            className={`react-dataTable ${isSorting ? "show-sort-icon" : ""} ${
              isRowClicked ? "is-row-clickable" : ""
            } ${className ? className : ""}`}
            onChangePage={handlePagination}
            onChangeRowsPerPage={handlePaginationPerPage}
            pagination={pagination}
            paginationPerPage={paginationData?.pageSize}
            customStyles={defaultCustomStyles}
            onRowClicked={onRowClicked}
            sortIcon={<CustomSvgIcon icon="PasswordEyeIcon" />}
            sortServer
            noDataComponent={<NoData />}
            paginationComponentOptions={paginationComponentOptions}
          />
        )}
      </div>
    </div>
  );
};

export default CommonDataTable;
