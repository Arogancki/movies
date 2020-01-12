const express = require("express"),
    http = require("http"),
    config = require("./config"),
    middlewares = require("./middlewares"),
    router = require("./router"),
    app = express(),
    log = require("./helpers/log");

module.exports = class App {
    constructor({ moviesRouter, commentsRouter }) {
        this.commentsRouter = commentsRouter;
        this.moviesRouter = moviesRouter;
    }
    async getApp() {
        app.set("port", config.PORT);

        await middlewares(app);

        await router(app, [this.moviesRouter, this.commentsRouter]);

        config.PRINT_CONFIG && Object.keys(config).forEach(key => log.debug(`$${key}=${config[key]}`));

        return new Promise(async res => {
            const server = http.createServer(app).listen(app.get("port"), () => res({ server, app: app }));
        });
    }
};
