"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_1 = require("../services/course");
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const course_2 = require("../docs/course");
const field_of_study_1 = require("../services/field_of_study");
const study_level_1 = require("../services/study_level");
const utils_1 = require("../utils/utils");
const CourseRoutes = async (app, options) => {
    const courseService = new course_1.CourseService(app);
    const filedOfStudyService = new field_of_study_1.FieldOfStudyService(app);
    const studyLevelService = new study_level_1.StudyLevelService(app);
    app.get('/courses', course_2.coursesGet, async (request, response) => {
        try {
            const courses = await courseService.getAll();
            return response.code(200).send(courses);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.get('/course/:id', course_2.courseGet, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const course = await courseService.get(id);
            if (!course) {
                return response.code(404).send({ error: "Not found" });
            }
            return response.code(200).send(course);
        }
        catch (error) {
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.post('/course', course_2.coursePost, async (request, response) => {
        try {
            const body = request.body;
            const { name, description, ects, hoursOfLecture, hoursOfLabs, numberOfExams, isAvailable, fieldOfStudyId, studyLevelId } = body;
            if ((0, utils_1.isStringEmpty)(name) || (0, utils_1.isStringEmpty)(description) || (0, utils_1.isNull)(ects) || (0, utils_1.isNull)(hoursOfLecture) || (0, utils_1.isNull)(hoursOfLabs) || (0, utils_1.isNull)(numberOfExams) || (0, utils_1.isNull)(fieldOfStudyId) || (0, utils_1.isNull)(studyLevelId)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            if (!await filedOfStudyService.get(fieldOfStudyId) || !await studyLevelService.get(studyLevelId)) {
                return response.code(404).send({ error: "Not found" });
            }
            const course = await courseService.create(name, description, Number(ects), Number(hoursOfLecture), Number(hoursOfLabs), Number(numberOfExams), isAvailable || false, Number(fieldOfStudyId), Number(studyLevelId));
            return response.code(201).send(course);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.put('/course/:id', course_2.coursePut, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const body = request.body;
            const { name, description, ects, hoursOfLecture, hoursOfLabs, numberOfExams, isAvailable, fieldOfStudyId, studyLevelId } = body;
            if ((0, utils_1.isStringEmpty)(name) || (0, utils_1.isStringEmpty)(description) || (0, utils_1.isNull)(ects) || (0, utils_1.isNull)(hoursOfLecture) || (0, utils_1.isNull)(hoursOfLabs) || (0, utils_1.isNull)(numberOfExams) || (0, utils_1.isNull)(isAvailable) || (0, utils_1.isNull)(fieldOfStudyId) || (0, utils_1.isNull)(studyLevelId)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            if (!await filedOfStudyService.get(fieldOfStudyId) || !await studyLevelService.get(studyLevelId) || !await courseService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            const course = await courseService.update(id, name, description, Number(ects), Number(hoursOfLecture), Number(hoursOfLabs), Number(numberOfExams), isAvailable, Number(fieldOfStudyId), Number(studyLevelId));
            return response.code(200).send(course);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.delete('/course/:id', course_2.courseDelete, async (request, response) => {
        try {
            const id = Number(request.params.id);
            if (!await courseService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            const course = await courseService.delete(id);
            return response.code(204).send(course);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
};
exports.default = (0, fastify_plugin_1.default)(CourseRoutes);
