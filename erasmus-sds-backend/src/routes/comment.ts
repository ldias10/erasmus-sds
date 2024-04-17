import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import {Comment} from "@prisma/client";
import fp from "fastify-plugin";
import {CommentService} from "../services/comment";

interface commentParams {
    id: number;
}

interface commentAttrs {
    content: string;
    date: Date;
    studentUserId: number;
    courseId: number;
}

const CommentRoutes: FastifyPluginAsync = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    const commentService: CommentService = new CommentService(app);

    app.get('/comments', {}, async (request, response) => {
        try {
            const comments: Comment[] = await commentService.getAll();
            return response.code(200).send(comments);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.get<{ Params: commentParams }>('/comment/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const comment: Comment | null = await commentService.get(id);
            if (!comment) {
                return response.send(404);
            }

            return response.code(200).send(comment);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.post<{ Body: commentAttrs }>('/comment', {}, async (request, response) => {
        try {
            const body: commentAttrs = request.body;
            const {
                content,
                date,
                studentUserId,
                courseId
            } = body;
            if (!content || !date || !studentUserId || !courseId) {
                return response.send(400);
            }

            const comment: Comment = await commentService.create(content, date, Number(studentUserId), Number(courseId));
            return response.code(201).send(comment);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.put<{ Params: commentParams, Body: commentAttrs }>('/comment/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: commentAttrs = request.body;
            const {
                content,
                date,
                studentUserId,
                courseId
            } = body;
            if (!content || !date || !studentUserId || !courseId) {
                return response.send(400);
            }

            const comment: Comment = await commentService.update(id, content, date, Number(studentUserId), Number(courseId));
            if (!comment) {
                return response.send(404);
            }

            return response.code(200).send(comment);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.delete<{ Params: commentParams }>('/comment/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const comment: Comment = await commentService.delete(id);
            if (!comment) {
                return response.send(404);
            }

            return response.code(204).send(comment);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
}
export default fp(CommentRoutes);