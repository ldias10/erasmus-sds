import {JWT} from '@fastify/jwt'

declare module 'fastify' {
    interface FastifyRequest {
        jwt: JWT
    }

    export interface FastifyInstance {
        authenticate: any,
        authorizeAdmin: any,
        authorizeProfessor: any,
        authorizeStudent: any,
        authorizeVerifiedStudent: any,
        authorizeAdminOrProfessor: any,
        authorizeAdminOrStudent: any,
        authorizeAdminOrVerifiedStudent: any,
        authorizeVerifiedUser: any,
    }
}

export type UserPayload = {
    id: number,
    email: string,
    name: string,
    surname: string,
    isVerified: boolean
}

declare module '@fastify/jwt' {
    interface FastifyJWT {
        user: UserPayload
    }
}