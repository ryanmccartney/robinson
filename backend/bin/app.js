"use strict";

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const favicon = require("serve-favicon");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// load routes
const documentation = require("@utils/documentation");
const books = require("@routes/books");
const shelves = require("@routes/shelves");
const cases = require("@routes/cases");
const libraries = require("@routes/libraries");
const users = require("@routes/users");

// rate limiting
const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: process.env.RATE_LIMIT || 1000,
});

// get environment
const nodeEnv = process.env.NODE_ENV || "production";

const app = express();

app.set("json spaces", 2);
app.use(cors());
app.use(
    helmet.contentSecurityPolicy({
        reportOnly: true,
        directives: {
            upgradeInsecureRequests: null,
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "https:", "http:", "'unsafe-inline'"],
            defaultSrc: ["'self'"],
            "base-uri": ["'self'"],
            "block-all-mixed-content": [],
            "font-src": ["'self'", "https:", "http:", "data:"],
            "frame-ancestors": ["'self'"],
            "img-src": ["'self'", "data:", "https:"],
            "object-src": ["'none'"],
        },
    })
);

app.use(favicon(path.join(__dirname, "..", "public", "logo.ico")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", apiLimiter);
app.use("/documentation", documentation);
app.use("/api/books", books);
app.use("/api/shelves", shelves);
app.use("/api/cases", cases);
app.use("/api/libraries", libraries);
app.use("/api/users", users);

// Redirect /api to /documentation
app.use("/api", (req, res, next) => {
    res.redirect("/documentation");
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error("File Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        status: error.status,
        message: error.message,
        stack: nodeEnv !== "production" ? error.stack.split("\n") : undefined,
    });
});

module.exports = app;
