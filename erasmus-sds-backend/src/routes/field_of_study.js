"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const field_of_study_1 = require("../services/field_of_study");
const field_of_study_2 = require("../docs/field_of_study");
const utils_1 = require("../utils/utils");
const FieldOfStudyRoutes = async (app, options) => {
    const fieldOfStudyService = new field_of_study_1.FieldOfStudyService(app);
    app.get('/fieldsOfStudy', field_of_study_2.fieldsOfStudyGet, async (request, response) => {
        try {
            const fieldsOfStudy = await fieldOfStudyService.getAll();
            return response.code(200).send(fieldsOfStudy);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.get('/fieldOfStudy/:id', field_of_study_2.fieldOfStudyGet, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const fieldOfStudy = await fieldOfStudyService.get(id);
            if (!fieldOfStudy) {
                return response.code(404).send({ error: "Not found" });
            }
            return response.code(200).send(fieldOfStudy);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.post('/fieldOfStudy', field_of_study_2.fieldOfStudyPost, async (request, response) => {
        try {
            const body = request.body;
            const name = body.name;
            if ((0, utils_1.isStringEmpty)(name)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            const fieldOfStudy = await fieldOfStudyService.create(name);
            return response.code(201).send(fieldOfStudy);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.put('/fieldOfStudy/:id', field_of_study_2.fieldOfStudyPut, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const body = request.body;
            const name = body.name;
            if ((0, utils_1.isStringEmpty)(name)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            if (!await fieldOfStudyService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            const fieldOfStudy = await fieldOfStudyService.update(id, name);
            return response.code(200).send(fieldOfStudy);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.delete('/fieldOfStudy/:id', field_of_study_2.fieldOfStudyDelete, async (request, response) => {
        try {
            const id = Number(request.params.id);
            if (!await fieldOfStudyService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            const fieldOfStudy = await fieldOfStudyService.delete(id);
            return response.code(204).send(fieldOfStudy);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
};
exports.default = (0, fastify_plugin_1.default)(FieldOfStudyRoutes);
