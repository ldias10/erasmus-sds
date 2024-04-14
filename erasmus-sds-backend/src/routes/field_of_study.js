"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const field_of_study_1 = require("../services/field_of_study");
const FieldOfStudyRoutes = async (app, options) => {
    const fieldOfStudyService = new field_of_study_1.FieldOfStudyService(app);
    app.get('/fieldsOfStudy', {}, async (request, response) => {
        try {
            const fieldsOfStudy = await fieldOfStudyService.getAll();
            return response.code(200).send(fieldsOfStudy);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
    app.get('/fieldOfStudy/:id', {}, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const fieldOfStudy = await fieldOfStudyService.get(id);
            if (!fieldOfStudy) {
                return response.send(404);
            }
            return response.code(200).send(fieldOfStudy);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
    app.post('/fieldOfStudy', {}, async (request, response) => {
        try {
            const body = request.body;
            const name = body.name;
            if (!name) {
                return response.send(400);
            }
            const fieldOfStudy = await fieldOfStudyService.create(name);
            return response.code(201).send(fieldOfStudy);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
    app.put('/fieldOfStudy/:id', {}, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const body = request.body;
            const name = body.name;
            if (!name) {
                return response.send(400);
            }
            const fieldOfStudy = await fieldOfStudyService.update(id, name);
            if (!fieldOfStudy) {
                return response.send(404);
            }
            return response.code(200).send(fieldOfStudy);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
    app.delete('/fieldOfStudy/:id', {}, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const fieldOfStudy = await fieldOfStudyService.delete(id);
            if (!fieldOfStudy) {
                return response.send(404);
            }
            return response.code(204).send(fieldOfStudy);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
};
exports.default = (0, fastify_plugin_1.default)(FieldOfStudyRoutes);
