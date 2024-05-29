"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studyLevelDelete = exports.studyLevelPut = exports.studyLevelPost = exports.studyLevelGet = exports.studiesLevelGet = void 0;
exports.studiesLevelGet = {
    schema: {
        tags: ["Study Level"],
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
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
exports.studyLevelGet = {
    schema: {
        tags: ["Study Level"],
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
exports.studyLevelPost = {
    schema: {
        tags: ["Study Level"],
        body: {
            type: "object",
            required: ["name"],
            properties: {
                name: { type: "string" },
            }
        },
        response: {
            201: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    name: { type: "string" },
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
exports.studyLevelPut = {
    schema: {
        tags: ["Study Level"],
        params: {
            type: "object",
            properties: {
                id: { type: "integer" }
            },
            required: ["id"]
        },
        body: {
            type: "object",
            required: ["name"],
            properties: {
                name: { type: "string" },
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    name: { type: "string" },
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
exports.studyLevelDelete = {
    schema: {
        tags: ["Study Level"],
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
