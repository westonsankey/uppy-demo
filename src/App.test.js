import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import App from "./App";

jest.mock("@uppy/react", () => ({
  useUppy: () => {
    const Uppy = require("@uppy/core");
    const XHRUpload = require("@uppy/xhr-upload");

    return new Uppy({ autoProceed: true })
      .use(XHRUpload, {
        endpoint: "api",
        method: "POST",
        formData: true,
        fieldName: "file",
      })
      .on("complete", (res) => console.log(res))
      .on("file-added", () => console.log("file added"));
  },
}));

describe("App", () => {
  it("uploads a file", async () => {
    render(<App />);
    const input = screen.getByTestId("file-input");

    expect(input).toBeTruthy();

    const file = new File([new ArrayBuffer(1)], "file.jpg");

    await act(async () => {
      userEvent.upload(input, file);
      await new Promise((resolve) => setTimeout(resolve, 4000));
    });
  });
});
