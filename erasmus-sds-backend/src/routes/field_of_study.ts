import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import {FieldOfStudy} from "@prisma/client";
import fp from "fastify-plugin";
import {FieldOfStudyService} from "../services/field_of_study";
import {
    fieldOfStudyDelete,
    fieldOfStudyGet,
    fieldOfStudyPost,
    fieldOfStudyPut,
    fieldsOfStudyGet
} from "../docs/field_of_study";
import {isStringEmpty} from "../utils/utils";

interface fieldOfStudyParams {
    id: number;
}

interface fieldOfStudyAttrs {
    name: string;
}

const FieldOfStudyRoutes: FastifyPluginAsync = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    const fieldOfStudyService: FieldOfStudyService = new FieldOfStudyService(app);

    app.get('/fieldsOfStudy', fieldsOfStudyGet, async (request, response) => {
        try {
            const fieldsOfStudy: FieldOfStudy[] = await fieldOfStudyService.getAll();
            return response.code(200).send(fieldsOfStudy);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.get<{ Params: fieldOfStudyParams }>('/fieldOfStudy/:id', fieldOfStudyGet, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const fieldOfStudy: FieldOfStudy | null = await fieldOfStudyService.get(id);
            if (!fieldOfStudy) {
                return response.code(404).send({error: "The field of study for the specified id was not found."});
            }

            return response.code(200).send(fieldOfStudy);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.post<{
        Body: fieldOfStudyAttrs
    }>('/fieldOfStudy', {preHandler: [app.authenticate, app.authorizeAdminOrProfessor], ...fieldOfStudyPost}, async (request, response) => {
        try {
            const body: fieldOfStudyAttrs = request.body;
            const name: string = body.name;
            if (isStringEmpty(name)) {
                return response.code(400).send({error: "Name must be specified."});
            }

            const fieldOfStudy: FieldOfStudy = await fieldOfStudyService.create(name);
            return response.code(201).send(fieldOfStudy);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.put<{
        Params: fieldOfStudyParams,
        Body: fieldOfStudyAttrs
    }>('/fieldOfStudy/:id', {preHandler: [app.authenticate, app.authorizeAdminOrProfessor], ...fieldOfStudyPut}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: fieldOfStudyAttrs = request.body;
            const name: string = body.name;
            if (isStringEmpty(name)) {
                return response.code(400).send({error: "Name must be specified."});
            }

            if (!await fieldOfStudyService.get(id)) {
                return response.code(404).send({error: "The field of study for the specified id was not found."});
            }

            const fieldOfStudy: FieldOfStudy = await fieldOfStudyService.update(id, name);
            return response.code(200).send(fieldOfStudy);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.delete<{
        Params: fieldOfStudyParams
    }>('/fieldOfStudy/:id', {preHandler: [app.authenticate, app.authorizeAdminOrProfessor], ...fieldOfStudyDelete}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            if (!await fieldOfStudyService.get(id)) {
                return response.code(404).send({error: "The field of study for the specified id was not found."});
            }

            const fieldOfStudy: FieldOfStudy = await fieldOfStudyService.delete(id);
            return response.code(204).send(fieldOfStudy);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });
}
export default fp(FieldOfStudyRoutes);