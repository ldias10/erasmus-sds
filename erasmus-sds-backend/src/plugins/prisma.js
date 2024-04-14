"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const client_1 = require("@prisma/client");
const prisma = (0, fastify_plugin_1.default)(async (app, options) => {
    const prisma = new client_1.PrismaClient();
    await prisma.$connect();
    // Make Prisma Client available through the fastify app instance: app.prisma
    app.decorate('prisma', prisma);
    app.addHook('onClose', async (app) => {
        await app.prisma.$disconnect();
    });
});
exports.default = prisma;
