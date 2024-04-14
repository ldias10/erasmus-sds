import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import {School} from "@prisma/client";
import fp from "fastify-plugin";
import {SchoolService} from "../services/school";

interface schoolParams {
    id: number;
}

interface schoolAttrs {
    name: string;
    universityId: number;
}

const SchoolRoutes: FastifyPluginAsync = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    const schoolService: SchoolService = new SchoolService(app);

    app.get('/schools', {}, async (request, response) => {
        try {
            const schools: School[] = await schoolService.getAll();
            return response.code(200).send(schools);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.get<{ Params: schoolParams }>('/school/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const school: School | null = await schoolService.get(id);
            if (!school) {
                return response.send(404);
            }

            return response.code(200).send(school);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.post<{ Body: schoolAttrs }>('/school', {}, async (request, response) => {
        try {
            const body: schoolAttrs = request.body;
            const {
                name,
                universityId,
            } = body;
            if (!name || !universityId) {
                return response.send(400);
            }

            const school: School = await schoolService.create(name, Number(universityId));
            return response.code(201).send(school);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.put<{ Params: schoolParams, Body: schoolAttrs }>('/school/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: schoolAttrs = request.body;
            const {
                name,
                universityId,
            } = body;
            if (!name || !universityId) {
                return response.send(400);
            }

            const school: School = await schoolService.update(id, name, universityId);
            if (!school) {
                return response.send(404);
            }

            return response.code(200).send(school);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.delete<{ Params: schoolParams }>('/school/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const school: School = await schoolService.delete(id);
            if (!school) {
                return response.send(404);
            }

            return response.code(204).send(school);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
}
export default fp(SchoolRoutes);