import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import requestApi from "../../helpers/api";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const PostAdd = () => {
  // state luu thumbnail khi user chon
  const [thumbnail, setThumbnail] = useState("");
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //mot so func tu react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(actions.controlLoading(true));
    requestApi("/categories", "GET")
      .then((res) => {
        // console.log(">> data from category: ", res.data);
        setCategories(res.data);
        dispatch(actions.controlLoading(false));
      })
      .catch((error) => {
        console.log(">> co loi khi truy xuat api category: ", error);
        dispatch(actions.controlLoading(false));
      });
  }, []);

  // func handleSubmitFormAdd: theo dang form-data
  const handleSubmitFormAdd = async (data) => {
    // console.log(">> data for add new post: ", data);
    let formData = new FormData();
    for (let key in data) {
      if (key === "thumbnail") {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi(
        `/posts`,
        "POST",
        formData,
        "json",
        "multipart/form-data"
      );
      // console.log(">> ket qua tu api ", res);
      dispatch(actions.controlLoading(false));
      toast.success("Post has been created successfully", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/posts"), 3000);
    } catch (error) {
      console.log("Co loi khi goi api: ", error);
      dispatch(actions.controlLoading(false));
    }
  };

  // func: onThumbnailChange,
  const onThumbnailChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <>
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid px-4">
            <h1 className="mt-4">New Post</h1>
            <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/posts">Posts</Link>
              </li>
              <li className="breadcrumb-item active">Add new</li>
            </ol>
            <div className="mb-3">
              <div className="card-header">
                <i className="fas fa-plus me-1"></i>Add
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  {/* form add */}
                  <form>
                    <div className="col-md-6">
                      <div className="mb-3 mt-3">
                        <label className="form-label">Title:</label>
                        <input
                          {...register("title", {
                            required: "Title is required",
                          })}
                          type="text"
                          placeholder="Enter title..."
                          className="form-control"
                        />
                        {errors.title && (
                          <p style={{ color: "red" }}>{errors.title.message}</p>
                        )}
                      </div>
                      <div className="mb-3 mt-3">
                        <label className="form-label">Summary:</label>
                        <textarea
                          className="form-control"
                          {...register("summary", {
                            required: "Summary is required",
                          })}
                          cols="30"
                          rows="5"
                          placeholder="Enter summary..."
                        ></textarea>
                        {errors.summary && (
                          <p style={{ color: "red" }}>
                            {errors.summary.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Description:</label>
                        <CKEditor
                          editor={ClassicEditor}
                          onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                            register("description", {
                              required: "Description is required",
                            });
                          }}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            // console.log(">> data from CKEditor: ", data);
                            setValue("description", data);
                            trigger("description");
                          }}
                        />
                        {errors.description && (
                          <p style={{ color: "red" }}>
                            {errors.description.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-3 mt-3">
                        <label className="form-label">Thumbnail:</label>
                        <br />
                        {thumbnail && (
                          <img
                            src={thumbnail}
                            alt="Thumbnail"
                            style={{ width: "300px" }}
                            className="mb-2"
                          />
                        )}

                        <div className="input-file">
                          <label
                            htmlFor="file"
                            className="btn-file btn-sm btn btn-primary"
                          >
                            Browse file
                          </label>
                          <input
                            id="file"
                            type="file"
                            name="thumbnail"
                            accept="image/*"
                            {...register("thumbnail", {
                              required: "Thumbnail is required",
                              onChange: onThumbnailChange,
                            })}
                          />
                        </div>
                        {errors.thumbnail && (
                          <p style={{ color: "red" }}>
                            {errors.thumbnail.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Category:</label>
                        <select
                          className="form-select"
                          {...register("category", {
                            required: "Category is required.",
                          })}
                        >
                          <option value="">--Select a category</option>
                          {categories.map((cat) => {
                            return (
                              <option key={cat.id} value={cat.id}>
                                {cat.name}
                              </option>
                            );
                          })}
                        </select>
                        {errors.category && (
                          <p style={{ color: "red" }}>
                            {errors.category.message}
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
                        onClick={handleSubmit(handleSubmitFormAdd)}
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

export default PostAdd;
