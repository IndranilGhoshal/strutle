import Resizer from "react-image-file-resizer";

export const resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file, // Is the file of the image which will resized.
            300, // Is the maxWidth of the resized new image.
            300, // Is the maxHeight of the resized new image.
            "JPEG", // Is the compressFormat of the resized new image.
            100, // Is the quality of the resized new image.
            0, // Is the degree of clockwise rotation to apply to uploaded image.
            (uri) => {
                resolve(uri);
            }, // Is the callBack function of the resized new image URI.
            "file", // Is the output type of the resized new image.
            300, // Is the minWidth of the resized new image.
            300 // Is the minHeight of the resized new image.
        );
    });