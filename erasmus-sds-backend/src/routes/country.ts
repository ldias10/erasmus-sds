import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import {Country} from "@prisma/client";
import fp from "fastify-plugin";
import {CountryService} from "../services/country";
import {countriesGet, countryDelete, countryGet, countryPost, countryPut} from "../docs/country";

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
                return response.code(404).send({error: "Not found"});
            }

            return response.code(200).send(country);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.post<{ Body: countryAttrs }>('/country', countryPost, async (request, response) => {
        try {
            const body: countryAttrs = request.body;
            const {
                name,
                tag
            } = body;
            if (!name || !tag) {
                return response.code(400).send({error: "Bad Request"});
            }

            const country: Country = await countryService.create(name, tag);
            return response.code(201).send(country);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.put<{ Params: countryParams, Body: countryAttrs }>('/country/:id', countryPut, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: countryAttrs = request.body;
            const {
                name,
                tag
            } = body;
            if (!name || !tag) {
                return response.code(400).send({error: "Bad Request"});
            }

            const country: Country = await countryService.update(id, name, tag);
            if (!country) {
                return response.code(404).send({error: "Not found"});
            }

            return response.code(200).send(country);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.delete<{ Params: countryParams }>('/country/:id', countryDelete, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const country: Country = await countryService.delete(id);
            if (!country) {
                return response.code(404).send({error: "Not found"});
            }

            return response.code(204).send(country);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });
}
export default fp(CountryRoutes);