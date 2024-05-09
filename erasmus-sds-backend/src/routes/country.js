"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const country_1 = require("../services/country");
const country_2 = require("../docs/country");
const utils_1 = require("../utils/utils");
const CountryRoutes = async (app, options) => {
    const countryService = new country_1.CountryService(app);
    app.get('/countries', country_2.countriesGet, async (request, response) => {
        try {
            const countries = await countryService.getAll();
            return response.code(200).send(countries);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.get('/country/:id', country_2.countryGet, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const country = await countryService.get(id);
            if (!country) {
                return response.code(404).send({ error: "Not found" });
            }
            return response.code(200).send(country);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.post('/country', country_2.countryPost, async (request, response) => {
        try {
            const body = request.body;
            const { name, tag } = body;
            if ((0, utils_1.isStringEmpty)(name) || (0, utils_1.isStringEmpty)(tag)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            const country = await countryService.create(name, tag);
            return response.code(201).send(country);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.put('/country/:id', country_2.countryPut, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const body = request.body;
            const { name, tag } = body;
            if ((0, utils_1.isStringEmpty)(name) || (0, utils_1.isStringEmpty)(tag)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            if (!await countryService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            const country = await countryService.update(id, name, tag);
            return response.code(200).send(country);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.delete('/country/:id', country_2.countryDelete, async (request, response) => {
        try {
            const id = Number(request.params.id);
            if (!await countryService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            const country = await countryService.delete(id);
            return response.code(204).send(country);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
};
exports.default = (0, fastify_plugin_1.default)(CountryRoutes);
