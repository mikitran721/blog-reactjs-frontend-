import requestApi from "./api";

export class CustomUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload = () => {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          // upload image to server
          const formData = new FormData();
          formData.append("upload", file);
          requestApi(
            "/posts/cke-upload",
            "POST",
            formData,
            "json",
            "multipart/form-data"
          )
            .then((res) => {
              resolve({
                default: `${process.env.REACT_APP_API_URL}/${res.data.url}`,
              });
            })
            .catch((error) => reject(error));
        })
    );
  };

  render() {
    return <div>CustomUploadAdapter</div>;
  }
}

export default CustomUploadAdapter;
