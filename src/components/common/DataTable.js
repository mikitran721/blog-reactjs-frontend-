import { render } from "@testing-library/react";
import React from "react";

const DataTable = (props) => {
  const { name, data, columns } = props;

  const renderHeaders = () => {
    return columns.map((col, index) => <th key={index}>{col.name}</th>);
  };

  //render table data
  const renderData = () => {
    let html = data.map((item, index) => {
      return (
        <tr key={index}>
          {columns.map((col, ind) => {
            return <td key={ind}>{col.element(item)}</td>;
          })}
        </tr>
      );
    });
    return html;
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
                  name=""
                  id=""
                  className="form-select form-select-sm ms-1 me-1"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                </select>
                Entries
              </label>
            </div>
            {/* search box */}
            <div className="col-sm-12 col-md-6">
              <label className="d-inline-flex float-end">
                Search:
                <input
                  type="search"
                  placeholder="Email or Name"
                  className="form-control form-control-sm ms-1"
                />
              </label>
            </div>

            <table className="table table-striped table-hover">
              <thead>
                <tr>{renderHeaders()}</tr>
              </thead>
              <tbody>{renderData()}</tbody>
              <tfoot>
                <tr>{renderHeaders()}</tr>
              </tfoot>
            </table>

            <div className="row">
              <div className="col-sm-12 col-md-7">
                <ul className="pagination justify-content-end">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataTable;
