import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "../redux/actions";
import requestApi from "../helpers/api";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({});
  const [isSelectedFile, setIsSelectedFile] = useState(false);

  useEffect(() => {
    dispatch(actions.controlLoading(true));
    requestApi("/users/profile", "GET")
      .then((res) => {
        dispatch(actions.controlLoading(false));
        setProfileData({
          ...res.data,
          avatar: process.env.REACT_APP_API_URL + "/" + res.data.avatar,
        });
      })
      .catch((error) => {
        dispatch(actions.controlLoading(false));
        console.log("Loi khi truy xuat profile: ", error);
      });
  }, []);

  // func onImageChange
  const onImageChange = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({
          ...profileData,
          avatar: reader.result,
          file: file,
        });
        setIsSelectedFile(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // func handleUpdateAvatar
  const handleUpdateAvatar = () => {
    dispatch(actions.controlLoading(true));

    // create data.form like postman
    let formData = new FormData();
    formData.append("avatar", profileData.file);
    requestApi(
      "/users/upload-avatar",
      "POST",
      formData,
      "json",
      "multipart/form-data"
    )
      .then((res) => {
        console.log(">> ket qua tu api upload: ", res);
        dispatch(actions.controlLoading(false));
        toast.success("Avatar has been updated successfully", {
          position: "top-center",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        console.log(">> co loi upload avatar: ", error);
        dispatch(actions.controlLoading(true));
      });
  };

  return (
    <>
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid px-4">
            <h1 className="mt-4">Profile</h1>
            <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">Update avatar</li>
            </ol>
            <div className="card mb-4">
              <div className="card-body">
                <div className="row mb-3">
                  <img
                    style={{ width: "300px", height: "auto" }}
                    src={
                      profileData
                        ? profileData.avatar
                        : "../assets/images/default-avatar.png"
                    }
                    alt="avatar"
                    className="img-thumbnail rounded mb-2"
                  />
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <div className="input-file float-start">
                      <label
                        htmlFor="file"
                        className="btn-file btn-sm btn btn-primary"
                      >
                        Browse Files
                      </label>
                      <input
                        onChange={onImageChange}
                        id="file"
                        type="file"
                        accept="image/*"
                      />
                      {isSelectedFile && (
                        <button
                          onClick={handleUpdateAvatar}
                          type="button"
                          className="btn btn-sm btn-success float-end"
                        >
                          Update
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Profile;
