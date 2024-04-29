import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import {Course} from "@prisma/client";
import {CourseService} from "../services/course";
import fp from "fastify-plugin";
import {courseDelete, courseGet, coursePost, coursePut, coursesGet} from "../docs/course";

const coursesSchema = {
    schema: {
        tags: ["Course"],
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: {type: "number", example: 1},
                        name: {type: "string", example: "Software Development Studio 1"},
                        description: {type: "string", example: "This course ...."},
                        ects: {type: "number", example: 6},
                        hoursOfLecture: {type: "number", example: 3},
                        hoursOfLabs: {type: "number", example: 20},
                        numberOfExams: {type: "number", example: 1},
                        isAvailable: {type: "boolean", example: true},
                        fieldOfStudyId: {type: "number", example: 1},
                        studyLevelId: {type: "number", example: 2}
                    }
                },
            },
        },
    }
};

interface courseParams {
    id: number;
}

interface courseAttrs {
    name: string;
    description: string;
    ects: number;
    hoursOfLecture: number;
    hoursOfLabs: number;
    numberOfExams: number;
    isAvailable: boolean;
    fieldOfStudyId: number;
    studyLevelId: number;
}

const CourseRoutes: FastifyPluginAsync = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    const courseService: CourseService = new CourseService(app);

    app.get('/courses', coursesGet, async (request, response) => {
        try {
            const courses: Course[] = await courseService.getAll();
            return response.code(200).send(courses);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.get<{ Params: courseParams }>('/course/:id', courseGet, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const course: Course | null = await courseService.get(id);
            if (!course) {
                return response.code(404).send({error: "Not found"});
            }

            return response.code(200).send(course);
        } catch (error) {
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.post<{ Body: courseAttrs }>('/course', coursePost, async (request, response) => {
        try {
            const body: courseAttrs = request.body;
            const {
                name,
                description,
                ects,
                hoursOfLecture,
                hoursOfLabs,
                numberOfExams,
                isAvailable,
                fieldOfStudyId,
                studyLevelId
            } = body;

            if (!name || !description || !ects || !hoursOfLecture || !hoursOfLabs || !numberOfExams || !fieldOfStudyId || !studyLevelId) {
                return response.code(400).send({error: "Bad Request"});
            }

            const course: Course = await courseService.create(
                name,
                description,
                Number(ects),
                Number(hoursOfLecture),
                Number(hoursOfLabs),
                Number(numberOfExams),
                isAvailable || false,
                Number(fieldOfStudyId),
                Number(studyLevelId)
            );
            return response.code(201).send(course);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.put<{ Params: courseParams, Body: courseAttrs }>('/course/:id', coursePut, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: courseAttrs = request.body;
            const {
                name,
                description,
                ects,
                hoursOfLecture,
                hoursOfLabs,
                numberOfExams,
                isAvailable,
                fieldOfStudyId,
                studyLevelId
            } = body;

            if (!name || !description || !ects || !hoursOfLecture || !hoursOfLabs || !numberOfExams || !isAvailable || !fieldOfStudyId || !studyLevelId) {
                return response.code(400).send({error: "Bad Request"});
            }

            const course: Course = await courseService.update(
                id,
                name,
                description,
                Number(ects),
                Number(hoursOfLecture),
                Number(hoursOfLabs),
                Number(numberOfExams),
                isAvailable,
                Number(fieldOfStudyId),
                Number(studyLevelId)
            );
            if (!course) {
                return response.code(404).send({error: "Not found"});
            }

            return response.code(200).send(course);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.delete<{ Params: courseParams }>('/course/:id', courseDelete, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const course: Course = await courseService.delete(id);
            if (!course) {
                return response.code(404).send({error: "Not found"});
            }

            return response.code(204).send(course);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });
}
export default fp(CourseRoutes);