import React, { useState, useRef, useEffect, useContext } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import EditableTypography from "../components/EditableTypography";
import { BarcodeDetector } from "barcode-detector";
import { enqueueSnackbar } from "notistack";
import isbn from "isbn3";
import Grid from "@mui/material/Grid";

import BreadcrumbsContext from "./../contexts/breadcrumbs";

const Scan = ({ delay = 250 }) => {
    const navigate = useNavigate();
    const webcamRef = useRef(null);
    const [data, setData] = useState([]);
    const { breadcrumbs, setBreadcrumbs } = useContext(BreadcrumbsContext);

    const barcodeDetector = new BarcodeDetector({ formats: ["ean_13", "qr_code"] });

    const addBook = async (isbn) => {
        const response = await fetch(`/api/metadata/${isbn}`, { method: "POST" });
        const data = await response.json();
        console.log(data);
        if (data.book) {
            enqueueSnackbar(`Created a book called ${data.book.title}`, { variant: "info" });
            navigate(`/book/${data.book.bookId}`);
        }
    };

    useEffect(() => {
        setBreadcrumbs([]);

        const processImage = async () => {
            const canvas = await webcamRef.current.getCanvas();
            if (canvas) {
                const image = await new Promise((resolve) => canvas.toBlob(resolve));
                const barcode = await barcodeDetector.detect(image);
                console.log(barcode);
                setData(barcode);

                if (barcode.length > 0 && barcode[0].format == "ean_13") {
                    const isbnObject = isbn.parse(barcode[0].rawValue);
                    if (isbnObject) {
                        enqueueSnackbar(`Found an EAN-13 Barcode ${isbnObject.isbn13h}`);
                        addBook(isbnObject.isbn13);
                    }
                }
            }
        };

        if (delay !== null) {
            const id = setInterval(processImage, delay);
            return () => clearInterval(id);
        }
    }, [delay]);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "environment",
    };

    const getISBN = (hypens = false) => {
        if (data.length > 0 && data[0].rawValue) {
            const isbnObject = isbn.parse(data[0].rawValue);
            if (isbnObject) {
                if (hypens) {
                    return isbnObject.isbn10h;
                }
                return isbnObject.isbn10;
            }
            return isbnString;
        }
    };

    // if (!data) {
    //     return <LoadingContent />;
    // }

    return (
        <>
            <Webcam
                audio={false}
                height={"80%"}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={"100%"}
                videoConstraints={videoConstraints}
            ></Webcam>

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ alignItems: "center", position: "absolute", width: "90%", bottom: "25%" }}
            >
                <Grid item xs={3}>
                    <EditableTypography sx={{ color: "white" }} align="center" variant="h4" edit={true}>
                        {getISBN()}
                    </EditableTypography>
                </Grid>
            </Grid>
        </>
    );
};
export default Scan;
