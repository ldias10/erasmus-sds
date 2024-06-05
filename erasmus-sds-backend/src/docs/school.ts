export const schoolsGet = {
    schema: {
        tags: ["School"],
        querystring: {
            type: 'object',
            properties: {
                name: {type: 'string', description: "Condition"},
                universityId: {type: 'integer', description: "Condition"},
                University: {type: 'boolean', description: "Include"},
                Students: {type: 'boolean', description: "Include"},
            },
        },
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: {type: "integer"},
                        name: {type: "string"},
                        universityId: {type: "integer"},
                        University: {
                            type: "object",
                            properties: {
                                id: {type: "integer"},
                                name: {type: "string"},
                                countryId: {type: "integer"},
                            }
                        },
                        Students: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    userId: {type: "integer"},
                                    countryId: {type: "integer"},
                                    schoolId: {type: "integer"},
                                    studyLevelId: {type: "integer"},
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

export const schoolGet = {
    schema: {
        tags: ["School"],
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
                name: {type: 'string', description: "Condition"},
                universityId: {type: 'integer', description: "Condition"},
                University: {type: 'boolean', description: "Include"},
                Students: {type: 'boolean', description: "Include"},
            },
        },
        response: {
            200: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    name: {type: "string"},
                    universityId: {type: "integer"},
                    University: {
                        type: "object",
                        properties: {
                            id: {type: "integer"},
                            name: {type: "string"},
                            countryId: {type: "integer"},
                        }
                    },
                    Students: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                userId: {type: "integer"},
                                countryId: {type: "integer"},
                                schoolId: {type: "integer"},
                                studyLevelId: {type: "integer"},
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

export const schoolPost = {
    schema: {
        tags: ["School"],
        body: {
            type: "object",
            required: ["name", "universityId"],
            properties: {
                name: {type: "string"},
                universityId: {type: "integer"},
            }
        },
        response: {
            201: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    name: {type: "string"},
                    universityId: {type: "integer"},
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

export const schoolPut = {
    schema: {
        description: "You must be logged in as admin.",
        tags: ["School"],
        params: {
            type: "object",
            properties: {
                id: {type: "integer"}
            },
            required: ["id"]
        },
        body: {
            type: "object",
            required: ["name", "universityId"],
            properties: {
                name: {type: "string"},
                universityId: {type: "integer"},
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    name: {type: "string"},
                    universityId: {type: "integer"},
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

export const schoolDelete = {
    schema: {
        description: "You must be logged in as admin.",
        tags: ["School"],
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
                    name: {type: "string"},
                    universityId: {type: "integer"},
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


