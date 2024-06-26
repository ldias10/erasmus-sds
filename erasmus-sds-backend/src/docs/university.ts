export const UniversitiesGet = {
    schema: {
        tags: ["University"],
        querystring: {
            type: 'object',
            properties: {
                name: {type: 'string', description: "Condition"},
                countryId: {type: 'integer', description: "Condition"},
                Country: {type: 'boolean', description: "Include"},
                Schools: {type: 'boolean', description: "Include"},
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
                        countryId: {type: "integer"},
                        Country: {
                            type: "object",
                            properties: {
                                id: {type: "integer"},
                                name: {type: "string"},
                                tag: {type: "string"},
                            }
                        },
                        Schools: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id: {type: "integer"},
                                    name: {type: "string"},
                                    universityId: {type: "integer"},
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

export const UniversityGet = {
    schema: {
        tags: ["University"],
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
                Country: {type: 'boolean', description: "Include"},
                Schools: {type: 'boolean', description: "Include"},
            },
        },
        response: {
            200: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    name: {type: "string"},
                    countryId: {type: "integer"},
                    Country: {
                        type: "object",
                        properties: {
                            id: {type: "integer"},
                            name: {type: "string"},
                            tag: {type: "string"},
                        }
                    },
                    Schools: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: {type: "integer"},
                                name: {type: "string"},
                                universityId: {type: "integer"},
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

export const UniversityPost = {
    schema: {
        tags: ["University"],
        body: {
            type: "object",
            required: ["name", "countryId"],
            properties: {
                name: {type: "string"},
                countryId: {type: "integer"},
            }
        },
        response: {
            201: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    name: {type: "string"},
                    countryId: {type: "integer"},
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

export const UniversityPut = {
    schema: {
        description: "You must be logged in as admin.",
        tags: ["University"],
        params: {
            type: "object",
            properties: {
                id: {type: "integer"}
            },
            required: ["id"]
        },
        body: {
            type: "object",
            required: ["name", "countryId"],
            properties: {
                name: {type: "string"},
                countryId: {type: "integer"},
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    id: {type: "integer"},
                    name: {type: "string"},
                    countryId: {type: "integer"},
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

export const UniversityDelete = {
    schema: {
        description: "You must be logged in as admin.",
        tags: ["University"],
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
                    countryId: {type: "integer"},
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