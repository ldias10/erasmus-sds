import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import {School} from "@prisma/client";
import fp from "fastify-plugin";
import {SchoolService} from "../services/school";
import {schoolDelete, schoolGet, schoolPost, schoolPut, schoolsGet} from "../docs/school";
import {UniversityService} from "../services/university";
import {isNull, isStringEmpty} from "../utils/utils";

interface schoolParams {
    id: number;
}

interface schoolAttrs {
    name: string;
    universityId: number;
}

interface schoolsGetQuery {
    University?: boolean,
    Students?: boolean,
    name?: string,
    universityId?: number

}

interface schoolGetQuery {
    University?: boolean,
    Students?: boolean,
}

const SchoolRoutes: FastifyPluginAsync = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    const schoolService: SchoolService = new SchoolService(app);
    const universityService: UniversityService = new UniversityService(app);

    app.get<{ Querystring: schoolsGetQuery }>('/schools', schoolsGet, async (request, response) => {
        try {
            const {University, Students, name, universityId} = request.query;
            const schools: School[] = await schoolService.getAll({University, Students}, {name, universityId});
            return response.code(200).send(schools);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.get<{
        Params: schoolParams,
        Querystring: schoolGetQuery
    }>('/school/:id', schoolGet, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const {University, Students} = request.query;
            const school: School | null = await schoolService.get(id, {University, Students});
            if (!school) {
                return response.code(404).send({error: "The school for the specified id was not found."});
            }

            return response.code(200).send(school);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.post<{
        Body: schoolAttrs
    }>('/school', schoolPost, async (request, response) => {
        try {
            const body: schoolAttrs = request.body;
            const {
                name,
                universityId,
            } = body;
            if (isStringEmpty(name) || isNull(universityId)) {
                return response.code(400).send({error: "Name and universityId must be specified."});
            }

            if (!await universityService.get(universityId)) {
                return response.code(404).send({error: "The university for the specified id was not found."});
            }

            const school: School = await schoolService.create(name, Number(universityId));
            return response.code(201).send(school);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.put<{
        Params: schoolParams,
        Body: schoolAttrs
    }>('/school/:id', {preHandler: [app.authenticate, app.authorizeAdmin], ...schoolPut}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: schoolAttrs = request.body;
            const {
                name,
                universityId,
            } = body;
            if (isStringEmpty(name) || isNull(universityId)) {
                return response.code(400).send({error: "Name and universityId must be specified."});
            }

            if (!await universityService.get(universityId) || !await schoolService.get(id)) {
                return response.code(404).send({error: "School and/or university for specified id not found."});
            }

            const school: School = await schoolService.update(id, name, Number(universityId));
            return response.code(200).send(school);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.delete<{
        Params: schoolParams
    }>('/school/:id', {preHandler: [app.authenticate, app.authorizeAdmin], ...schoolDelete}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            if (!await schoolService.get(id)) {
                return response.code(404).send({error: "The school for the specified id was not found."});
            }

            const school: School = await schoolService.delete(id);
            return response.code(204).send(school);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });
}
export default fp(SchoolRoutes);