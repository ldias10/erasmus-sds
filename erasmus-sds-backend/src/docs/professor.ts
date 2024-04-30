export const professorsGet = {
    schema: {
        tags: ["Professor"],
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        userId: {type: "integer"},
                        email: {type: "string"},
                        name: {type: "string"},
                        surname: {type: "string"},
                        isVerified: {type: "boolean"}
                    },
                },
                description: "OK"
            },
            500: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Internal Server Error",
            }
        }
    }
};

export const professorGet = {
    schema: {
        tags: ["Professor"],
        params: {
            type: "object",
            properties: {
                id: {type: "integer"}
            },
            required: ["id"]
        },
        response: {
            200: {
                type: "object",
                properties: {
                    userId: {type: "integer"},
                    email: {type: "string"},
                    name: {type: "string"},
                    surname: {type: "string"},
                    isVerified: {type: "boolean"}
                },
                description: "OK",
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
                description: "Internal Server Error",
            }
        }
    }
};

export const professorPost = {
    schema: {
        tags: ["Professor"],
        body: {
            type: "object",
            required: ["email", "password", "name", "surname"],
            properties: {
                email: {type: "string"},
                password: {type: "string"},
                name: {type: "string"},
                surname: {type: "string"},
                isVerified: {type: "boolean", description: "If not specified, set to false."}
            }
        },
        response: {
            201: {
                type: "object",
                properties: {
                    userId: {type: "integer"},
                    email: {type: "string"},
                    name: {type: "string"},
                    surname: {type: "string"},
                    isVerified: {type: "boolean"}
                },
                description: "Created"
            },
            400: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Bad Request"
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

export const professorPut = {
    schema: {
        tags: ["Professor"],
        params: {
            type: "object",
            properties: {
                id: {type: "integer"}
            },
            required: ["id"]
        },
        body: {
            type: "object",
            required: ["email", "name", "surname", "isVerified"],
            properties: {
                email: {type: "string"},
                name: {type: "string"},
                surname: {type: "string"},
                isVerified: {type: "boolean"}
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    userId: {type: "integer"},
                    email: {type: "string"},
                    name: {type: "string"},
                    surname: {type: "string"},
                    isVerified: {type: "boolean"}
                },
                description: "OK"
            },
            400: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Bad Request"
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

export const professorPutPassword = {
    schema: {
        tags: ["Professor"],
        params: {
            type: "object",
            properties: {
                id: {type: "integer"}
            },
            required: ["id"]
        },
        body: {
            type: "object",
            required: ["currentPassword", "newPassword"],
            properties: {
                currentPassword: {type: "string"},
                newPassword: {type: "string"},
            }
        },
        response: {
            200: {
                type: "boolean",
                description: "OK"
            },
            400: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Bad Request"
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

export const professorDelete = {
    schema: {
        tags: ["Professor"],
        params: {
            type: "object",
            properties: {
                id: {type: "integer"}
            },
            required: ["id"]
        },
        response: {
            204: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    email: {type: "string"},
                    name: {type: "string"},
                    surname: {type: "string"},
                    isVerified: {type: "boolean"}
                },
                description: "No Content"
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
