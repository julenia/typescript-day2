"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const controller_1 = require("./pages/controller");
const db_1 = require("./db");
const controller_2 = require("./users/controller");
const controller_3 = require("./logins/controller");
const jwt_1 = require("./jwt");
const port = process.env.PORT || 4000;
const app = routing_controllers_1.createKoaServer({
    controllers: [controller_1.default, controller_2.default, controller_3.default],
    authorizationChecker: (action) => {
        const header = action.request.headers.authorization;
        if (header && header.startsWith('Bearer ')) {
            const [, token] = header.split(' ');
            return !!(token && jwt_1.verify(token));
        }
        return false;
    }
});
db_1.default()
    .then(_ => app.listen(port, () => console.log(`Listening on port ${port}`)))
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map