import React, { useEffect, useState } from "react";
import DataTable from "../common/DataTable";
import requestApi from "../../helpers/api";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";

const UserList = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [numOfPage, setNumOfPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  //column table
  const columns = [
    {
      name: "ID",
      element: (row) => row.id,
    },
    {
      name: "First name",
      element: (row) => row.firstName,
    },
    {
      name: "Last name",
      element: (row) => row.lastName,
    },
    {
      name: "Email",
      element: (row) => row.email,
    },
    {
      name: "Created at",
      element: (row) => row.created_at,
    },
    {
      name: "Updated at",
      element: (row) => row.updated_at,
    },
    {
      name: "Actions",
      element: (row) => (
        <>
          <button className="btn btn-sm btn-warning me-1" type="button">
            <i className="fa fa-pencil"> &nbsp; Edit</i>
          </button>
          <button className="btn btn-sm btn-danger me-1" type="button">
            <i className="fa fa-trash"> &nbsp; Delete</i>
          </button>
        </>
      ),
    },
  ];

  //goi api get users
  useEffect(() => {
    dispatch(actions.controlLoading(true));
    // them tham so cho pagination -> chen vao cung endpoint
    let query = `?items_per_page=${itemsPerPage}&page=${currentPage}`;

    requestApi(`/users${query}`, "GET", [])
      .then((response) => {
        console.log(">> user list api: ", response.data);
        setUsers(response.data.data);
        setNumOfPage(response.data.lastPage);
        dispatch(actions.controlLoading(false));
      })
      .catch((err) => {
        console.log("Loi khi get users tu api: ", err);
        dispatch(actions.controlLoading(false));
      });
  }, [currentPage, itemsPerPage]);

  return (
    <>
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid px-4">
            <h1 className="mt-4">Tables</h1>
            <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Tables</li>
            </ol>
            <DataTable
              name="List User"
              data={users}
              columns={columns}
              numOfPage={numOfPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default UserList;
