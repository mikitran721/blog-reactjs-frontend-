import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import requestApi from "../helpers/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import * as actions from "../redux/actions";

const Login = () => {
  const navigate = useNavigate();

  // su dung redux
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({});
  // sate quan ly error
  const [formErrors, setFormErrors] = useState({});

  // state xoa loi khi user nhap dung
  const [isSubmitted, setIsSubmitted] = useState(false);

  // luu data khi user nhap
  const onChange = (event) => {
    //luu data user nhap vao form
    let target = event.target;
    setLoginData({
      ...loginData,
      [target.name]: target.value,
    });
  };

  // xoa loi khi user nhap dung
  useEffect(() => {
    if (isSubmitted) {
      validateForm();
    }
  }, [loginData]);

  // validate form data
  const validateForm = () => {
    let isValid = true;
    let errors = {};

    // validate email
    if (loginData.email === "" || loginData.email === undefined) {
      errors.email = "Vui long nhap email";
    } else {
      let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        loginData.email
      );
      if (!valid) {
        errors.email = "Email is not valid";
      }
    }

    // validate password
    if (loginData.password === "" || loginData.password === undefined) {
      errors.password = "Please enter password";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      isValid = false;
    } else {
      setFormErrors({});
    }

    return isValid;
  };
  // xu ly submit
  const onSubmit = () => {
    // console.log(loginData);
    let valid = validateForm();
    if (valid) {
      //goi sd redux
      dispatch(actions.controlLoading(true));

      // request api login
      console.log(">> request login api start ");
      requestApi("/auth/login", "POST", loginData)
        .then((res) => {
          console.log(">> check api auth/login, res: ", res);
          //luu vao local.storage
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("refresh_token", res.data.refresh_token);

          // an loading sau khi luu token
          dispatch(actions.controlLoading(false));

          navigate("/"); //chuyen huong ve dashboard
        })
        .catch((error) => {
          //an loading redux
          dispatch(actions.controlLoading(false));

          console.log("Loi khi truy cap api auth/login: ", error);
          if (typeof error.response !== undefined) {
            if (error.response.status !== 201) {
              toast.error(error.response.data.message, {
                position: "top-center",
              });
            } else {
              toast.error("Server is down. Please try again", {
                position: "top-center",
              });
            }
          }
        });
    }

    setIsSubmitted(true);
  };

  return (
    <>
      <div id="layoutAuthentication" className="bg-primary">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Login
                      </h3>
                    </div>
                    <div className="card-body">
                      <form>
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            onChange={onChange}
                          />
                          <label>Email address</label>
                          {formErrors.email && (
                            <p style={{ color: "red" }}>{formErrors.email}</p>
                          )}
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={onChange}
                          />
                          <label>Password</label>
                          {formErrors.password && (
                            <p style={{ color: "red" }}>
                              {formErrors.password}
                            </p>
                          )}
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <a className="small" href="password.html">
                            Forgot Password?
                          </a>
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={onSubmit}
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center py-3">
                      <div className="small">
                        <Link to="/register">Need an account? Sign up!</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div id="layoutAuthentication_footer">
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">
                  Copyright &copy; Miki.Tran 2023
                </div>
                <div>
                  <a href="#">Privacy Policy</a>
                  &middot;
                  <a href="#">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Login;
