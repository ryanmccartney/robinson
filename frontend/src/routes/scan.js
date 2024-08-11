import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import LoadingContent from "../components/LoadingContent";
import { BarcodeDetector } from "barcode-detector";
import isbn from "isbn3";
import { Typography } from "@mui/material";

const Scan = ({ delay = 250 }) => {
    const navigate = useNavigate();
    const webcamRef = useRef(null);
    const [data, setData] = useState(null);
    const barcodeDetector = new BarcodeDetector({ formats: ["ean_13", "qr_code"] });

    const addBook = async (isbn) => {
        const response = await fetch(`/api/metadata/${isbn}`, { method: "POST" });
        const data = await response.json();
        console.log(data);
        if (data.book) {
            navigate(`/book/${data.book.bookId}`);
        }
    };

    useEffect(() => {
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

    const getISBN = (isbnString, hypens = true) => {
        if (isbnString) {
            const isbnObject = isbn.parse(isbnString);
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

            {data?.length > 0 && (
                <>
                    <Typography>{getISBN(data[0].rawValue)}</Typography>
                    <Typography>{data[0].format}</Typography>
                </>
            )}
        </>
    );
};
export default Scan;
