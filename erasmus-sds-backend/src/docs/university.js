"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversityDelete = exports.UniversityPut = exports.UniversityPost = exports.UniversityGet = exports.UniversitiesGet = void 0;
exports.UniversitiesGet = {
    schema: {
        tags: ["University"],
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        countryId: { type: "integer" },
                    },
                },
                description: "OK"
            },
            500: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Internal Server Error",
            }
        }
    }
};
exports.UniversityGet = {
    schema: {
        tags: ["University"],
        params: {
            type: "object",
            properties: {
                id: { type: "integer" }
            },
            required: ["id"]
        },
        response: {
            200: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    name: { type: "string" },
                    countryId: { type: "integer" },
                },
                description: "OK",
            },
            404: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Not Found"
            },
            500: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Internal Server Error",
            }
        }
    }
};
exports.UniversityPost = {
    schema: {
        tags: ["University"],
        body: {
            type: "object",
            required: ["name", "countryId"],
            properties: {
                name: { type: "string" },
                countryId: { type: "integer" },
            }
        },
        response: {
            201: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    name: { type: "string" },
                    countryId: { type: "integer" },
                },
                description: "Created"
            },
            400: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Bad Request"
            },
            404: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Not Found"
            },
            500: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Internal Server Error"
            }
        }
    }
};
exports.UniversityPut = {
    schema: {
        tags: ["University"],
        params: {
            type: "object",
            properties: {
                id: { type: "integer" }
            },
            required: ["id"]
        },
        body: {
            type: "object",
            required: ["name", "countryId"],
            properties: {
                name: { type: "string" },
                countryId: { type: "integer" },
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    name: { type: "string" },
                    countryId: { type: "integer" },
                },
                description: "OK"
            },
            400: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Bad Request"
            },
            404: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Not Found"
            },
            500: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Internal Server Error"
            }
        }
    }
};
exports.UniversityDelete = {
    schema: {
        tags: ["University"],
        params: {
            type: "object",
            properties: {
                id: { type: "integer" }
            },
            required: ["id"]
        },
        response: {
            204: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    name: { type: "string" },
                    countryId: { type: "integer" },
                },
                description: "No Content"
            },
            404: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Not Found"
            },
            500: {
                type: "object",
                properties: {
                    error: { type: "string" }
                },
                description: "Internal Server Error"
            }
        }
    }
};
