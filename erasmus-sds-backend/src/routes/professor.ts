import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import fp from "fastify-plugin";
import {UserDTO} from "../services/user";
import {ProfessorDTO, ProfessorService} from "../services/professor";

interface professorParams {
    id: number;
}

interface professorCreateAttrs {
    email: string,
    password: string,
    name: string,
    surname: string,
    isVerified: boolean,
}

interface professorUpdateAttrs {
    email: string,
    name: string,
    surname: string,
    isVerified: boolean,
}

interface professorUpdatePasswordAttrs {
    currentPassword: string,
    newPassword: string,
}

const ProfessorRoutes: FastifyPluginAsync = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    const professorService: ProfessorService = new ProfessorService(app);

    app.get('/professors', {}, async (request, response) => {
        try {
            const professors: ProfessorDTO[] = await professorService.getAll();
            return response.code(200).send(professors);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.get<{ Params: professorParams }>('/professor/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const professor: ProfessorDTO | null = await professorService.get(id);
            if (!professor) {
                return response.send(404);
            }

            return response.code(200).send(professor);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.post<{ Body: professorCreateAttrs }>('/professor', {}, async (request, response) => {
        try {
            const body: professorCreateAttrs = request.body;
            const {
                email,
                password,
                name,
                surname,
                isVerified
            } = body;
            if (!email || !password || !name || !surname || !isVerified) {
                return response.send(400);
            }

            const professor: ProfessorDTO = await professorService.create(email, password, name, surname, isVerified);
            return response.code(201).send(professor);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.put<{
        Params: professorParams,
        Body: professorUpdateAttrs
    }>('/professor/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: professorUpdateAttrs = request.body;
            const {
                email,
                name,
                surname,
                isVerified
            } = body;
            if (!email || !name || !surname || !isVerified) {
                return response.send(400);
            }

            const professor: UserDTO = await professorService.update(id, email, name, surname, isVerified);
            if (!professor) {
                return response.send(404);
            }

            return response.code(200).send(professor);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.put<{
        Params: professorParams,
        Body: professorUpdatePasswordAttrs
    }>('/professor/:id/updatePassword', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: professorUpdatePasswordAttrs = request.body;
            const {
                currentPassword,
                newPassword,
            } = body;
            if (!currentPassword || !newPassword) {
                return response.send(400);
            }

            const isPasswordUpdated: boolean = await professorService.updatePassword(id, currentPassword, newPassword);
            if (!isPasswordUpdated) {
                return response.send(404);
            }

            return response.code(200);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });

    app.delete<{ Params: professorParams }>('/professor/:id', {}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const professor: UserDTO = await professorService.delete(id);
            if (!professor) {
                return response.send(404);
            }

            return response.code(204).send(professor);
        } catch (error) {
            request.log.error(error);
            return response.send(500);
        }
    });
}
export default fp(ProfessorRoutes);