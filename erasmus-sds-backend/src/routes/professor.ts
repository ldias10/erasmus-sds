import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import fp from "fastify-plugin";
import {UserDTO} from "../services/user";
import {ProfessorDTO, ProfessorService} from "../services/professor";
import {
    professorDelete,
    professorGet,
    professorPost,
    professorPut,
    professorPutPassword,
    professorsGet
} from "../docs/professor";
import {isNull, isStringEmpty} from "../utils/utils";

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

    app.get('/professors', professorsGet, async (request, response) => {
        try {
            const professors: ProfessorDTO[] = await professorService.getAll();
            return response.code(200).send(professors);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.get<{ Params: professorParams }>('/professor/:id', professorGet, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const professor: ProfessorDTO | null = await professorService.get(id);
            if (!professor) {
                return response.code(404).send({error: "Not found"});
            }

            return response.code(200).send(professor);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.post<{
        Body: professorCreateAttrs
    }>('/professor', professorPost, async (request, response) => {
        try {
            const body: professorCreateAttrs = request.body;
            const {
                email,
                password,
                name,
                surname,
                isVerified
            } = body;
            if (isStringEmpty(email) || isStringEmpty(password) || isStringEmpty(name) || isStringEmpty(surname)) {
                return response.code(400).send({error: "Bad Request"});
            }

            if (await professorService.isEmailAddressAlreadyUsed(email)) {
                return response.code(409).send({error: "Email address already in use."});
            }

            const professor: ProfessorDTO = await professorService.create(email, password, name, surname, isVerified || false);
            return response.code(201).send(professor);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.put<{
        Params: professorParams,
        Body: professorUpdateAttrs
    }>('/professor/:id', {preHandler: [app.authenticate, app.authorizeAdminOrProfessor], ...professorPut}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: professorUpdateAttrs = request.body;
            const {
                email,
                name,
                surname,
                isVerified
            } = body;
            if (isStringEmpty(email) || isStringEmpty(name) || isStringEmpty(surname) || isNull(isVerified)) {
                return response.code(400).send({error: "Bad Request"});
            }

            if (!await professorService.get(id)) {
                return response.code(404).send({error: "Not found"});
            }

            if (await professorService.isEmailAddressAlreadyUsedByAnotherUser(id, email)) {
                return response.code(409).send({error: "Email address already in use."});
            }

            const professor: ProfessorDTO = await professorService.update(id, email, name, surname, isVerified);
            return response.code(200).send(professor);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.put<{
        Params: professorParams,
        Body: professorUpdatePasswordAttrs
    }>('/professor/:id/updatePassword', {preHandler: [app.authenticate, app.authorizeAdminOrProfessor], ...professorPutPassword}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: professorUpdatePasswordAttrs = request.body;
            const {
                currentPassword,
                newPassword,
            } = body;
            if (isStringEmpty(currentPassword) || isStringEmpty(newPassword)) {
                return response.code(400).send({error: "Bad Request"});
            }

            if (!await professorService.get(id)) {
                return response.code(404).send({error: "Not found"});
            }

            const isPasswordUpdated: boolean = await professorService.updatePassword(id, currentPassword, newPassword);
            if (!isPasswordUpdated) {
                return response.code(404).send({error: "Not found"});
            }

            return response.code(200);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.delete<{
        Params: professorParams
    }>('/professor/:id', {preHandler: [app.authenticate, app.authorizeAdminOrProfessor], ...professorDelete}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            if (!await professorService.get(id)) {
                return response.code(404).send({error: "Not found"});
            }

            const professor: UserDTO = await professorService.delete(id);
            return response.code(204).send(professor);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });
}
export default fp(ProfessorRoutes);