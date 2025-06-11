/*
 * File: TableLoader.jsx
 * Author: HARSH CHAUHAN
 * Created Date: June 5th, 2025
 * Description: This component handles loading UI of table component.
 */

const TableLoader = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="table-loader-container">
      <div className="table-loader">
        {/* Header Row */}
        <div className="loader-header-row">
          {Array.from({ length: columns }).map((_, index) => (
            <div key={`header-${index}`} className="loader-header-cell">
              <div className="skeleton-line header-skeleton"></div>
            </div>
          ))}
        </div>
        
        {/* Data Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="loader-data-row">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={`cell-${rowIndex}-${colIndex}`} className="loader-data-cell">
                <div className="skeleton-line data-skeleton"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableLoader;
