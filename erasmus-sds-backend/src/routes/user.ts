import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify";
import fp from "fastify-plugin";
import {UserDTO, UserService} from "../services/user";
import {login, logout} from "../docs/user";

interface loginAttrs {
    email: string,
    password: string,
}

const UserRoutes: FastifyPluginAsync = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    const userService: UserService = new UserService(app);

    app.post<{ Body: loginAttrs }>('/login', login, async (request, response) => {
        try {
            const {email, password} = request.body;
            if (!await userService.login(email, password)) {
                return response.code(401).send({error: "Wrong password."});
            }

            const user: UserDTO | null = await userService.getByEmail(email);
            if (!user) {
                return response.code(404).send({error: "The user for the specified email was not found."});
            }

            const payload = {
                id: user.id,
                email: user.email,
                name: user.name,
                surname: user.surname,
                isVerified: user.isVerified
            }
            const token: string = request.jwt.sign(payload);

            response.setCookie('access_token', token, {
                path: '/',
                httpOnly: true,
                secure: true,
            });

            return {access_token: token};
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });

    app.delete('/logout', {preHandler: [app.authenticate], ...logout}, async (request, response) => {
        try {
            response.clearCookie('access_token');
            return response.code(200).send({message: 'Logout successful'});
        } catch (error) {
            request.log.error(error);
            return response.code(500).send({error: "Internal Server Error"});
        }
    });
}
export default fp(UserRoutes);