import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import {StudyLevel} from "@prisma/client";
import fp from "fastify-plugin";
import {StudyLevelService} from "../services/study_level";

interface studyLevelParams {
    id: number;
}

interface studyLevelAttrs {
    name: string;
}

const StudyLevelRoutes: FastifyPluginAsync = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    const studyLevelService: StudyLevelService = new StudyLevelService(app);

    app.get('/studyLevels', {}, async (request, response) => {
        try {
            const studyLevels: StudyLevel[] = await studyLevelService.getAll();
            return response.code(200).send(studyLevels);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.get<{ Params: studyLevelParams }>('/studyLevel/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const studyLevel: StudyLevel | null = await studyLevelService.get(id);
            if (!studyLevel) {
                return response.send(404);
            }

            return response.code(200).send(studyLevel);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.post<{ Body: studyLevelAttrs }>('/studyLevel', {}, async (request, response) => {
        try {
            const body: studyLevelAttrs = request.body;
            const name: string = body.name;
            if (!name) {
                return response.send(400);
            }

            const studyLevel: StudyLevel = await studyLevelService.create(name);
            return response.code(201).send(studyLevel);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.put<{ Params: studyLevelParams, Body: studyLevelAttrs }>('/studyLevel/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: studyLevelAttrs = request.body;
            const name: string = body.name;
            if (!name) {
                return response.send(400);
            }

            const studyLevel: StudyLevel = await studyLevelService.update(id, name);
            if (!studyLevel) {
                return response.send(404);
            }

            return response.code(200).send(studyLevel);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.delete<{ Params: studyLevelParams }>('/studyLevel/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const studyLevel: StudyLevel = await studyLevelService.delete(id);
            if (!studyLevel) {
                return response.send(404);
            }

            return response.code(204).send(studyLevel);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
}
export default fp(StudyLevelRoutes);