"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const comment_1 = require("../services/comment");
const comment_2 = require("../docs/comment");
const student_1 = require("../services/student");
const course_1 = require("../services/course");
const utils_1 = require("../utils/utils");
const CommentRoutes = async (app, options) => {
    const commentService = new comment_1.CommentService(app);
    const studentService = new student_1.StudentService(app);
    const courseService = new course_1.CourseService(app);
    app.get('/comments', comment_2.commentsGet, async (request, response) => {
        try {
            const comments = await commentService.getAll();
            return response.code(200).send(comments);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.get('/comment/:id', comment_2.commentGet, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const comment = await commentService.get(id);
            if (!comment) {
                return response.code(404).send({ error: "Not found" });
            }
            return response.code(200).send(comment);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.post('/comment', comment_2.commentPost, async (request, response) => {
        try {
            const body = request.body;
            const { content, date, studentUserId, courseId } = body;
            if ((0, utils_1.isStringEmpty)(content) || (0, utils_1.isNull)(studentUserId) || (0, utils_1.isNull)(courseId)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            if (!await studentService.get(studentUserId) || !await courseService.get(courseId)) {
                return response.code(404).send({ error: "Not found" });
            }
            const comment = await commentService.create(content, date || new Date(), Number(studentUserId), Number(courseId));
            return response.code(201).send(comment);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.put('/comment/:id', comment_2.commentPut, async (request, response) => {
        try {
            const id = Number(request.params.id);
            const body = request.body;
            const { content, date, studentUserId, courseId } = body;
            if ((0, utils_1.isStringEmpty)(content) || (0, utils_1.isNull)(date) || (0, utils_1.isNull)(studentUserId) || (0, utils_1.isNull)(courseId)) {
                return response.code(400).send({ error: "Bad Request" });
            }
            if (!await studentService.get(studentUserId) || !await courseService.get(courseId) || !await commentService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            const comment = await commentService.update(id, content, date, Number(studentUserId), Number(courseId));
            return response.code(200).send(comment);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
    app.delete('/comment/:id', comment_2.commentDelete, async (request, response) => {
        try {
            const id = Number(request.params.id);
            if (!await commentService.get(id)) {
                return response.code(404).send({ error: "Not found" });
            }
            const comment = await commentService.delete(id);
            return response.code(204).send(comment);
        }
        catch (error) {
            request.log.error(error);
            return response.code(500).send({ error: "Internal Server Error" });
        }
    });
};
exports.default = (0, fastify_plugin_1.default)(CommentRoutes);
