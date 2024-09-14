"use strict";

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const favicon = require("serve-favicon");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const passport = require("passport");
const auth = require("@utils/auth");
const getError = require("@utils/error-get");
const openApiValidator = require("express-openapi-validator");

// load routes
const documentation = require("@utils/documentation");
const books = require("@routes/books");
const shelves = require("@routes/shelves");
const cases = require("@routes/cases");
const libraries = require("@routes/libraries");
const users = require("@routes/users");
const metadata = require("@routes/metadata");
const search = require("@routes/search");
const login = require("@routes/login");
const logout = require("@routes/logout");

// rate limiting
const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: process.env.RATE_LIMIT || 1000,
});

// get environment
const nodeEnv = process.env.NODE_ENV || "production";

const app = express();

//File limits
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

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

app.use(favicon(path.join(__dirname, "..", "public", "favicon.ico")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use(auth.session());
passport.use(auth.strategy);
app.use(passport.initialize());
app.use(passport.session());

app.use(apiLimiter);
app.use("/api/documentation", documentation.router);

app.use(
    openApiValidator.middleware({
        apiSpec: documentation.spec,
        validateRequests: true,
        validateResponses: false,
    })
);

app.use("/api/books", books);
app.use("/api/shelves", shelves);
app.use("/api/cases", cases);
app.use("/api/libraries", libraries);
app.use("/api/users", users);
app.use("/api/metadata", metadata);
app.use("/api/login", login);
app.use("/api/logout", logout);
app.use("/api/search", search);

if (nodeEnv === "production") {
    const staticFiles = path.join(__dirname, 'build');
    app.use('/', express.static(staticFiles));
    app.get("*", (req, res) => {
        res.sendFile("index.html", { staticFiles });
    });
}

// Redirect /api to /documentation
app.use("/api", (req, res, next) => {
    res.redirect("/api/documentation");
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error("File Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500).json(getError(error));
});

auth.initUsers();

module.exports = app;
