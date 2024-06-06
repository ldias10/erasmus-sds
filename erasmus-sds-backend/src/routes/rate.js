"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const rate_1 = require("../services/rate");
const rate_2 = require("../docs/rate");
const student_1 = require("../services/student");
const course_1 = require("../services/course");
const utils_1 = require("../utils/utils");
const RateRoutes = async (app, options) => {
    const rateService = new rate_1.RateService(app);
    const studentService = new student_1.StudentService(app);
    const courseService = new course_1.CourseService(app);
    app.get('/rates', rate_2.ratesGet, async (request, response) => {
        try {
            const rates = await rateService.getAll();
            return response.code(200).send(rates);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.get('/rate/:studentId/:courseId', rate_2.rateGet, async (request, response) => {
        try {
            const { studentId, courseId } = request.params;
            const rate = await rateService.get(Number(studentId), Number(courseId));
            if (!rate) {
                return response.code(404).send({ error: "Not found" });
            }
            return response.code(200).send(rate);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.post('/rate/:studentId/:courseId', rate_2.ratePost, async (request, response) => {
        try {
            const { studentId, courseId } = request.params;
            const body = request.body;
            const rating = body.rate;
            if ((0, utils_1.isNull)(rating)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            if (!await studentService.get(studentId) || !await courseService.get(courseId)) {
                return response.code(404).send({ error: "Not found" });
            }
            if (await rateService.get(studentId, courseId)) {
                return response.code(409).send({ error: "The resource already exists and cannot be created again." });
            }
            const rate = await rateService.create(Number(studentId), Number(courseId), Number(rating));
            return response.code(201).send(rate);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.put('/rate/:studentId/:courseId', rate_2.ratePut, async (request, response) => {
        try {
            const { studentId, courseId } = request.params;
            const body = request.body;
            const rating = body.rate;
            if ((0, utils_1.isNull)(rating)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            if (!await studentService.get(studentId) || !await courseService.get(courseId) || !await rateService.get(studentId, courseId)) {
                return response.code(404).send({ error: "Not found" });
            }
            const rate = await rateService.update(Number(studentId), Number(courseId), Number(rating));
            return response.code(200).send(rate);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.delete('/rate/:studentId/:courseId', rate_2.rateDelete, async (request, response) => {
        try {
            const { studentId, courseId } = request.params;
            if (!await rateService.get(studentId, courseId)) {
                return response.code(404).send({ error: "Not found" });
            }
            const rate = await rateService.delete(Number(studentId), Number(courseId));
            return response.code(204).send(rate);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
};
exports.default = (0, fastify_plugin_1.default)(RateRoutes);
