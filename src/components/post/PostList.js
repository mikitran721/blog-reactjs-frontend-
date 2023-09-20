import React, { useEffect, useState } from "react";
import DataTable from "../common/DataTable";
import requestApi from "../../helpers/api";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatDateTime } from "../../helpers/common";

const PostList = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [numOfPage, setNumOfPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchString, setSearchString] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [deletedItem, setDeleteItem] = useState(null);
  const [deleteType, setDeleteType] = useState("single");
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(Date.now());

  //column table
  const columns = [
    {
      name: "ID",
      element: (row) => row.id,
    },
    {
      name: "Title",
      element: (row) => row.title,
    },
    {
      name: "Thumbnail",
      element: (row) => (
        <img
          width="70px"
          alt="thumbnail"
          src={process.env.REACT_APP_API_URL + "/" + row.thumbnail}
        />
      ),
    },
    {
      name: "Status",
      element: (row) => (row.status === 1 ? "Active" : "Inactive"),
    },
    {
      name: "Created at",
      element: (row) => formatDateTime(row.created_at),
    },
    {
      name: "Updated at",
      element: (row) => formatDateTime(row.updated_at),
    },
    {
      name: "Actions",
      element: (row) => (
        <>
          <Link
            to={`/user/edit/${row.id}`}
            className="btn btn-sm btn-warning me-1"
          >
            <i className="fa fa-pencil"> &nbsp; Edit</i>
          </Link>
          <button
            className="btn btn-sm btn-danger me-1"
            type="button"
            onClick={() => handleDelete(row.id)}
          >
            <i className="fa fa-trash"> &nbsp; Delete</i>
          </button>
        </>
      ),
    },
  ];

  // function formatDateTime
  /* const formatDateTime = (datetime) => {
    return moment(datetime).format("DD/MM/YYYY h:mm:ss A");
  }; */

  // func handle delete
  const handleDelete = (id) => {
    // console.log(">> single delete id ", id);
    setShowModal(true);
    setDeleteItem(id);
    setDeleteType("single");
  };

  // func handleMultiDelete
  const handleMultiDelete = () => {
    // console.log(">> Func MultiDelete ", selectedRows);
    setShowModal(true);
    setDeleteType("multi");
  };

  // request deleteApi
  const requestDeletedApi = () => {
    //kt deleteType
    if (deleteType === "single") {
      dispatch(actions.controlLoading(true));
      requestApi(`/posts/${deletedItem}`, "DELETE", [])
        .then((response) => {
          setShowModal(false);
          setRefresh(Date.now());
          dispatch(actions.controlLoading(false));
        })
        .catch((err) => {
          console.log(">> Co loi khi xoa user: ", err);
          setShowModal(false);
          dispatch(actions.controlLoading(false));
        });
    } else {
      dispatch(actions.controlLoading(true));
      requestApi(`/posts/multiple?ids=${selectedRows.toString()}`, "DELETE", [])
        .then((response) => {
          setShowModal(false);
          setRefresh(Date.now());
          setSelectedRows([]);
          dispatch(actions.controlLoading(false));
        })
        .catch((err) => {
          console.log(">> Co loi khi xoa user: ", err);
          setShowModal(false);
          dispatch(actions.controlLoading(false));
        });
    }
  };

  //goi api get users
  useEffect(() => {
    dispatch(actions.controlLoading(true));
    // them tham so cho pagination -> chen vao cung endpoint
    let query = `?items_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`;

    requestApi(`/posts${query}`, "GET", [])
      .then((response) => {
        // console.log(">> user list api: ", response.data);
        setPosts(response.data.data);
        setNumOfPage(response.data.lastPage);
        dispatch(actions.controlLoading(false));
      })
      .catch((err) => {
        console.log("Loi khi get posts tu api: ", err);
        dispatch(actions.controlLoading(false));
      });
  }, [currentPage, itemsPerPage, searchString, refresh]);

  return (
    <>
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid px-4">
            <h1 className="mt-4">Tables</h1>
            <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">User list</li>
            </ol>
            <div className="mb-3">
              <Link className="btn btn-sm btn-success me-2" to="/user/add">
                <i className="fa fa-plus"></i>&nbsp;Add new
              </Link>
              {selectedRows.length > 0 && (
                <button
                  onClick={handleMultiDelete}
                  type="button"
                  className="btn btn-sm btn-danger"
                >
                  <i className="fa fa-trash"></i>&nbsp;Delete
                </button>
              )}
            </div>
            <DataTable
              name="List Post"
              data={posts}
              columns={columns}
              numOfPage={numOfPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              onChangeItemsPerPage={setItemsPerPage}
              onKeySearch={(keyWord) => {
                // console.log(">> tu khoa search ", keyWord);
                setSearchString(keyWord);
              }}
              onSelectedRow={(rows) => {
                setSelectedRows(rows);
              }}
            />
          </div>
        </main>
        {/* Modal.bootstrap confirmation */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="sm">
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure want to delete?</Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShowModal(false)}>Close</Button>
            <Button className="btn-danger" onClick={requestDeletedApi}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default PostList;
