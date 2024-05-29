"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const university_1 = require("../services/university");
const university_2 = require("../docs/university");
const country_1 = require("../services/country");
const utils_1 = require("../utils/utils");
const UniversityRoutes = async (app, options) => {
    const universityService = new university_1.UniversityService(app);
    const countryService = new country_1.CountryService(app);
    app.get('/universities', university_2.UniversitiesGet, async (request, response) => {
        try {
            const universities = await universityService.getAll();
            return response.code(200).send(universities);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.get('/university/:id', university_2.UniversityGet, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const university = await universityService.get(id);
            if (!university) {
                return response.code(404).send({ error: "Not found" });
            }
            return response.code(200).send(university);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.post('/university', university_2.UniversityPost, async (request, response) => {
        try {
            const body = request.body;
            const { name, countryId } = body;
            if ((0, utils_1.isStringEmpty)(name) || (0, utils_1.isNull)(countryId)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            if (!await countryService.get(countryId)) {
                return response.code(404).send({ error: "Not found" });
            }
            const university = await universityService.create(name, Number(countryId));
            return response.code(201).send(university);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.put('/university/:id', university_2.UniversityPut, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const body = request.body;
            const { name, countryId } = body;
            if ((0, utils_1.isStringEmpty)(name) || (0, utils_1.isNull)(countryId)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            if (!await countryService.get(countryId) || !await universityService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            const university = await universityService.update(id, name, Number(countryId));
            return response.code(200).send(university);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.delete('/university/:id', university_2.UniversityDelete, async (request, response) => {
        try {
            const id = Number(request.params.id);
            if (!await universityService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            const university = await universityService.delete(id);
            return response.code(204).send(university);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
};
exports.default = (0, fastify_plugin_1.default)(UniversityRoutes);
