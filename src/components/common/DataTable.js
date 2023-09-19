import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import LiveSearch from "./LiveSearch";

const DataTable = (props) => {
  const {
    name,
    data,
    columns,
    currentPage,
    numOfPage,
    onPageChange,
    onChangeItemsPerPage,
    onKeySearch,
    onSelectedRow,
  } = props;

  // state for multiple delete
  const [selectedRows, setSelectedRows] = useState([]);

  const renderHeaders = () => {
    return columns.map((col, index) => <th key={index}>{col.name}</th>);
  };

  const onClickCheckbox = (event) => {
    let checked = event.target.checked;
    let value = event.target.value;
    if (checked) {
      if (!selectedRows.includes(value)) {
        setSelectedRows([...selectedRows, value]);
      }
    } else {
      // neu ko check, se xoa neu co o selected.rows
      let index = selectedRows.indexOf(value);
      const temp = [...selectedRows];
      temp.splice(index, 1);
      setSelectedRows(temp);
    }
  };

  // select all to delete / current page
  const onSelectAll = (event) => {
    if (event.target.checked) {
      const temp = data.map((element) => {
        return String(element.id);
      });
      setSelectedRows(temp);
    } else {
      setSelectedRows([]);
    }
  };

  useEffect(() => {
    // console.log(">> checkbox: ", selectedRows);
    onSelectedRow(selectedRows);
  }, [selectedRows]);

  //render table data
  const renderData = () => {
    let html = data.map((item, index) => {
      return (
        <tr key={index}>
          <td>
            <input
              checked={selectedRows.includes(String(item.id)) ? true : false}
              value={item.id}
              onChange={onClickCheckbox}
              type="checkbox"
              className="form-check-input"
            />
          </td>
          {columns.map((col, ind) => {
            return <td key={ind}>{col.element(item)}</td>;
          })}
        </tr>
      );
    });
    return html;
  };

  //render pagination
  const renderPagination = () => {
    const pagination = [];
    const nextPage = currentPage + 1 > numOfPage ? null : currentPage + 1;
    const prevPage = currentPage - 1 < 1 ? null : currentPage - 1;

    pagination.push(
      <li key="prev" className={prevPage ? "page-item" : "page-item disabled"}>
        <button className="page-link" onClick={() => onPageChange(prevPage)}>
          &laquo;
        </button>
      </li>
    );
    for (let i = 1; i <= numOfPage; i++) {
      pagination.push(
        <li
          key={i}
          className={currentPage === i ? "page-item active" : "page-item"}
        >
          <button onClick={() => onPageChange(i)} className="page-link">
            {i}
          </button>
        </li>
      );
    }

    pagination.push(
      <li key="next" className={nextPage ? "page-item" : "page-item disabled"}>
        <button className="page-link" onClick={() => onPageChange(nextPage)}>
          &raquo;
        </button>
      </li>
    );

    return pagination;
  };

  // handle change items-per-page
  const onChangeOption = (event) => {
    const target = event.target;
    onChangeItemsPerPage(target.value);
  };
  return (
    <>
      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1"></i>
          {name}
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-sm-12 col-md-6">
              <label className="d-inline-flex">
                Show
                <select
                  onChange={onChangeOption}
                  name=""
                  id=""
                  className="form-select form-select-sm ms-1 me-1"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option selected={true} value="5">
                    5
                  </option>
                  <option value="10">10</option>
                </select>
                Entries
              </label>
            </div>
            {/* search box */}
            <div className="col-sm-12 col-md-6">
              <label className="d-inline-flex float-end">
                Search:
                <LiveSearch onKeySearch={onKeySearch} />
              </label>
            </div>

            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>
                    <input
                      checked={
                        selectedRows.length === data.length && data.length > 0
                          ? true
                          : false
                      }
                      onChange={onSelectAll}
                      type="checkbox"
                      className="form-check-input"
                    />
                  </th>
                  {renderHeaders()}
                </tr>
              </thead>
              <tbody>{renderData()}</tbody>
              <tfoot>
                <tr>
                  <th>...</th>
                  {renderHeaders()}
                </tr>
              </tfoot>
            </table>

            {/* neu co 1 page thi an pagination */}
            {numOfPage > 1 && (
              <div className="row">
                <div className="col-sm-12 col-md-7">
                  <ul className="pagination justify-content-end">
                    {renderPagination()}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DataTable;
