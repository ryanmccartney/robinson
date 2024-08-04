import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

import BreadcrumbsContext from "../contexts/breadcrumbs";

const sentenceCase = (str) => {
    return str
        .replace(/[a-z]/i, function (letter) {
            return letter.toUpperCase();
        })
        .trim();
};

const LayoutBreadcrumbs = () => {
    const { breadcrumbs, setBreadcrumbs } = useContext(BreadcrumbsContext);
    const getBreadcrumbs = () => {
        const breadcrumbsItems = [];

        for (let breadcrumb of breadcrumbs) {
            if (breadcrumb.link) {
                breadcrumbsItems.push(
                    <Link key={breadcrumb.link} underline="hover" color="inherit" href={breadcrumb.link}>
                        {sentenceCase(breadcrumb.title)}
                    </Link>
                );
            } else {
                breadcrumbsItems.push(<Typography color="text.primary">{sentenceCase(breadcrumb.title)}</Typography>);
            }
        }

        return breadcrumbsItems;
    };

    return (
        <Breadcrumbs sx={{ paddingLeft: 0.9, mb: 1.5 }} aria-label="breadcrumb">
            {getBreadcrumbs()}
        </Breadcrumbs>
    );
};

export default LayoutBreadcrumbs;
