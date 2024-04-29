import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import {School} from "@prisma/client";
import fp from "fastify-plugin";
import {SchoolService} from "../services/school";
import { schoolDelete, schoolGet, schoolPost, schoolPut, schoolsGet } from "../docs/school";

interface schoolParams {
    id: number;
}

interface schoolAttrs {
    name: string;
    universityId: number;
}

const SchoolRoutes: FastifyPluginAsync = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    const schoolService: SchoolService = new SchoolService(app);

    app.get('/schools', schoolsGet, async (request, response) => {
        try {
            const schools: School[] = await schoolService.getAll();
            return response.code(200).send(schools);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.get<{ Params: schoolParams }>('/school/:id', schoolGet, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const school: School | null = await schoolService.get(id);
            if (!school) {
                return response.code(404).send({error: "Not found"});
            }

            return response.code(200).send(school);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});        }
    });

    app.post<{ Body: schoolAttrs }>('/school', schoolPost, async (request, response) => {
        try {
            const body: schoolAttrs = request.body;
            const {
                name,
                universityId,
            } = body;
            if (!name || !universityId) {
                return response.code(400).send({error: "Bad Request"});            }

            const school: School = await schoolService.create(name, Number(universityId));
            return response.code(201).send(school);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});        }
    });

    app.put<{ Params: schoolParams, Body: schoolAttrs }>('/school/:id', schoolPut, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: schoolAttrs = request.body;
            const {
                name,
                universityId,
            } = body;
            if (!name || !universityId) {
                return response.code(400).send({error: "Bad Request"});            }

            const school: School = await schoolService.update(id, name, Number(universityId));
            if (!school) {
                return response.code(404).send({error: "Not found"});
            }

            return response.code(200).send(school);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});        }
    });

    app.delete<{ Params: schoolParams }>('/school/:id', schoolDelete, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const school: School = await schoolService.delete(id);
            if (!school) {
                return response.code(404).send({error: "Not found"});
            }

            return response.code(204).send(school);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});        }
    });
}
export default fp(SchoolRoutes);