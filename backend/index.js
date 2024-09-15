"use strict";

const register = require("module-alias/register");
const app = require("@bin/app");
const logger = require("@utils/logger")(module);
const http = require("http");

const port = process.env.PORT || "80";
app.set("port", port);

const server = http.createServer(app);

const serve = async () => {
    try {
        server.on("error", onError);
        server.on("listening", onListening);
        server.listen(port);
    } catch (error) {
        throw error;
    }
};

const onError = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            logger.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            logger.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = () => {
    const addr = server.address();
    const bind =
        typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    logger.info(`robinson api listening on ${bind}`);
};

serve();
