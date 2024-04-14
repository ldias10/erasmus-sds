import fp from 'fastify-plugin'
import {FastifyPluginAsync} from 'fastify'
import {PrismaClient} from '@prisma/client'


// Use TypeScript module augmentation to declare the type of app.prisma to be PrismaClient
declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient
    }
}

const prisma: FastifyPluginAsync = fp(async (app, options) => {
    const prisma = new PrismaClient();
    await prisma.$connect();

    // Make Prisma Client available through the fastify app instance: app.prisma
    app.decorate('prisma', prisma);
    app.addHook('onClose', async (app) => {
        await app.prisma.$disconnect();
    });
});

export default prisma;