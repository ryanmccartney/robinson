import { useState, useRef, useEffect, useContext } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { BarcodeDetector } from "barcode-detector";
import { enqueueSnackbar } from "notistack";
import isbn from "isbn3";
import Box from "@mui/material/Box";

import fetcher from "@utils/fetcher";
import BreadcrumbsContext from "@contexts/breadcrumbs";
import EditableTypography from "@components/EditableTypography";

const Scan = () => {
    const navigate = useNavigate();
    const webcamRef = useRef(null);
    const [barcode, setBarcode] = useState("");
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    const { setBreadcrumbs } = useContext(BreadcrumbsContext);

    const barcodeDetector = new BarcodeDetector({
        formats: ["ean_13", "qr_code"],
    });

    const addBook = async (isbnObject) => {
        if (isbnObject) {
            enqueueSnackbar(
                `ISBN is valid, searching for ${isbnObject.isbn13h}...`
            );

            const data = await fetcher.post(`metadata/${isbnObject.isbn13}`);
            if (data.book) {
                enqueueSnackbar(`Created a book called ${data.book.title}`, {
                    variant: "info",
                });
                navigate(`/book/${data.book.bookId}`);
            } else {
                enqueueSnackbar(
                    `Could not find a book for ${isbnObject.isbn13h}`,
                    {
                        variant: "error",
                    }
                );
            }
        }
    };

    useEffect(() => {
        setBreadcrumbs([]);

        const processImage = async () => {
            const canvas = await webcamRef.current.getCanvas();
            if (canvas) {
                const image = await new Promise((resolve) =>
                    canvas.toBlob(resolve)
                );
                const newBarcode = await barcodeDetector.detect(image);

                if (
                    newBarcode.length > 0 &&
                    newBarcode[0].rawValue &&
                    newBarcode[0].format == "ean_13" &&
                    newBarcode[0].rawValue !== barcode
                ) {
                    setBarcode(newBarcode[0].rawValue);
                    checkForIsbn(newBarcode[0].rawValue);
                }
            }
        };

        const id = setInterval(processImage, 100);
        return () => clearInterval(id);
    }, [barcode]);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const checkForIsbn = (rawText) => {
        if (rawText) {
            const isbnObject = isbn.parse(rawText);
            if (isbnObject) {
                addBook(isbnObject);
            }
        }
    };

    return (
        <Box sx={{ height: "83vh", overflow: "hidden" }}>
            <Webcam
                style={{ width: "100%" }}
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                    facingMode: "environment",
                    aspectRatio: windowSize.width / windowSize.height,
                }}
            ></Webcam>

            <Box
                sx={{
                    alignItems: "center",
                    position: "absolute",
                    bottom: "6rem",
                    width: "50%",
                    left: "25%",
                }}
            >
                <EditableTypography
                    sx={{ opacity: 0.5 }}
                    align="center"
                    onChange={({ data }) => checkForIsbn(data)}
                    variant="h4"
                    edit={true}
                    multiline={false}
                ></EditableTypography>
            </Box>
        </Box>
    );
};
export default Scan;
