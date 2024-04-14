"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const school_1 = require("../services/school");
const SchoolRoutes = async (app, options) => {
    const schoolService = new school_1.SchoolService(app);
    app.get('/schools', {}, async (request, response) => {
        try {
            const schools = await schoolService.getAll();
            return response.code(200).send(schools);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
    app.get('/school/:id', {}, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const school = await schoolService.get(id);
            if (!school) {
                return response.send(404);
            }
            return response.code(200).send(school);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
    app.post('/school', {}, async (request, response) => {
        try {
            const body = request.body;
            const { name, universityId, } = body;
            if (!name || !universityId) {
                return response.send(400);
            }
            const school = await schoolService.create(name, Number(universityId));
            return response.code(201).send(school);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
    app.put('/school/:id', {}, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const body = request.body;
            const { name, universityId, } = body;
            if (!name || !universityId) {
                return response.send(400);
            }
            const school = await schoolService.update(id, name, universityId);
            if (!school) {
                return response.send(404);
            }
            return response.code(200).send(school);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
    app.delete('/school/:id', {}, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const school = await schoolService.delete(id);
            if (!school) {
                return response.send(404);
            }
            return response.code(204).send(school);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
};
exports.default = (0, fastify_plugin_1.default)(SchoolRoutes);
