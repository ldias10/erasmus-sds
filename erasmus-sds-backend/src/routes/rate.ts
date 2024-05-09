import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import {Rate} from "@prisma/client";
import fp from "fastify-plugin";
import {RateService} from "../services/rate";
import {rateDelete, rateGet, ratePost, ratePut, ratesGet} from "../docs/rate";
import {StudentService} from "../services/student";
import {CourseService} from "../services/course";
import {isNull} from "../utils/utils";

interface rateParams {
    studentId: number;
    courseId: number;
}

interface rateAttrs {
    rate: number;
}

const RateRoutes: FastifyPluginAsync = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    const rateService: RateService = new RateService(app);
    const studentService: StudentService = new StudentService(app);
    const courseService: CourseService = new CourseService(app);

    app.get('/rates', ratesGet, async (request, response) => {
        try {
            const rates: Rate[] = await rateService.getAll();
            return response.code(200).send(rates);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.get<{ Params: rateParams }>('/rate/:studentId/:courseId', rateGet, async (request, response) => {
        try {
            const {
                studentId,
                courseId
            } = request.params;
            const rate: Rate | null = await rateService.get(Number(studentId), Number(courseId));
            if (!rate) {
                return response.code(404).send({error: "The rate for specified id was not found."});
            }

            return response.code(200).send(rate);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.post<{
        Params: rateParams,
        Body: rateAttrs
    }>('/rate/:studentId/:courseId', {preHandler: [app.authenticate, app.authorizeAdminOrVerifiedStudent], ...ratePost}, async (request, response) => {
        try {
            const {
                studentId,
                courseId
            } = request.params;
            const body: rateAttrs = request.body;
            const rating: number = body.rate;
            if (isNull(rating)) {
                return response.code(400).send({error: "Rate must be specified."});
            }

            if (!await studentService.get(studentId) || !await courseService.get(courseId)) {
                return response.code(404).send({error: "Student and/or course for specified id not found."});
            }

            if (await rateService.get(studentId, courseId)) {
                return response.code(409).send({error: "The resource already exists and cannot be created again."});
            }

            const rate: Rate = await rateService.create(Number(studentId), Number(courseId), Number(rating));
            return response.code(201).send(rate);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.put<{
        Params: rateParams,
        Body: rateAttrs
    }>('/rate/:studentId/:courseId', {preHandler: [app.authenticate, app.authorizeAdminOrVerifiedStudent], ...ratePut}, async (request, response) => {
        try {
            const {
                studentId,
                courseId
            } = request.params;
            const body: rateAttrs = request.body;
            const rating: number = body.rate;
            if (isNull(rating)) {
                return response.code(400).send({error: "Rate must be specified."});
            }

            if (!await studentService.get(studentId) || !await courseService.get(courseId) || !await rateService.get(studentId, courseId)) {
                return response.code(404).send({error: "Rate, student and/or course for specified id not found."});
            }

            const rate: Rate = await rateService.update(Number(studentId), Number(courseId), Number(rating));
            return response.code(200).send(rate);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.delete<{
        Params: rateParams
    }>('/rate/:studentId/:courseId', {preHandler: [app.authenticate, app.authorizeAdminOrVerifiedStudent], ...rateDelete}, async (request, response) => {
        try {
            const {
                studentId,
                courseId
            } = request.params;

            if (!await rateService.get(studentId, courseId)) {
                return response.code(404).send({error: "The rate for specified id was not found."});
            }

            const rate: Rate = await rateService.delete(Number(studentId), Number(courseId));
            return response.code(204).send(rate);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });
}
export default fp(RateRoutes);