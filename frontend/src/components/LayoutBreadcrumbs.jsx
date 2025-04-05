import { useContext } from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

import BreadcrumbsContext from "@contexts/breadcrumbs";

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

        for (const breadcrumb of breadcrumbs) {
            if (breadcrumb.link) {
                breadcrumbsItems.push(
                    <Link
                        key={breadcrumb.link}
                        underline="hover"
                        color="inherit"
                        href={breadcrumb.link}
                    >
                        {sentenceCase(breadcrumb.title || "")}
                    </Link>
                );
            } else {
                breadcrumbsItems.push(
                    <Typography color="text.primary">
                        {sentenceCase(breadcrumb.title)}
                    </Typography>
                );
            }
        }

        return breadcrumbsItems;
    };

    if (breadcrumbs.length > 0) {
        return (
            <Breadcrumbs
                sx={{
                    display: { xs: "none", md: "block" },
                    paddingTop: 1,
                    paddingLeft: 2,
                    mb: 1.5,
                }}
                aria-label="breadcrumb"
            >
                {getBreadcrumbs()}
            </Breadcrumbs>
        );
    }

    return null;
};

export default LayoutBreadcrumbs;
