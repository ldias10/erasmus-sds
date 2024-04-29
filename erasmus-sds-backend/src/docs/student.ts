export const studentsGet = {
    schema: {
        tags: ["Student"],
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
                        countryId: {type: "integer"},
                        schoolId: {type: "integer"},
                        studyLevelId: {type: "integer"},
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

export const studentGet = {
    schema: {
        tags: ["Student"],
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
                    isVerified: {type: "boolean"},
                    countryId: {type: "integer"},
                    schoolId: {type: "integer"},
                    studyLevelId: {type: "integer"},
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

export const studentPost = {
    schema: {
        tags: ["Student"],
        body: {
            type: "object",
            required: ["email", "password", "name", "surname", "countryId", "schoolId", "studyLevelId"],
            properties: {
                email: {type: "string"},
                password: {type: "string"},
                name: {type: "string"},
                surname: {type: "string"},
                isVerified: {type: "boolean", description: "If not specified, set to false."},
                countryId: {type: "integer"},
                schoolId: {type: "integer"},
                studyLevelId: {type: "integer"},
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
                    isVerified: {type: "boolean"},
                    countryId: {type: "integer"},
                    schoolId: {type: "integer"},
                    studyLevelId: {type: "integer"},
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

export const studentPut = {
    schema: {
        tags: ["Student"],
        params: {
            type: "object",
            properties: {
                id: {type: "integer"}
            },
            required: ["id"]
        },
        body: {
            type: "object",
            required: ["email", "name", "surname", "isVerified", "countryId", "schoolId", "studyLevelId"],
            properties: {
                email: {type: "string"},
                name: {type: "string"},
                surname: {type: "string"},
                isVerified: {type: "boolean"},
                countryId: {type: "integer"},
                schoolId: {type: "integer"},
                studyLevelId: {type: "integer"},
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    email: {type: "string"},
                    name: {type: "string"},
                    surname: {type: "string"},
                    isVerified: {type: "boolean"},
                    countryId: {type: "integer"},
                    schoolId: {type: "integer"},
                    studyLevelId: {type: "integer"},
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

export const studentPutPassword = {
    schema: {
        tags: ["Student"],
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

export const studentDelete = {
    schema: {
        tags: ["Student"],
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
