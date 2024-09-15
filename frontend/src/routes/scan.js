import React, { useState, useRef, useEffect, useContext } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import EditableTypography from "../components/EditableTypography";
import { BarcodeDetector } from "barcode-detector";
import { enqueueSnackbar } from "notistack";
import isbn from "isbn3";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import BreadcrumbsContext from "./../contexts/breadcrumbs";
import { Opacity } from "@mui/icons-material";

const Scan = ({ delay = 250 }) => {
    const navigate = useNavigate();
    const webcamRef = useRef(null);
    const [data, setData] = useState([]);
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    const { breadcrumbs, setBreadcrumbs } = useContext(BreadcrumbsContext);

    const barcodeDetector = new BarcodeDetector({
        formats: ["ean_13", "qr_code"],
    });

    const addBook = async (isbn) => {
        const response = await fetch(`/api/metadata/${isbn}`, {
            method: "POST",
        });
        const data = await response.json();
        console.log(data);
        if (data.book) {
            enqueueSnackbar(`Created a book called ${data.book.title}`, {
                variant: "info",
            });
            navigate(`/book/${data.book.bookId}`);
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
                const barcode = await barcodeDetector.detect(image);
                console.log(barcode);
                setData(barcode);

                if (barcode.length > 0 && barcode[0].format == "ean_13") {
                    const isbnObject = isbn.parse(barcode[0].rawValue);
                    if (isbnObject) {
                        enqueueSnackbar(
                            `Found an EAN-13 Barcode ${isbnObject.isbn13h}`
                        );
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

    const getISBN = (hyphens = false) => {
        if (data.length > 0 && data[0].rawValue) {
            const isbnObject = isbn.parse(data[0].rawValue);
            if (isbnObject) {
                if (hyphens) {
                    return isbnObject.isbn10h;
                }
                return isbnObject.isbn10;
            }
            return isbnString;
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
                    variant="h4"
                    edit={true}
                >
                    {getISBN()}
                </EditableTypography>
            </Box>
        </Box>
    );
};
export default Scan;
