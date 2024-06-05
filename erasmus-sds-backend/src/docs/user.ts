export const login = {
    schema: {
        tags: ["User"],
        body: {
            type: "object",
            required: ["email", "password"],
            properties: {
                email: {type: "string"},
                password: {type: "string"},
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    id: {type: "number"},
                    email: {type: "string"},
                    name: {type: "string"},
                    surname: {type: "string"},
                    isVerified: {type: "boolean"},
                    Admin: {type: "boolean"},
                    Professor: {type: "boolean"},
                    Student: {type: "boolean"},
                    access_token: {type: "string"},
                },
                description: "OK"
            },
            401: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Unauthorized"
            },
            404: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Not Found"
            },
            500: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Internal Server Error"
            }
        }
    }
};

export const logout = {
    schema: {
        description: "You must be logged in.",
        tags: ["User"],
        response: {
            200: {
                type: "object",
                properties: {
                    message: {type: "string"},
                },
                description: "OK"
            },
            401: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Unauthorized"
            },
            500: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Internal Server Error"
            }
        }
    }
};