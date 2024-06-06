"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryDelete = exports.countryPut = exports.countryPost = exports.countryGet = exports.countriesGet = void 0;
exports.countriesGet = {
    schema: {
        tags: ["Country"],
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        tag: { type: "string" },
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
exports.countryGet = {
    schema: {
        tags: ["Country"],
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
                    tag: { type: "string" },
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
exports.countryPost = {
    schema: {
        tags: ["Country"],
        body: {
            type: "object",
            required: ["name", "tag"],
            properties: {
                name: { type: "string" },
                tag: { type: "string" },
            }
        },
        response: {
            201: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    name: { type: "string" },
                    tag: { type: "string" },
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
exports.countryPut = {
    schema: {
        tags: ["Country"],
        params: {
            type: "object",
            properties: {
                id: { type: "integer" }
            },
            required: ["id"]
        },
        body: {
            type: "object",
            required: ["name", "tag"],
            properties: {
                name: { type: "string" },
                tag: { type: "string" },
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    name: { type: "string" },
                    tag: { type: "string" },
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
exports.countryDelete = {
    schema: {
        tags: ["Country"],
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
                    tag: { type: "string" },
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
