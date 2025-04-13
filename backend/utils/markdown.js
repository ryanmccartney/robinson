"use strict";

const register = require("module-alias/register");
const swaggerJsdoc = require("swagger-jsdoc");
const documentation = require("@utils/documentation");
const YAML = require("yaml");
const fs = require("fs");
const path = require("path");

const main = async () => {
    const swaggerYamlSpec = YAML.stringify(documentation.spec);
    fs.writeFileSync(path.join("..", "docs","assets", "api.yml"), swaggerYamlSpec);
};

main();
