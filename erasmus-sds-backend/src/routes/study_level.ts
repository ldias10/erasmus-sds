import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import {StudyLevel} from "@prisma/client";
import fp from "fastify-plugin";
import {StudyLevelService} from "../services/study_level";
import {studiesLevelGet, studyLevelDelete, studyLevelGet, studyLevelPost, studyLevelPut} from "../docs/study_level";
import {isStringEmpty} from "../utils/utils";

interface studyLevelParams {
    id: number;
}

interface studyLevelAttrs {
    name: string;
}

const StudyLevelRoutes: FastifyPluginAsync = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    const studyLevelService: StudyLevelService = new StudyLevelService(app);

    app.get('/studyLevels', studiesLevelGet, async (request, response) => {
        try {
            const studyLevels: StudyLevel[] = await studyLevelService.getAll();
            return response.code(200).send(studyLevels);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.get<{ Params: studyLevelParams }>('/studyLevel/:id', studyLevelGet, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const studyLevel: StudyLevel | null = await studyLevelService.get(id);
            if (!studyLevel) {
                return response.code(404).send({error: "Not found"});
            }

            return response.code(200).send(studyLevel);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.post<{ Body: studyLevelAttrs }>('/studyLevel', studyLevelPost, async (request, response) => {
        try {
            const body: studyLevelAttrs = request.body;
            const name: string = body.name;
            if (isStringEmpty(name)) {
                return response.code(400).send({error: "Bad Request"});
            }

            const studyLevel: StudyLevel = await studyLevelService.create(name);
            return response.code(201).send(studyLevel);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.put<{
        Params: studyLevelParams,
        Body: studyLevelAttrs
    }>('/studyLevel/:id', studyLevelPut, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: studyLevelAttrs = request.body;
            const name: string = body.name;
            if (isStringEmpty(name)) {
                return response.code(400).send({error: "Bad Request"});
            }

            if (!await studyLevelService.get(id)) {
                return response.code(404).send({error: "Not found"});
            }

            const studyLevel: StudyLevel = await studyLevelService.update(id, name);
            return response.code(200).send(studyLevel);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.delete<{ Params: studyLevelParams }>('/studyLevel/:id', studyLevelDelete, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            if (!await studyLevelService.get(id)) {
                return response.code(404).send({error: "Not found"});
            }

            const studyLevel: StudyLevel = await studyLevelService.delete(id);
            return response.code(204).send(studyLevel);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });
}
export default fp(StudyLevelRoutes);