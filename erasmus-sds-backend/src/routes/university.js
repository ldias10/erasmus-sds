"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const university_1 = require("../services/university");
const UniversityRoutes = async (app, options) => {
    const universityService = new university_1.UniversityService(app);
    app.get('/universities', {}, async (request, response) => {
        try {
            const universities = await universityService.getAll();
            return response.code(200).send(universities);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
    app.get('/university/:id', {}, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const university = await universityService.get(id);
            if (!university) {
                return response.send(404);
            }
            return response.code(200).send(university);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
    app.post('/university', {}, async (request, response) => {
        try {
            const body = request.body;
            const { name, countryId } = body;
            if (!name || !countryId) {
                return response.send(400);
            }
            const university = await universityService.create(name, Number(countryId));
            return response.code(201).send(university);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
    app.put('/university/:id', {}, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const body = request.body;
            const { name, countryId } = body;
            if (!name || !countryId) {
                return response.send(400);
            }
            const university = await universityService.update(id, name, Number(countryId));
            if (!university) {
                return response.send(404);
            }
            return response.code(200).send(university);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
    app.delete('/university/:id', {}, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const university = await universityService.delete(id);
            if (!university) {
                return response.send(404);
            }
            return response.code(204).send(university);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
};
exports.default = (0, fastify_plugin_1.default)(UniversityRoutes);
