import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import requestApi from "../../helpers/api";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { render } from "@testing-library/react";
import CustomUploadAdapter from "../../helpers/CustomUploadAdapter";

const PostUpdate = () => {
  // state luu thumbnail khi user chon
  const [categories, setCategories] = useState([]);
  const [postData, setPostData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

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
    try {
      const renderData = async () => {
        const res = await requestApi("/categories", "GET");
        // console.log(">> categories list: ", res);
        setCategories(res.data);

        //detail post
        const detailPost = await requestApi(`/posts/${params.id}`, "GET");
        // console.log(">> detail post: ", detailPost);

        // fields can set du lieu
        const fields = [
          "title",
          "summary",
          "description",
          "thumbnail",
          "category",
          "status",
        ];
        fields.forEach((field) => {
          //chi lay category.id
          if (field == "category") {
            setValue(field, detailPost.data[field].id);
          } else {
            setValue(field, detailPost.data[field]);
          }
        });
        dispatch(actions.controlLoading(false));
        setPostData({
          ...detailPost.data,
          thumbnail:
            process.env.REACT_APP_API_URL + "/" + detailPost.data.thumbnail,
        });
      };
      renderData();
    } catch (error) {
      console.log(">> co loi khi truy van data cho post detail: ", error);
      dispatch(actions.controlLoading(false));
    }
  }, []);

  // func handleSubmitFormAdd: theo dang form-data
  const handleSubmitFormAdd = async (data) => {
    console.log(">> data for update post: ", data);
    let formData = new FormData();
    for (let key in data) {
      if (key === "thumbnail") {
        if (data.thumbnail[0] instanceof File)
          formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi(
        `/posts/${params.id}`,
        "PUT",
        formData,
        "json",
        "multipart/form-data"
      );
      // console.log(">> ket qua tu api ", res);
      dispatch(actions.controlLoading(false));
      toast.success("Post has been updated successfully", {
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
        setPostData({ ...postData, thumbnail: reader.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // function for CKEditor
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new CustomUploadAdapter(loader);
    };
  }

  return (
    <>
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid px-4">
            <h1 className="mt-4">Update Post</h1>
            <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/posts">Posts</Link>
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
                          data={postData.description}
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
                          config={{
                            extraPlugins: [uploadPlugin],
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
                        {postData.thumbnail && (
                          <img
                            src={postData.thumbnail}
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
                              onChange: onThumbnailChange,
                            })}
                          />
                        </div>
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

export default PostUpdate;
