import dotenv from "dotenv";
import {fastify} from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import cors from '@fastify/cors';
import fastifyBcrypt from "fastify-bcrypt";
import fjwt from '@fastify/jwt'
import fCookie from '@fastify/cookie'
import prismaPlugin from './plugins/prisma'
import CourseRoutes from "./routes/course";
import StudyLevelRoutes from "./routes/study_level";
import FieldOfStudyRoutes from "./routes/field_of_study";
import UniversityRoutes from "./routes/university";
import SchoolRoutes from "./routes/school";
import AdminRoutes from "./routes/admin";
import CountryRoutes from "./routes/country";
import ProfessorRoutes from "./routes/professor";
import StudentRoutes from "./routes/student";
import CommentRoutes from "./routes/comment";
import RateRoutes from "./routes/rate";
import {
    authentification,
    authorizeAdmin,
    authorizeAdminOrProfessor,
    authorizeAdminOrStudent,
    authorizeAdminOrVerifiedStudent,
    authorizeProfessor,
    authorizeStudent,
    authorizeVerifiedStudent, authorizeVerifiedUser
} from "./plugins/middleware";

dotenv.config();
const app = fastify({logger: true});

const swaggerOptions = {
    swagger: {
        info: {
            title: "erasmus-sds-api",
            description: "Web documentation of our API.",
            version: "1.0.0",
        },
        host: "localhost:8080",
        schemes: ["http", "https"],
        consumes: ["application/json"],
        produces: ["application/json"],
        tags: [{name: "Default", description: "Default"}],
    }
};

const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
};

const corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
};

app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUiOptions);
app.register(cors, corsOptions);
app.register(fastifyBcrypt, {saltWorkFactor: 12});

app.register(fjwt, {secret: process.env.JWT_SECRET ?? "defaultJwtSecret"});
app.addHook('preHandler', (req, res, next) => {
    req.jwt = app.jwt
    return next()
});

app.register(fCookie, {
    secret: process.env.COOKIES_SECRET ?? "defaultCookiesSecret",
    hook: 'preHandler',
});

app.decorate('authenticate', authentification(app));
app.decorate('authorizeAdmin', authorizeAdmin(app));
app.decorate('authorizeProfessor', authorizeProfessor(app));
app.decorate('authorizeStudent', authorizeStudent(app));
app.decorate('authorizeVerifiedStudent', authorizeVerifiedStudent(app));
app.decorate('authorizeAdminOrProfessor', authorizeAdminOrProfessor(app));
app.decorate('authorizeAdminOrStudent', authorizeAdminOrStudent(app));
app.decorate('authorizeAdminOrVerifiedStudent', authorizeAdminOrVerifiedStudent(app));
app.decorate('authorizeVerifiedUser', authorizeVerifiedUser(app));

app.register(prismaPlugin);
app.register(AdminRoutes);
app.register(CommentRoutes);
app.register(CountryRoutes);
app.register(CourseRoutes);
app.register(FieldOfStudyRoutes);
app.register(ProfessorRoutes);
app.register(RateRoutes);
app.register(SchoolRoutes);
app.register(StudentRoutes);
app.register(StudyLevelRoutes);
app.register(UniversityRoutes);

app.register((app, options, done) => {
    app.get('/', {schema: {hide: true}}, (request, response) => {
        response.redirect("/docs");
    });
    done();
});

app.listen(
    {
        host: process.env.APP_HOST ?? "localhost",
        port: Number(process.env.APP_PORT) ?? 8080, // Pulled from env file.
    },
    (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    }
);