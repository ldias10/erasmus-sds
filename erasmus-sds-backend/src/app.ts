import dotenv from "dotenv";
import {fastify} from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import cors from '@fastify/cors'
import prismaPlugin from './plugins/prisma'
import CourseRoutes from "./routes/course";
import StudyLevelRoutes from "./routes/study_level";
import FieldOfStudyRoutes from "./routes/field_of_study";
import UniversityRoutes from "./routes/university";
import SchoolRoutes from "./routes/school";

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
    },
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

app.register((app, options, done) => {
    app.get("/", {
        schema: {
            tags: ["Default"],
            response: {
                200: {
                    type: "object",
                    properties: {
                        ping: {type: "string"},
                    },
                },
            },
        },
        handler: (req, res) => {
            res.send({ping: "pong"});
        },
    });
    done();
});

app.register(prismaPlugin);
app.register(CourseRoutes);
app.register(FieldOfStudyRoutes);
app.register(SchoolRoutes);
app.register(StudyLevelRoutes);
app.register(UniversityRoutes);

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