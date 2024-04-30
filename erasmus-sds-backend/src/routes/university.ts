import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import {University} from "@prisma/client";
import fp from "fastify-plugin";
import {UniversityService} from "../services/university";
import {UniversitiesGet, UniversityDelete, UniversityGet, UniversityPost, UniversityPut} from "../docs/university";
import {CountryService} from "../services/country";
import {isNull, isStringEmpty} from "../utils/utils";

interface universityParams {
    id: number;
}

interface universityAttrs {
    name: string;
    countryId: number;
}

const UniversityRoutes: FastifyPluginAsync = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    const universityService: UniversityService = new UniversityService(app);
    const countryService: CountryService = new CountryService(app);

    app.get('/universities', UniversitiesGet, async (request, response) => {
        try {
            const universities: University[] = await universityService.getAll();
            return response.code(200).send(universities);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.get<{ Params: universityParams }>('/university/:id', UniversityGet, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const university: University | null = await universityService.get(id);
            if (!university) {
                return response.code(404).send({error: "Not found"});
            }

            return response.code(200).send(university);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.post<{ Body: universityAttrs }>('/university', UniversityPost, async (request, response) => {
        try {
            const body: universityAttrs = request.body;
            const {
                name,
                countryId
            } = body;
            if (isStringEmpty(name) || isNull(countryId)) {
                return response.code(400).send({error: "Bad Request"});
            }

            if (!await countryService.get(countryId)) {
                return response.code(404).send({error: "Not found"});
            }

            const university: University = await universityService.create(name, Number(countryId));
            return response.code(201).send(university);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.put<{
        Params: universityParams,
        Body: universityAttrs
    }>('/university/:id', UniversityPut, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: universityAttrs = request.body;
            const {
                name,
                countryId
            } = body;
            if (isStringEmpty(name) || isNull(countryId)) {
                return response.code(400).send({error: "Bad Request"});
            }

            if (!await countryService.get(countryId) || !await universityService.get(id)) {
                return response.code(404).send({error: "Not found"});
            }

            const university: University = await universityService.update(id, name, Number(countryId));
            return response.code(200).send(university);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.delete<{ Params: universityParams }>('/university/:id', UniversityDelete, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            if (!await universityService.get(id)) {
                return response.code(404).send({error: "Not found"});
            }

            const university: University = await universityService.delete(id);
            return response.code(204).send(university);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });
}
export default fp(UniversityRoutes);