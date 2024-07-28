import React from "react";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import TopNavBar from "../TopNavBar";
import BottomNavBar from "../BottomNavBar";
import SpeedDial from "../SpeedDial";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const sentenceCase = (str) => {
    return str
        .replace(/[a-z]/i, function (letter) {
            return letter.toUpperCase();
        })
        .trim();
};

const LayoutBreadcrumbs = () => {
    const location = useLocation();

    const getBreadcrumbs = () => {
        const items = location.pathname.split("/");
        const breadcrumbs = [
            <Link key="home" underline="hover" color="inherit" href="/">
                Home
            </Link>,
        ];

        for (let i in items) {
            if (items[i] && items[i] !== "") {
                if (i === items.length - 1) {
                    breadcrumbs.push(<Typography color="text.primary">{sentenceCase(items[i])}</Typography>);
                } else {
                    breadcrumbs.push(
                        <Link key={items[i]} underline="hover" color="inherit" href={`/${items[i]}`}>
                            {sentenceCase(items[i])}
                        </Link>
                    );
                }
            }
        }

        return breadcrumbs;
    };

    return (
        <Breadcrumbs sx={{ mb: 2 }} aria-label="breadcrumb">
            {getBreadcrumbs()}
        </Breadcrumbs>
    );
};

const Layout = ({ title = "Page" }) => {
    return (
        <>
            <CssBaseline />
            <TopNavBar />

            <Box sx={{ pb: 7, m: 2 }}>
                <LayoutBreadcrumbs />

                <Outlet />
            </Box>
            <BottomNavBar />
        </>
    );
};

export default Layout;
