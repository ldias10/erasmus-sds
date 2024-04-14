"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const study_level_1 = require("../services/study_level");
const StudyLevelRoutes = async (app, options) => {
    const studyLevelService = new study_level_1.StudyLevelService(app);
    app.get('/studyLevels', {}, async (request, response) => {
        try {
            const studyLevels = await studyLevelService.getAll();
            return response.code(200).send(studyLevels);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
    app.get('/studyLevel/:id', {}, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const studyLevel = await studyLevelService.get(id);
            if (!studyLevel) {
                return response.send(404);
            }
            return response.code(200).send(studyLevel);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
    app.post('/studyLevel', {}, async (request, response) => {
        try {
            const body = request.body;
            const name = body.name;
            if (!name) {
                return response.send(400);
            }
            const studyLevel = await studyLevelService.create(name);
            return response.code(201).send(studyLevel);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
    app.put('/studyLevel/:id', {}, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const body = request.body;
            const name = body.name;
            if (!name) {
                return response.send(400);
            }
            const studyLevel = await studyLevelService.update(id, name);
            if (!studyLevel) {
                return response.send(404);
            }
            return response.code(200).send(studyLevel);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
    app.delete('/studyLevel/:id', {}, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const studyLevel = await studyLevelService.delete(id);
            if (!studyLevel) {
                return response.send(404);
            }
            return response.code(204).send(studyLevel);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
};
exports.default = (0, fastify_plugin_1.default)(StudyLevelRoutes);
