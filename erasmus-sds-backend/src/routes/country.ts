import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import {Country} from "@prisma/client";
import fp from "fastify-plugin";
import {CountryService} from "../services/country";
import {countriesGet, countryDelete, countryGet, countryPost, countryPut} from "../docs/country";
import {isStringEmpty} from "../utils/utils";

interface countryParams {
    id: number;
}

interface countryAttrs {
    name: string;
    tag: string;
}

const CountryRoutes: FastifyPluginAsync = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    const countryService: CountryService = new CountryService(app);

    app.get('/countries', countriesGet, async (request, response) => {
        try {
            const countries: Country[] = await countryService.getAll();
            return response.code(200).send(countries);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.get<{ Params: countryParams }>('/country/:id', countryGet, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const country: Country | null = await countryService.get(id);
            if (!country) {
                return response.code(404).send({error: "The country for the specified id was not found."});
            }

            return response.code(200).send(country);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.post<{
        Body: countryAttrs
    }>('/country', {preHandler: [app.authenticate, app.authorizeAdmin], ...countryPost}, async (request, response) => {
        try {
            const body: countryAttrs = request.body;
            const {
                name,
                tag
            } = body;
            if (isStringEmpty(name) || isStringEmpty(tag)) {
                return response.code(400).send({error: "Name and tag must be specified."});
            }

            const country: Country = await countryService.create(name, tag);
            return response.code(201).send(country);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.put<{
        Params: countryParams,
        Body: countryAttrs
    }>('/country/:id', {preHandler: [app.authenticate, app.authorizeAdmin], ...countryPut}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: countryAttrs = request.body;
            const {
                name,
                tag
            } = body;
            if (isStringEmpty(name) || isStringEmpty(tag)) {
                return response.code(400).send({error: "Name and tag must be specified."});
            }

            if (!await countryService.get(id)) {
                return response.code(404).send({error: "The country for the specified id was not found."});
            }

            const country: Country = await countryService.update(id, name, tag);
            return response.code(200).send(country);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.delete<{
        Params: countryParams
    }>('/country/:id', {preHandler: [app.authenticate, app.authorizeAdmin], ...countryDelete}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            if (!await countryService.get(id)) {
                return response.code(404).send({error: "The country for the specified id was not found."});
            }

            const country: Country = await countryService.delete(id);
            return response.code(204).send(country);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });
}
export default fp(CountryRoutes);