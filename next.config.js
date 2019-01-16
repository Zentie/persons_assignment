const withSass = require('@zeit/next-sass');

require("dotenv").config();
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = withSass(
    {
    serverRuntimeConfig: {
        // Will only be available on the server side
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
          RESTURL_PERSONS_PROD:
              "https://www.production-site.com/rest/sessions"
        },
        webpack(config, options) {
            config.plugins = config.plugins || [];
            config.plugins = [
                ...config.plugins,
                new Dotenv({
                    path: path.join(__dirname, ".env"),
                    systemvars: true
                })
            ];
            return config;
        }
    }
);
