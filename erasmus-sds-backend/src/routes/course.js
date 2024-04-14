"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_1 = require("../services/course");
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const coursesSchema = {
    schema: {
        tags: ["Course"],
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: { type: "number", example: 1 },
                        name: { type: "string", example: "Software Development Studio 1" },
                        description: { type: "string", example: "This course ...." },
                        ects: { type: "number", example: 6 },
                        hoursOfLecture: { type: "number", example: 3 },
                        hoursOfLabs: { type: "number", example: 20 },
                        numberOfExams: { type: "number", example: 1 },
                        isAvailable: { type: "boolean", example: true },
                        fieldOfStudyId: { type: "number", example: 1 },
                        studyLevelId: { type: "number", example: 2 }
                    }
                },
            },
        },
    }
};
const CourseRoutes = async (app, options) => {
    const courseService = new course_1.CourseService(app);
    app.get('/courses', {}, async (request, response) => {
        try {
            const courses = await courseService.getAll();
            return response.code(200).send(courses);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
    app.get('/course/:id', {}, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const course = await courseService.get(id);
            if (!course) {
                return response.send(404);
            }
            return response.code(200).send(course);
        }
        catch (error) {
            return response.send(500);
        }
    });
    app.post('/course', {}, async (request, response) => {
        try {
            const body = request.body;
            const { name, description, ects, hoursOfLecture, hoursOfLabs, numberOfExams, isAvailable, fieldOfStudyId, studyLevelId } = body;
            if (!name || !description || !ects || !hoursOfLecture || !hoursOfLabs || !numberOfExams || !isAvailable || !fieldOfStudyId || !studyLevelId) {
                return response.code(400).send();
            }
            const course = await courseService.create(name, description, Number(ects), Number(hoursOfLecture), Number(hoursOfLabs), Number(numberOfExams), isAvailable, Number(fieldOfStudyId), Number(studyLevelId));
            return response.code(201).send(course);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
    app.put('/course/:id', {}, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const body = request.body;
            const { name, description, ects, hoursOfLecture, hoursOfLabs, numberOfExams, isAvailable, fieldOfStudyId, studyLevelId } = body;
            if (!name || !description || !ects || !hoursOfLecture || !hoursOfLabs || !numberOfExams || !isAvailable || !fieldOfStudyId || !studyLevelId) {
                return response.code(400).send();
            }
            const course = await courseService.update(id, name, description, Number(ects), Number(hoursOfLecture), Number(hoursOfLabs), Number(numberOfExams), isAvailable, Number(fieldOfStudyId), Number(studyLevelId));
            if (!course) {
                return response.code(404).send();
            }
            return response.code(200).send(course);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
    app.delete('/course/:id', {}, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const course = await courseService.delete(id);
            if (!course) {
                return response.send(404);
            }
            return response.code(204).send(course);
        }
        catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
};
exports.default = (0, fastify_plugin_1.default)(CourseRoutes);
