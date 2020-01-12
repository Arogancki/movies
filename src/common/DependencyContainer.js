const path = require("path");
const { createContainer, Lifetime, asClass, asFunction } = require("awilix");

let instance;
const rootPath = path.resolve(path.join(__dirname, ".."));

module.exports = class DependencyContainer {
    static getInstance() {
        if (typeof instance !== "undefined") {
            return instance;
        }

        instance = createContainer();
        ["comments", "movies", "genres", "people"].forEach(module =>
            instance.loadModules([`modules/${module}/*.js`], {
                cwd: rootPath,
                formatName: name => `${module}${name}`,
                resolverOptions: {
                    lifetime: Lifetime.SINGLETON,
                    register: asClass,
                },
            }),
        );

        return instance;
    }
};
