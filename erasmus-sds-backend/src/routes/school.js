"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const school_1 = require("../services/school");
const school_2 = require("../docs/school");
const university_1 = require("../services/university");
const utils_1 = require("../utils/utils");
const SchoolRoutes = async (app, options) => {
    const schoolService = new school_1.SchoolService(app);
    const universityService = new university_1.UniversityService(app);
    app.get('/schools', school_2.schoolsGet, async (request, response) => {
        try {
            const schools = await schoolService.getAll();
            return response.code(200).send(schools);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.get('/school/:id', school_2.schoolGet, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const school = await schoolService.get(id);
            if (!school) {
                return response.code(404).send({ error: "Not found" });
            }
            return response.code(200).send(school);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.post('/school', school_2.schoolPost, async (request, response) => {
        try {
            const body = request.body;
            const { name, universityId, } = body;
            if ((0, utils_1.isStringEmpty)(name) || (0, utils_1.isNull)(universityId)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            if (!await universityService.get(universityId)) {
                return response.code(404).send({ error: "Not found" });
            }
            const school = await schoolService.create(name, Number(universityId));
            return response.code(201).send(school);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.put('/school/:id', school_2.schoolPut, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const body = request.body;
            const { name, universityId, } = body;
            if ((0, utils_1.isStringEmpty)(name) || (0, utils_1.isNull)(universityId)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            if (!await universityService.get(universityId) || !await schoolService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            const school = await schoolService.update(id, name, Number(universityId));
            return response.code(200).send(school);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.delete('/school/:id', school_2.schoolDelete, async (request, response) => {
        try {
            const id = Number(request.params.id);
            if (!await schoolService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            const school = await schoolService.delete(id);
            return response.code(204).send(school);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
};
exports.default = (0, fastify_plugin_1.default)(SchoolRoutes);
