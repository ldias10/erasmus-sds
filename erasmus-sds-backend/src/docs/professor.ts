export const professorsGet = {
    schema: {
        tags: ["Professor"],
        querystring: {
            type: 'object',
            properties: {
                email: {type: 'string', description: "Condition"},
                name: {type: 'string', description: "Condition"},
                surname: {type: 'string', description: "Condition"},
                isVerified: {type: 'boolean', description: "Condition"},
                FieldsOfStudy: {type: 'boolean', description: "Include"},
            },
        },
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
                        isVerified: {type: "boolean"},
                        FieldsOfStudy: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id: {type: "integer"},
                                    name: {type: "string"},
                                }
                            }
                        }
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
        querystring: {
            type: 'object',
            properties: {
                email: {type: 'string', description: "Condition"},
                name: {type: 'string', description: "Condition"},
                surname: {type: 'string', description: "Condition"},
                isVerified: {type: 'boolean', description: "Condition"},
                FieldsOfStudy: {type: 'boolean', description: "Include"},
            },
        },
        response: {
            200: {
                type: "object",
                properties: {
                    userId: {type: "integer"},
                    email: {type: "string"},
                    name: {type: "string"},
                    surname: {type: "string"},
                    isVerified: {type: "boolean"},
                    FieldsOfStudy: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: {type: "integer"},
                                name: {type: "string"},
                            }
                        }
                    }
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
            409: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Conflict"
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
        description: "You must be logged in as admin or professor.",
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
            401: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Unauthorized"
            },
            403: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Forbidden"
            },
            404: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Not Found"
            },
            409: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Conflict"
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
        description: "You must be logged in as admin or professor.",
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
            401: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Unauthorized"
            },
            403: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Forbidden"
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
        description: "You must be logged in as admin or professor.",
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
            401: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Unauthorized"
            },
            403: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Forbidden"
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

export const professorJoinFieldOfStudy = {
    schema: {
        description: "You must be logged in as admin or professor.",
        tags: ["Professor"],
        body: {
            type: "object",
            required: ["id", "fieldOfStudyId"],
            properties: {
                id: {type: "integer"},
                fieldOfStudyId: {type: "integer"},
            }
        },
        response: {
            201: {
                type: "boolean",
                description: "Joined"
            },
            400: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Bad Request"
            },
            401: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Unauthorized"
            },
            403: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Forbidden"
            },
            404: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Not Found"
            },
            409: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Conflict"
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
}

export const professorLeaveFieldOfStudy = {
    schema: {
        description: "You must be logged in as admin or professor.",
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
                type: "boolean",
                description: "No Content"
            },
            401: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Unauthorized"
            },
            403: {
                type: "object",
                properties: {
                    error: {type: "string"}
                },
                description: "Forbidden"
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
