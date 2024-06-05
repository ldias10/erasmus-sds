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

interface studyLevelsGetQuery {
    Students?: boolean,
    Courses?: boolean,
    name?: string,

}

interface studyLevelGetQuery {
    Students?: boolean,
    Courses?: boolean,
}

const StudyLevelRoutes: FastifyPluginAsync = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    const studyLevelService: StudyLevelService = new StudyLevelService(app);

    app.get<{ Querystring: studyLevelsGetQuery }>('/studyLevels', studiesLevelGet, async (request, response) => {
        try {
            const {Students, Courses, name} = request.query;
            const studyLevels: StudyLevel[] = await studyLevelService.getAll({Students, Courses}, {name});
            return response.code(200).send(studyLevels);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.get<{
        Params: studyLevelParams,
        Querystring: studyLevelGetQuery
    }>('/studyLevel/:id', studyLevelGet, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const {Students, Courses} = request.query;
            const studyLevel: StudyLevel | null = await studyLevelService.get(id, {Students, Courses});
            if (!studyLevel) {
                return response.code(404).send({error: "The study level for the specified id was not found."});
            }

            return response.code(200).send(studyLevel);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.post<{
        Body: studyLevelAttrs
    }>('/studyLevel', {preHandler: [app.authenticate, app.authorizeAdmin], ...studyLevelPost}, async (request, response) => {
        try {
            const body: studyLevelAttrs = request.body;
            const name: string = body.name;
            if (isStringEmpty(name)) {
                return response.code(400).send({error: "Name must be specified."});
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
    }>('/studyLevel/:id', {preHandler: [app.authenticate, app.authorizeAdmin], ...studyLevelPut}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: studyLevelAttrs = request.body;
            const name: string = body.name;
            if (isStringEmpty(name)) {
                return response.code(400).send({error: "Name must be specified."});
            }

            if (!await studyLevelService.get(id)) {
                return response.code(404).send({error: "The study level for the specified id was not found."});
            }

            const studyLevel: StudyLevel = await studyLevelService.update(id, name);
            return response.code(200).send(studyLevel);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.delete<{
        Params: studyLevelParams
    }>('/studyLevel/:id', {preHandler: [app.authenticate, app.authorizeAdmin], ...studyLevelDelete}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            if (!await studyLevelService.get(id)) {
                return response.code(404).send({error: "The study level for the specified id was not found."});
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