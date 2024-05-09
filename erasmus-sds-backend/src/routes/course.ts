import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import {Course} from "@prisma/client";
import {CourseService} from "../services/course";
import fp from "fastify-plugin";
import {courseDelete, courseGet, coursePost, coursePut, coursesGet} from "../docs/course";
import {FieldOfStudyService} from "../services/field_of_study";
import {StudyLevelService} from "../services/study_level";
import {isNull, isStringEmpty} from "../utils/utils";

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
    const filedOfStudyService: FieldOfStudyService = new FieldOfStudyService(app);
    const studyLevelService: StudyLevelService = new StudyLevelService(app);

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
                return response.code(404).send({error: "The course for the specified id was not found."});
            }

            return response.code(200).send(course);
        } catch (error) {
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.post<{
        Body: courseAttrs
    }>('/course', {preHandler: [app.authenticate, app.authorizeAdminOrProfessor], ...coursePost}, async (request, response) => {
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
            if (isStringEmpty(name) || isStringEmpty(description) || isNull(ects) || isNull(hoursOfLecture) || isNull(hoursOfLabs) || isNull(numberOfExams) || isNull(fieldOfStudyId) || isNull(studyLevelId)) {
                return response.code(400).send({error: "Name, description, ects, hoursOfLecture, hoursOfLabs, numberOfExams, fieldOfStudyId and studyLevelId must be specified."});
            }

            if (!await filedOfStudyService.get(fieldOfStudyId) || !await studyLevelService.get(studyLevelId)) {
                return response.code(404).send({error: "Field of study and/or study level for specified id not found."});
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

    app.put<{
        Params: courseParams,
        Body: courseAttrs
    }>('/course/:id', {preHandler: [app.authenticate, app.authorizeAdminOrProfessor], ...coursePut}, async (request, response) => {
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

            if (isStringEmpty(name) || isStringEmpty(description) || isNull(ects) || isNull(hoursOfLecture) || isNull(hoursOfLabs) || isNull(numberOfExams) || isNull(isAvailable) || isNull(fieldOfStudyId) || isNull(studyLevelId)) {
                return response.code(400).send({error: "Name, description, ects, hoursOfLecture, hoursOfLabs, numberOfExams, isAvailable, fieldOfStudyId and studyLevelId must be specified."});
            }

            if (!await filedOfStudyService.get(fieldOfStudyId) || !await studyLevelService.get(studyLevelId) || !await courseService.get(id)) {
                return response.code(404).send({error: "Course, field of study and/or study level for specified id not found."});
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
            return response.code(200).send(course);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.delete<{
        Params: courseParams
    }>('/course/:id', {preHandler: [app.authenticate, app.authorizeAdminOrProfessor], ...courseDelete}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            if (!await courseService.get(id)) {
                return response.code(404).send({error: "The course for the specified id was not found."});
            }

            const course: Course = await courseService.delete(id);
            return response.code(204).send(course);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });
}
export default fp(CourseRoutes);