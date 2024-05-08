import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {UserPayload} from "../utils/types";
import {FastifyJWT} from "@fastify/jwt";
import {UserDTO, UserService} from "../services/user";

export const authentification = (app: FastifyInstance) => async (request: FastifyRequest, response: FastifyReply) => {
    try {
        const token: string | undefined = request.cookies.access_token;
        if (!token) {
            return response.status(401).send({error: "Unauthorized"});
        }

        const decoded: UserPayload = request.jwt.verify<FastifyJWT['user']>(token);
        request.user = decoded;
    } catch (error) {
        request.log.error(error);
        return response.code(500).send({error: "Internal Server Error"});
    }
}

export const authorizeAdmin = (app: FastifyInstance) => async (request: FastifyRequest, response: FastifyReply) => {
    try {
        const userService: UserService = new UserService(app);

        if (!request.user || !request.user.id) {
            return response.code(401).send({error: "You must be logged in."});
        }

        const user: UserDTO | null = await userService.get(Number(request.user.id), {Admin: true});
        if (!user) {
            return response.code(404).send({error: "Not found"});
        }

        if (!user.Admin) {
            return response.code(403).send({error: "You must be admin."});
        }

        if (!user.isVerified) {
            return response.code(403).send({error: "Your account must be verified."});
        }
    } catch (error) {
        request.log.error(error);
        return response.code(500).send({error: "Internal Server Error"});
    }
};

export const authorizeProfessor = (app: FastifyInstance) => async (request: FastifyRequest, response: FastifyReply) => {
    try {
        const userService: UserService = new UserService(app);

        if (!request.user || !request.user.id) {
            return response.code(401).send({error: "You must be logged in."});
        }

        const user: UserDTO | null = await userService.get(Number(request.user.id), {Professor: true});
        if (!user) {
            return response.code(404).send({error: "Not found"});
        }

        if (!user.Professor) {
            return response.code(403).send({error: "You must be professor."});
        }

        if (!user.isVerified) {
            return response.code(403).send({error: "Your account must be verified."});
        }
    } catch (error) {
        request.log.error(error);
        return response.code(500).send({error: "Internal Server Error"});
    }
};

export const authorizeStudent = (app: FastifyInstance) => async (request: FastifyRequest, response: FastifyReply) => {
    try {
        const userService: UserService = new UserService(app);

        if (!request.user || !request.user.id) {
            return response.code(401).send({error: "You must be logged in."});
        }

        const user: UserDTO | null = await userService.get(Number(request.user.id), {Student: true});
        if (!user) {
            return response.code(404).send({error: "Not found"});
        }

        if (!user.Student) {
            return response.code(403).send({error: "You must be student."});
        }
    } catch (error) {
        request.log.error(error);
        return response.code(500).send({error: "Internal Server Error"});
    }
};

export const authorizeVerifiedStudent = (app: FastifyInstance) => async (request: FastifyRequest, response: FastifyReply) => {
    try {
        const userService: UserService = new UserService(app);

        if (!request.user || !request.user.id) {
            return response.code(401).send({error: "You must be logged in."});
        }

        const user: UserDTO | null = await userService.get(Number(request.user.id), {Student: true});
        if (!user) {
            return response.code(404).send({error: "Not found"});
        }

        if (!user.Student) {
            return response.code(403).send({error: "You must be student."});
        }

        if (!user.isVerified) {
            return response.code(403).send({error: "Your account must be verified."});
        }
    } catch (error) {
        request.log.error(error);
        return response.code(500).send({error: "Internal Server Error"});
    }
};

export const authorizeAdminOrProfessor = (app: FastifyInstance) => async (request: FastifyRequest, response: FastifyReply) => {
    try {
        const userService: UserService = new UserService(app);

        if (!request.user || !request.user.id) {
            return response.code(401).send({error: "You must be logged in."});
        }

        const user: UserDTO | null = await userService.get(Number(request.user.id), {Student: true});
        if (!user) {
            return response.code(404).send({error: "Not found"});
        }

        if (!user.Admin || !user.Professor) {
            return response.code(403).send({error: "You must be admin or professor."});
        }

        if (!user.isVerified) {
            return response.code(403).send({error: "Your account must be verified."});
        }
    } catch (error) {
        request.log.error(error);
        return response.code(500).send({error: "Internal Server Error"});
    }
};

export const authorizeAdminOrStudent = (app: FastifyInstance) => async (request: FastifyRequest, response: FastifyReply) => {
    try {
        const userService: UserService = new UserService(app);

        if (!request.user || !request.user.id) {
            return response.code(401).send({error: "You must be logged in."});
        }

        const user: UserDTO | null = await userService.get(Number(request.user.id), {Student: true});
        if (!user) {
            return response.code(404).send({error: "Not found"});
        }

        if (!user.Admin || !user.Student) {
            return response.code(403).send({error: "You must be admin or student."});
        }

        if (user.Admin && !user.isVerified) {
            return response.code(403).send({error: "Your account must be verified."});
        }
    } catch (error) {
        request.log.error(error);
        return response.code(500).send({error: "Internal Server Error"});
    }
};

export const authorizeAdminOrVerifiedStudent = (app: FastifyInstance) => async (request: FastifyRequest, response: FastifyReply) => {
    try {
        const userService: UserService = new UserService(app);

        if (!request.user || !request.user.id) {
            return response.code(401).send({error: "You must be logged in."});
        }

        const user: UserDTO | null = await userService.get(Number(request.user.id), {Student: true});
        if (!user) {
            return response.code(404).send({error: "Not found"});
        }

        if (!user.Admin || !user.Student) {
            return response.code(403).send({error: "You must be admin or student."});
        }

        if (!user.isVerified) {
            return response.code(403).send({error: "Your account must be verified."});
        }
    } catch (error) {
        request.log.error(error);
        return response.code(500).send({error: "Internal Server Error"});
    }
};

export const authorizeVerifiedUser = (app: FastifyInstance) => async (request: FastifyRequest, response: FastifyReply) => {
    try {
        const userService: UserService = new UserService(app);

        if (!request.user || !request.user.id) {
            return response.code(401).send({error: "You must be logged in."});
        }

        const user: UserDTO | null = await userService.get(Number(request.user.id), {Student: true});
        if (!user) {
            return response.code(404).send({error: "Not found"});
        }

        if (!user.isVerified) {
            return response.code(403).send({error: "Your account must be verified."});
        }
    } catch (error) {
        request.log.error(error);
        return response.code(500).send({error: "Internal Server Error"});
    }
};
