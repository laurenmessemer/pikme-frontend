import { useState } from 'react'

export const usePagination = ({ perPageData = 10 }) => {
  const [paginationData, setPaginationData] = useState({
    page: 1,
    pageSize: perPageData
  })



  const [sorting, setSorting] = useState({
    sortName: '',
    direction: null,
  });

  const nextPage = () => {
    setPaginationData(prev => ({
      ...prev,
      page: prev.page + 1
    }))
  }

  const clearPagination = () => {
    setPaginationData(prev => ({
      ...prev,
      page: 1
    }))
  }

  const prevPage = () => {
    if (paginationData.page === 1) return
    setPaginationData(prev => ({
      ...prev,
      page: prev.page - 1
    }))
  }

  const totalCounterPaginate = (total = 0, rowsPerPage = 10) => {
    return Number(Math.ceil(total / rowsPerPage))
  }

  /**
   * The function takes in data, sort direction, and sorting columns as parameters and updates the
   * sorting state based on the specified column and direction.
   */
  const sortingFunction = ({ data, sortDirection, sortingColumns }) => {
    sortingColumns.forEach((column) => {
      if (data.name === column.columnName) {
        setSorting((prev) => ({
          ...prev,
          sortName: column.payloadKey,
        }));
      }
    });
    setSorting((prev) => ({
      ...prev,
      direction: sortDirection.toUpperCase(),
    }));
  };

  return {
    nextPage,
    prevPage,
    totalCounterPaginate,
    clearPagination,
    onManageSorting: sortingFunction,
    currentSort: sorting,
    setPaginationData: setPaginationData,
    paginationData
  }
}
