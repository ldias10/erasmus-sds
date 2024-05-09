import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import fp from "fastify-plugin";
import {AdminDTO, AdminService} from "../services/admin";
import {UserDTO} from "../services/user";
import {adminDelete, adminGet, adminPost, adminPut, adminPutPassword, adminsGet} from "../docs/admin";
import {isNull, isStringEmpty} from "../utils/utils";

interface adminParams {
    id: number;
}

interface adminCreateAttrs {
    email: string,
    password: string,
    name: string,
    surname: string,
    isVerified: boolean,
}

interface adminUpdateAttrs {
    email: string,
    name: string,
    surname: string,
    isVerified: boolean,
}

interface adminUpdatePasswordAttrs {
    currentPassword: string,
    newPassword: string,
}

const AdminRoutes: FastifyPluginAsync = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    const adminService: AdminService = new AdminService(app);

    app.get('/admins', adminsGet, async (request, response) => {
        try {
            const admins: AdminDTO[] = await adminService.getAll();
            return response.code(200).send(admins);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.get<{
        Params: adminParams
    }>('/admin/:id', adminGet, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const admin: AdminDTO | null = await adminService.get(id);
            if (!admin) {
                return response.code(404).send({error: "The admin for the specified id was not found."});
            }

            return response.code(200).send(admin);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.post<{
        Body: adminCreateAttrs
    }>('/admin', {preHandler: [app.authenticate, app.authorizeAdmin], ...adminPost}, async (request, response) => {
        try {
            const body: adminCreateAttrs = request.body;
            const {
                email,
                password,
                name,
                surname,
                isVerified
            } = body;
            if (isStringEmpty(email) || isStringEmpty(password) || isStringEmpty(name) || isStringEmpty(surname)) {
                return response.code(400).send({error: "Email, password, name and surname must be specified."});
            }

            if (await adminService.isEmailAddressAlreadyUsed(email)) {
                return response.code(409).send({error: "Email address already in use."});
            }

            const admin: AdminDTO = await adminService.create(email, password, name, surname, isVerified || false);
            return response.code(201).send(admin);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.put<{
        Params: adminParams,
        Body: adminUpdateAttrs
    }>('/admin/:id', {preHandler: [app.authenticate, app.authorizeAdmin], ...adminPut}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: adminUpdateAttrs = request.body;
            const {
                email,
                name,
                surname,
                isVerified
            } = body;
            if (isStringEmpty(email) || isStringEmpty(name) || isStringEmpty(surname) || isNull(isVerified)) {
                return response.code(400).send({error: "Email, isVerified, name and surname must be specified."});
            }

            if (!await adminService.get(id)) {
                return response.code(404).send({error: "The admin for the specified id was not found."});
            }

            if (await adminService.isEmailAddressAlreadyUsedByAnotherUser(id, email)) {
                return response.code(409).send({error: "Email address already in use."});
            }

            const admin: AdminDTO = await adminService.update(id, email, name, surname, isVerified);
            return response.code(200).send(admin);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.put<{
        Params: adminParams,
        Body: adminUpdatePasswordAttrs
    }>('/admin/:id/updatePassword', {preHandler: [app.authenticate, app.authorizeAdmin], ...adminPutPassword}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            const body: adminUpdatePasswordAttrs = request.body;
            const {
                currentPassword,
                newPassword,
            } = body;
            if (isStringEmpty(currentPassword) || isStringEmpty(newPassword)) {
                return response.code(400).send({error: "Current and new password must be specified."});
            }

            if (!await adminService.get(id)) {
                return response.code(404).send({error: "The admin for the specified id was not found."});
            }

            const isPasswordUpdated: boolean = await adminService.updatePassword(id, currentPassword, newPassword);
            if (!isPasswordUpdated) {
                return response.code(401).send({error: "Wrong password."});
            }

            return response.code(200).send(isPasswordUpdated);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.delete<{
        Params: adminParams
    }>('/admin/:id', {preHandler: [app.authenticate, app.authorizeAdmin], ...adminDelete}, async (request, response) => {
        try {
            const id: number = Number(request.params.id);
            if (!await adminService.get(id)) {
                return response.code(404).send({error: "The admin for the specified id was not found."});
            }

            const admin: UserDTO = await adminService.delete(id);
            return response.code(204).send(admin);
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });
}
export default fp(AdminRoutes);