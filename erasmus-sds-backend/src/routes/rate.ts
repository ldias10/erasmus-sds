import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import {Rate} from "@prisma/client";
import fp from "fastify-plugin";
import {RateService} from "../services/rate";

interface rateParams {
    studentId: number;
    courseId: number;
}

interface rateAttrs {
    rate: number;
}

const RateRoutes: FastifyPluginAsync = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    const rateService: RateService = new RateService(app);

    app.get('/rates', {}, async (request, response) => {
        try {
            const rates: Rate[] = await rateService.getAll();
            return response.code(200).send(rates);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.get<{ Params: rateParams }>('/rate/:studentId/:courseId', {}, async (request, response) => {
        try {
            const {
                studentId,
                courseId
            } = request.params;
            const rate: Rate | null = await rateService.get(Number(studentId), Number(courseId));
            if (!rate) {
                return response.send(404);
            }

            return response.code(200).send(rate);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.post<{ Params: rateParams, Body: rateAttrs }>('/rate/:studentId/:courseId', {}, async (request, response) => {
        try {
            const {
                studentId,
                courseId
            } = request.params;
            const body: rateAttrs = request.body;
            const rating: number = body.rate;
            if (!rating) {
                return response.send(400);
            }

            const rate: Rate = await rateService.create(Number(studentId), Number(courseId), Number(rating));
            return response.code(201).send(rate);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.put<{ Params: rateParams, Body: rateAttrs }>('/rate/:studentId/:courseId', {}, async (request, response) => {
        try {
            const {
                studentId,
                courseId
            } = request.params;
            const body: rateAttrs = request.body;
            const rating: number = body.rate;
            if (!rating) {
                return response.send(400);
            }

            const rate: Rate = await rateService.update(Number(studentId), Number(courseId), Number(rating));
            if (!rate) {
                return response.send(404);
            }

            return response.code(200).send(rate);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.delete<{ Params: rateParams }>('/rate/:studentId/:courseId', {}, async (request, response) => {
        try {
            const {
                studentId,
                courseId
            } = request.params;
            const rate: Rate = await rateService.delete(Number(studentId), Number(courseId));
            if (!rate) {
                return response.send(404);
            }

            return response.code(204).send(rate);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
}
export default fp(RateRoutes);