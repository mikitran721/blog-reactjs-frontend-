import axios from "axios";

export default function requestApi(
  endpoint,
  method,
  body = [],
  responseType = "json"
) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  const instance = axios.create({ headers });

  // xu ly cho access&refresh token
  //1. dinh kem token khi refresh 1 api
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access_token");
      // truyen vao header
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //2.response khi expired token
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalConfig = error.config;
      console.log(">> Access token expired");
      if (error.response && error.response.status === 419) {
        try {
          console.log(">> Call refresh token api");
          const result = await instance.post(
            `${process.env.REACT_APP_API_URL}/auth/refresh-token`,
            {
              refresh_token: localStorage.getItem("refresh_token"),
            }
          );

          const { access_token, refresh_token } = result.data;
          //luu lai vao localstorage
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);

          // dinh kem access-token  moi vao header
          originalConfig.headers["Authorization"] = `Bearer ${access_token}`;

          return instance(originalConfig);
        } catch (error) {
          // xu ly khi refresh-token bi loi
          if (error.response && error.response.status === 400) {
            //remove khoi local.storage & redirect ve login/form
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/login";
          }
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance.request({
    method: method,
    url: `${process.env.REACT_APP_API_URL}${endpoint}`,
    data: body,
    responseType: responseType,
  });
}
