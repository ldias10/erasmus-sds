import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import {Comment} from "@prisma/client";
import fp from "fastify-plugin";
import {CommentService} from "../services/comment";
import {commentDelete, commentGet, commentPost, commentPut, commentsGet} from "../docs/comment";
import {StudentService} from "../services/student";
import {CourseService} from "../services/course";
import {isNull, isStringEmpty} from "../utils/utils";

interface commentParams {
    id: number;
}

interface commentAttrs {
    content: string;
    date: Date;
    studentUserId: number;
    courseId: number;
}

interface commentsGetQuery {
    Student?: boolean,
    Course?: boolean
    content?: string,
    date?: Date,
    studentUserId?: number,
    courseId?: number,
}

interface commentGetQuery {
    Student?: boolean,
    Course?: boolean
}

const CommentRoutes: FastifyPluginAsync = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    const commentService: CommentService = new CommentService(app);
    const studentService: StudentService = new StudentService(app);
    const courseService: CourseService = new CourseService(app);

    app.get<{ Querystring: commentsGetQuery }>('/comments', commentsGet, async (request, response) => {
        try {
            const {Student, Course, content, date, studentUserId, courseId} = request.query;
            const comments: Comment[] = await commentService.getAll({Student, Course}, {
                content,
                date,
                studentUserId,
                courseId
            });
            return response.code(200).send(comments);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.get<{
        Params: commentParams,
        Querystring: commentGetQuery
    }>('/comment/:id', commentGet, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const {Student, Course} = request.query;
            const comment: Comment | null = await commentService.get(id, {Student, Course});
            if (!comment) {
                return response.code(404).send({error: "The comment for the specified id was not found."});
            }

            return response.code(200).send(comment);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.post<{
        Body: commentAttrs
    }>('/comment', {preHandler: [app.authenticate, app.authorizeVerifiedUser], ...commentPost}, async (request, response) => {
        try {
            const body: commentAttrs = request.body;
            const {
                content,
                date,
                studentUserId,
                courseId
            } = body;
            if (isStringEmpty(content) || isNull(studentUserId) || isNull(courseId)) {
                return response.code(400).send({error: "Content, studentUserId and courseId must be specified."});
            }

            if (!await studentService.get(studentUserId) || !await courseService.get(courseId)) {
                return response.code(404).send({error: "Student and/or course for specified id not found."});
            }

            const comment: Comment = await commentService.create(content, date || new Date(), Number(studentUserId), Number(courseId));
            return response.code(201).send(comment);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.put<{
        Params: commentParams,
        Body: commentAttrs
    }>('/comment/:id', {preHandler: [app.authenticate, app.authorizeVerifiedUser], ...commentPut}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: commentAttrs = request.body;
            const {
                content,
                date,
                studentUserId,
                courseId
            } = body;
            if (isStringEmpty(content) || isNull(date) || isNull(studentUserId) || isNull(courseId)) {
                return response.code(400).send({error: "Content, studentUserId and courseId must be specified."});
            }

            if (!await studentService.get(studentUserId) || !await courseService.get(courseId) || !await commentService.get(id)) {
                return response.code(404).send({error: "Student and/or course for specified id not found."});
            }

            const comment: Comment = await commentService.update(id, content, date, Number(studentUserId), Number(courseId));
            return response.code(200).send(comment);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.delete<{
        Params: commentParams
    }>('/comment/:id', {preHandler: [app.authenticate, app.authorizeVerifiedUser], ...commentDelete}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            if (!await commentService.get(id)) {
                return response.code(404).send({error: "The comment for the specified id was not found."});
            }

            const comment: Comment = await commentService.delete(id);
            return response.code(204).send(comment);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });
}
export default fp(CommentRoutes);