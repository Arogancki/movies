const log = require("./src/helpers/log"),
    App = require("./src/app"),
    DependencyContainer = require("./src/common/DependencyContainer");

new App(DependencyContainer.getInstance().cradle)
    .getApp()
    .then(exp => log.info(`Server is working on port ${exp.server.address().port}`))
    .catch(e =>
        process.env.NODE_ENV !== "production" ? log.error(`${e.stack}`) : log.error(`${e.name}: ${e.message}`),
    );
