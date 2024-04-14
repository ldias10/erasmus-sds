import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import {FieldOfStudy} from "@prisma/client";
import fp from "fastify-plugin";
import {FieldOfStudyService} from "../services/field_of_study";

interface fieldOfStudyParams {
    id: number;
}

interface fieldOfStudyAttrs {
    name: string;
}

const FieldOfStudyRoutes: FastifyPluginAsync = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    const fieldOfStudyService: FieldOfStudyService = new FieldOfStudyService(app);

    app.get('/fieldsOfStudy', {}, async (request, response) => {
        try {
            const fieldsOfStudy: FieldOfStudy[] = await fieldOfStudyService.getAll();
            return response.code(200).send(fieldsOfStudy);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.get<{ Params: fieldOfStudyParams }>('/fieldOfStudy/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const fieldOfStudy: FieldOfStudy | null = await fieldOfStudyService.get(id);
            if (!fieldOfStudy) {
                return response.send(404);
            }

            return response.code(200).send(fieldOfStudy);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.post<{ Body: fieldOfStudyAttrs }>('/fieldOfStudy', {}, async (request, response) => {
        try {
            const body: fieldOfStudyAttrs = request.body;
            const name: string = body.name;
            if (!name) {
                return response.send(400);
            }

            const fieldOfStudy: FieldOfStudy = await fieldOfStudyService.create(name);
            return response.code(201).send(fieldOfStudy);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.put<{
        Params: fieldOfStudyParams,
        Body: fieldOfStudyAttrs
    }>('/fieldOfStudy/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: fieldOfStudyAttrs = request.body;
            const name: string = body.name;
            if (!name) {
                return response.send(400);
            }

            const fieldOfStudy: FieldOfStudy = await fieldOfStudyService.update(id, name);
            if (!fieldOfStudy) {
                return response.send(404);
            }

            return response.code(200).send(fieldOfStudy);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.delete<{ Params: fieldOfStudyParams }>('/fieldOfStudy/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const fieldOfStudy: FieldOfStudy = await fieldOfStudyService.delete(id);
            if (!fieldOfStudy) {
                return response.send(404);
            }

            return response.code(204).send(fieldOfStudy);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
}
export default fp(FieldOfStudyRoutes);