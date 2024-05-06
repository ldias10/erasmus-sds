"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const admin_1 = require("../services/admin");
const admin_2 = require("../docs/admin");
const utils_1 = require("../utils/utils");
const AdminRoutes = async (app, options) => {
    const adminService = new admin_1.AdminService(app);
    app.get('/admins', admin_2.adminsGet, async (request, response) => {
        try {
            const admins = await adminService.getAll();
            return response.code(200).send(admins);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.get('/admin/:id', admin_2.adminGet, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const admin = await adminService.get(id);
            if (!admin) {
                return response.code(404).send({ error: "Not found" });
            }
            return response.code(200).send(admin);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.post('/admin', admin_2.adminPost, async (request, response) => {
        try {
            const body = request.body;
            const { email, password, name, surname, isVerified } = body;
            if ((0, utils_1.isStringEmpty)(email) || (0, utils_1.isStringEmpty)(password) || (0, utils_1.isStringEmpty)(name) || (0, utils_1.isStringEmpty)(surname)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            if (await adminService.isEmailAddressAlreadyUsed(email)) {
                return response.code(409).send({ error: "Email address already in use." });
            }
            const admin = await adminService.create(email, password, name, surname, isVerified || false);
            return response.code(201).send(admin);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.put('/admin/:id', admin_2.adminPut, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const body = request.body;
            const { email, name, surname, isVerified } = body;
            if ((0, utils_1.isStringEmpty)(email) || (0, utils_1.isStringEmpty)(name) || (0, utils_1.isStringEmpty)(surname) || (0, utils_1.isNull)(isVerified)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            if (!await adminService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            if (await adminService.isEmailAddressAlreadyUsedByAnotherUser(id, email)) {
                return response.code(409).send({ error: "Email address already in use." });
            }
            const admin = await adminService.update(id, email, name, surname, isVerified);
            return response.code(200).send(admin);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.put('/admin/:id/updatePassword', admin_2.adminPutPassword, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const body = request.body;
            const { currentPassword, newPassword, } = body;
            if ((0, utils_1.isStringEmpty)(currentPassword) || (0, utils_1.isStringEmpty)(newPassword)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            if (!await adminService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            const isPasswordUpdated = await adminService.updatePassword(id, currentPassword, newPassword);
            if (!isPasswordUpdated) {
                return response.code(404).send({ error: "Not found" });
            }
            return response.code(200).send(isPasswordUpdated);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.delete('/admin/:id', admin_2.adminDelete, async (request, response) => {
        try {
            const id = Number(request.params.id);
            if (!await adminService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            const admin = await adminService.delete(id);
            return response.code(204).send(admin);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
};
exports.default = (0, fastify_plugin_1.default)(AdminRoutes);
