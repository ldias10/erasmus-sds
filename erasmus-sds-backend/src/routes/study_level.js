"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const study_level_1 = require("../services/study_level");
const study_level_2 = require("../docs/study_level");
const utils_1 = require("../utils/utils");
const StudyLevelRoutes = async (app, options) => {
    const studyLevelService = new study_level_1.StudyLevelService(app);
    app.get('/studyLevels', study_level_2.studiesLevelGet, async (request, response) => {
        try {
            const studyLevels = await studyLevelService.getAll();
            return response.code(200).send(studyLevels);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.get('/studyLevel/:id', study_level_2.studyLevelGet, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const studyLevel = await studyLevelService.get(id);
            if (!studyLevel) {
                return response.code(404).send({ error: "Not found" });
            }
            return response.code(200).send(studyLevel);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.post('/studyLevel', study_level_2.studyLevelPost, async (request, response) => {
        try {
            const body = request.body;
            const name = body.name;
            if ((0, utils_1.isStringEmpty)(name)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            const studyLevel = await studyLevelService.create(name);
            return response.code(201).send(studyLevel);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.put('/studyLevel/:id', study_level_2.studyLevelPut, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const body = request.body;
            const name = body.name;
            if ((0, utils_1.isStringEmpty)(name)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            if (!await studyLevelService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            const studyLevel = await studyLevelService.update(id, name);
            return response.code(200).send(studyLevel);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.delete('/studyLevel/:id', study_level_2.studyLevelDelete, async (request, response) => {
        try {
            const id = Number(request.params.id);
            if (!await studyLevelService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            const studyLevel = await studyLevelService.delete(id);
            return response.code(204).send(studyLevel);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
};
exports.default = (0, fastify_plugin_1.default)(StudyLevelRoutes);
