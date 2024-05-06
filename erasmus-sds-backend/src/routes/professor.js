"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const professor_1 = require("../services/professor");
const professor_2 = require("../docs/professor");
const utils_1 = require("../utils/utils");
const ProfessorRoutes = async (app, options) => {
    const professorService = new professor_1.ProfessorService(app);
    app.get('/professors', professor_2.professorsGet, async (request, response) => {
        try {
            const professors = await professorService.getAll();
            return response.code(200).send(professors);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.get('/professor/:id', professor_2.professorGet, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const professor = await professorService.get(id);
            if (!professor) {
                return response.code(404).send({ error: "Not found" });
            }
            return response.code(200).send(professor);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.post('/professor', professor_2.professorPost, async (request, response) => {
        try {
            const body = request.body;
            const { email, password, name, surname, isVerified } = body;
            if ((0, utils_1.isStringEmpty)(email) || (0, utils_1.isStringEmpty)(password) || (0, utils_1.isStringEmpty)(name) || (0, utils_1.isStringEmpty)(surname)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            if (await professorService.isEmailAddressAlreadyUsed(email)) {
                return response.code(409).send({ error: "Email address already in use." });
            }
            const professor = await professorService.create(email, password, name, surname, isVerified || false);
            return response.code(201).send(professor);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.put('/professor/:id', professor_2.professorPut, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const body = request.body;
            const { email, name, surname, isVerified } = body;
            if ((0, utils_1.isStringEmpty)(email) || (0, utils_1.isStringEmpty)(name) || (0, utils_1.isStringEmpty)(surname) || (0, utils_1.isNull)(isVerified)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            if (!await professorService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            if (await professorService.isEmailAddressAlreadyUsedByAnotherUser(id, email)) {
                return response.code(409).send({ error: "Email address already in use." });
            }
            const professor = await professorService.update(id, email, name, surname, isVerified);
            return response.code(200).send(professor);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.put('/professor/:id/updatePassword', professor_2.professorPutPassword, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const body = request.body;
            const { currentPassword, newPassword, } = body;
            if ((0, utils_1.isStringEmpty)(currentPassword) || (0, utils_1.isStringEmpty)(newPassword)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            if (!await professorService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            const isPasswordUpdated = await professorService.updatePassword(id, currentPassword, newPassword);
            if (!isPasswordUpdated) {
                return response.code(404).send({ error: "Not found" });
            }
            return response.code(200);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.delete('/professor/:id', professor_2.professorDelete, async (request, response) => {
        try {
            const id = Number(request.params.id);
            if (!await professorService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            const professor = await professorService.delete(id);
            return response.code(204).send(professor);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
};
exports.default = (0, fastify_plugin_1.default)(ProfessorRoutes);
