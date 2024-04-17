import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import {University} from "@prisma/client";
import fp from "fastify-plugin";
import {UniversityService} from "../services/university";

interface universityParams {
    id: number;
}

interface universityAttrs {
    name: string;
    countryId: number;
}

const UniversityRoutes: FastifyPluginAsync = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    const universityService: UniversityService = new UniversityService(app);

    app.get('/universities', {}, async (request, response) => {
        try {
            const universities: University[] = await universityService.getAll();
            return response.code(200).send(universities);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.get<{ Params: universityParams }>('/university/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const university: University | null = await universityService.get(id);
            if (!university) {
                return response.send(404);
            }

            return response.code(200).send(university);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.post<{ Body: universityAttrs }>('/university', {}, async (request, response) => {
        try {
            const body: universityAttrs = request.body;
            const {
                name,
                countryId
            } = body;
            if (!name || !countryId) {
                return response.send(400);
            }

            const university: University = await universityService.create(name, Number(countryId));
            return response.code(201).send(university);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.put<{ Params: universityParams, Body: universityAttrs }>('/university/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: universityAttrs = request.body;
            const {
                name,
                countryId
            } = body;
            if (!name || !countryId) {
                return response.send(400);
            }

            const university: University = await universityService.update(id, name, Number(countryId));
            if (!university) {
                return response.send(404);
            }

            return response.code(200).send(university);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.delete<{ Params: universityParams }>('/university/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const university: University = await universityService.delete(id);
            if (!university) {
                return response.send(404);
            }

            return response.code(204).send(university);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
}
export default fp(UniversityRoutes);