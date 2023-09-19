import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import requestApi from "../../helpers/api";
import { toast } from "react-toastify";

const UserUpdate = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  //mot so func tu react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //   lay du lieu tu api
  useEffect(() => {
    dispatch(actions.controlLoading(true));
    try {
      const getDetailUser = async () => {
        const res = await requestApi(`/users/${params.id}`, "GET");
        console.log(">> du lieu tu api cho user: ", res);
        dispatch(actions.controlLoading(false));
        // setup sd setValue.useForm
        const fields = ["firstName", "lastName", "status"];
        fields.forEach((field) => setValue(field, res.data[field]));
      };
      getDetailUser();
    } catch (error) {
      console.log("Co loi khi truy cap user: ", error);
      dispatch(actions.controlLoading(false));
    }
  }, []);

  //   function
  const handleSubmitFormUpdate = async (data) => {
    // console.log("Data update: ", data);
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi(`/users/${params.id}`, "PUT", data);
      console.log(">> du lieu update user: ", res);
      dispatch(actions.controlLoading(false));
      toast.success("User has been updated successfully", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/users"), 3000);
    } catch (error) {
      console.log(">> error when update user: ", error);
      dispatch(actions.controlLoading(false));
    }
  };
  return (
    <>
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid px-4">
            <h1 className="mt-4">Update User</h1>
            <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/users">Users</Link>
              </li>
              <li className="breadcrumb-item active">Update</li>
            </ol>
            <div className="mb-3">
              <div className="card-header">
                <i className="fas fa-plus me-1"></i>Update
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  {/* form add */}
                  <form>
                    <div className="col-md-6">
                      <div className="mb-3 mt-3">
                        <label className="form-label">First name:</label>
                        <input
                          {...register("firstName", {
                            required: "First name is required",
                          })}
                          type="text"
                          placeholder="Enter first name..."
                          className="form-control"
                        />
                        {errors.firstName && (
                          <p style={{ color: "red" }}>
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Last name:</label>
                        <input
                          {...register("lastName", {
                            required: "Last name is required",
                          })}
                          type="text"
                          className="form-control"
                          placeholder="Enter last name"
                        />
                        {errors.lastName && (
                          <p style={{ color: "red" }}>
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                      <div className="mt-3 mb-3">
                        <label className="form-label">Status</label>
                        <select {...register("status")} className="form-select">
                          <option value="1">Active</option>
                          <option value="2">Inactive</option>
                        </select>
                      </div>
                      <button
                        onClick={handleSubmit(handleSubmitFormUpdate)}
                        className="btn btn-success"
                        type="button"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserUpdate;
