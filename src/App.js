import { useUppy } from "@uppy/react";
import XHRUpload from "@uppy/xhr-upload";
import Uppy from "@uppy/core";

function App() {
  console.log("rendered");
  const uppy = useUppy(() => {
    return new Uppy({ autoProceed: true })
      .use(XHRUpload, {
        endpoint: "api",
        method: "POST",
        formData: true,
        fieldName: "file",
      })
      .on("complete", (res) => console.log(res))
      .on("file-added", () => console.log("file added"));
  });

  const uploadFile = (file) => {
    console.log("adding file");
    uppy.addFile({
      source: "file-input",
      name: file.name,
      type: file.type,
      data: file,
    });
  };

  return (
    <input
      data-testid="file-input"
      type="file"
      multiple
      accept="image/*"
      onChange={(event) => {
        console.log("file added");
        const files = event.target.files ? Array.from(event.target.files) : [];
        files.forEach(uploadFile);
      }}
    />
  );
}

export default App;
