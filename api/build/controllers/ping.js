"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PingController {
    async getMessage() {
        return {
            message: "pong",
        };
    }
}
exports.default = PingController;
