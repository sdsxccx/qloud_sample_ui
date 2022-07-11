export  default  {
  "openapi": "3.0.0",
  "info": {
    "title": "API Admin Spec",
    "description": "Qloud Api gateway admin spec",
    "termsOfService": "http://www.gcstgroup.com/",
    "contact": {
      "name": "Qloudfin",
      "url": "http://www.gcstgroup.com/",
      "email": "qloudfin@gcstgroup.com"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
    },
    "version": "4.5.3"
  },
  "paths": {
    "/apikeys": {
      "get": {
        "tags": [
          "/apikeys"
        ],
        "description": "get apikey list",
        "parameters": [
          {
            "name": "cursor",
            "in": "query",
            "description": "cursor",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "pattern",
            "in": "query",
            "description": "pattern",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "count",
            "in": "query",
            "description": "count",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/inline_response_200"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "/apikeys"
        ],
        "description": "create new api key,return api key",
        "requestBody": {
          "description": "api key object",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NewApikey"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApikeySuccess"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/apikeys/{uuid}": {
      "get": {
        "tags": [
          "/apikeys/{uuid}"
        ],
        "description": "get apikey info by uuid",
        "parameters": [
          {
            "name": "uuid",
            "in": "path",
            "description": "apikey uuid to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApikeyReturn"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "/apikeys/{uuid}"
        ],
        "description": "update apikey info by uuid",
        "parameters": [
          {
            "name": "uuid",
            "in": "path",
            "description": "apikey uuid to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "api key object",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NewApikey"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Success"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "/apikeys/{uuid}"
        ],
        "description": "delete apikey by uuid",
        "parameters": [
          {
            "name": "uuid",
            "in": "path",
            "description": "apikey uuid to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Success"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/apikeys/{uuid}/package": {
      "post": {
        "tags": [
          "/apikeys/{uuid}/package"
        ],
        "description": "post apikey package connection",
        "parameters": [
          {
            "name": "uuid",
            "in": "path",
            "description": "apikey uuid to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "api key object",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ApikeyRate"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Success"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/apikeys/{uuid}/package/{name}": {
      "delete": {
        "tags": [
          "/apikeys/{uuid}/package/{name}"
        ],
        "description": "delete apikey package connection",
        "parameters": [
          {
            "name": "uuid",
            "in": "path",
            "description": "apikey uuid to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "name",
            "in": "path",
            "description": "package name to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Success"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/apikeys/{uuid}/endpoint": {
      "post": {
        "tags": [
          "/apikeys/{uuid}/endpoint"
        ],
        "description": "post apikey endpoint connection",
        "parameters": [
          {
            "name": "uuid",
            "in": "path",
            "description": "apikey uuid to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "api key object",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ApikeyRate"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Success"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/apikeys/{uuid}/endpoint/{name}": {
      "delete": {
        "tags": [
          "/apikeys/{uuid}/endpoint/{name}"
        ],
        "description": "delete apikey endpoint connection",
        "parameters": [
          {
            "name": "uuid",
            "in": "path",
            "description": "apikey uuid to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "name",
            "in": "path",
            "description": "endpoint name to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Success"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/packages": {
      "get": {
        "tags": [
          "/packages"
        ],
        "description": "get package list",
        "parameters": [
          {
            "name": "cursor",
            "in": "query",
            "description": "cursor",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "pattern",
            "in": "query",
            "description": "pattern",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "count",
            "in": "query",
            "description": "count",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/inline_response_200_3"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "/packages"
        ],
        "description": "create new package",
        "requestBody": {
          "description": "package object",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NewPackage"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Success"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/packages/{name}": {
      "get": {
        "tags": [
          "/packages/{name}"
        ],
        "description": "get  package by name",
        "parameters": [
          {
            "name": "name",
            "in": "path",
            "description": "package name to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Package"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "/packages/{name}"
        ],
        "description": "put package",
        "parameters": [
          {
            "name": "name",
            "in": "path",
            "description": "package name to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "package object",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PackageDesc"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Success"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "/packages/{name}"
        ],
        "description": "delete package",
        "parameters": [
          {
            "name": "name",
            "in": "path",
            "description": "package name to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Success"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/packages/{name}/endpoint/{ename}": {
      "post": {
        "tags": [
          "/packages/{name}/endpoint/{ename}"
        ],
        "description": "post package endpoint connection",
        "parameters": [
          {
            "name": "name",
            "in": "path",
            "description": "package name to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "ename",
            "in": "path",
            "description": "endpoint name to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Success"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "/packages/{name}/endpoint/{ename}"
        ],
        "description": "delete package endpoint connection",
        "parameters": [
          {
            "name": "name",
            "in": "path",
            "description": "package name to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "ename",
            "in": "path",
            "description": "endpoint name to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Success"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/endpoints": {
      "get": {
        "tags": [
          "/endpoints"
        ],
        "description": "get endpoint list",
        "parameters": [
          {
            "name": "cursor",
            "in": "query",
            "description": "cursor",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "pattern",
            "in": "query",
            "description": "pattern",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "count",
            "in": "query",
            "description": "count",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/inline_response_200_1"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "/endpoints"
        ],
        "description": "create new endpoint",
        "requestBody": {
          "description": "endpoint object",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PostEndpoint"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Success"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/endpoints/{ename}": {
      "get": {
        "tags": [
          "/endpoints/{ename}"
        ],
        "parameters": [
          {
            "name": "ename",
            "in": "path",
            "description": "endpoint name to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "endpoint response",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "status": {
                      "type": "string",
                      "enum": [
                        "ok"
                      ]
                    }
                  },
                  "allOf": [
                    {
                      "$ref": "#/components/schemas/EndpointWithPackage"
                    }
                  ]
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "/endpoints/{ename}"
        ],
        "parameters": [
          {
            "name": "ename",
            "in": "path",
            "description": "endpoint name to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "endpoint object",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NewEndpoint"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Success"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "/endpoints/{ename}"
        ],
        "parameters": [
          {
            "name": "ename",
            "in": "path",
            "description": "endpoint name to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Success"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/endpoints/{name}/swagger": {
      "get": {
        "tags": [
          "/endpoints/{name}/swagger"
        ],
        "description": "get openapi or swagger spec file",
        "parameters": [
          {
            "name": "name",
            "in": "path",
            "description": "endpoint name",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/swaggerobject"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/endpoints/swagger/import": {
      "post": {
        "tags": [
          "/endpoints/swagger/import"
        ],
        "description": "create api by oas 3.0 json file return name is \"title_version\"",
        "requestBody": {
          "description": "swagger object",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/openapi"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/endpointswagger"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/endpoints/{ename}/conditions": {
      "get": {
        "tags": [
          "/endpoints/{ename}/conditions"
        ],
        "parameters": [
          {
            "name": "ename",
            "in": "path",
            "description": "endpoint name to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/inline_response_200_2"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "/endpoints/{ename}/conditions"
        ],
        "parameters": [
          {
            "name": "ename",
            "in": "path",
            "description": "endpoint name to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "condition object",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Condition"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Success"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/endpoints/{ename}/conditions/{cname}": {
      "put": {
        "tags": [
          "/endpoints/{ename}/conditions/{cname}"
        ],
        "parameters": [
          {
            "name": "ename",
            "in": "path",
            "description": "endpoint name to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "cname",
            "in": "path",
            "description": "condition name to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "condition object",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ConditionWithoutName"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Success"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "/endpoints/{ename}/conditions/{cname}"
        ],
        "parameters": [
          {
            "name": "ename",
            "in": "path",
            "description": "endpoint name to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "cname",
            "in": "path",
            "description": "condition name to fetch",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Success"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/endpoints/query/baseurls": {
      "get": {
        "tags": [
          "/endpoints/query/baseurls"
        ],
        "description": "get endpoint list",
        "parameters": [
          {
            "name": "cursor",
            "in": "query",
            "description": "cursor",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "pattern",
            "in": "query",
            "description": "pattern",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "count",
            "in": "query",
            "description": "count",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/querybaseurls"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/repos/{name}": {
      "post": {
        "tags": [
          "/repos/{name}"
        ],
        "description": "put swagger",
        "parameters": [
          {
            "name": "name",
            "in": "path",
            "description": "swagger name",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "post swagger",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/objectswagger"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Success"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "get": {
        "tags": [
          "/repos/{name}"
        ],
        "description": "get swagger",
        "parameters": [
          {
            "name": "name",
            "in": "path",
            "description": "swagger name",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/objectswagger"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "/repos/{name}"
        ],
        "description": "delete swagger",
        "parameters": [
          {
            "name": "name",
            "in": "path",
            "description": "swagger name",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Success"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    },
    "/repos/swaggernames": {
      "get": {
        "tags": [
          "/repos/swaggernames"
        ],
        "description": "get swagger list",
        "parameters": [
          {
            "name": "name",
            "in": "path",
            "description": "swagger name",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "success response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/objectswaggerlist"
                }
              }
            }
          },
          "default": {
            "description": "unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Error"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "NewApikey": {
        "required": [
          "disabled"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "apikey name"
          },
          "disabled": {
            "type": "string",
            "default": "false",
            "enum": [
              "true",
              "false"
            ]
          },
          "description": {
            "type": "string"
          }
        }
      },
      "ApikeyReturn": {
        "type": "object",
        "properties": {
          "status": {
            "type": "string",
            "enum": [
              "ok"
            ]
          },
          "name": {
            "type": "string"
          },
          "disabled": {
            "type": "string",
            "enum": [
              "true",
              "false"
            ]
          },
          "description": {
            "type": "string"
          },
          "packages": {
            "type": "object",
            "additionalProperties": {
              "$ref": "#/components/schemas/Rate"
            }
          },
          "endpoints": {
            "type": "object",
            "additionalProperties": {
              "$ref": "#/components/schemas/Rate"
            }
          },
          "updated": {
            "type": "string"
          },
          "created": {
            "type": "string"
          }
        }
      },
      "ApikeyValue": {
        "type": "object",
        "properties": {
          "value": {
            "type": "string",
            "description": "apikey value",
            "format": "uuid"
          },
          "name": {
            "type": "string",
            "description": "apikey name"
          },
          "description": {
            "type": "string"
          }
        }
      },
      "ApikeyRate": {
        "required": [
          "name"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "package name"
          },
          "qpd": {
            "type": "string",
            "format": "integer"
          },
          "qph": {
            "type": "string",
            "format": "integer"
          },
          "qps": {
            "type": "string",
            "format": "integer"
          }
        }
      },
      "NewEndpoint": {
        "required": [
          "baseurl",
          "disabled",
          "name",
          "path"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "endpoint name"
          },
          "disabled": {
            "type": "string",
            "default": "false",
            "enum": [
              "true",
              "false"
            ]
          },
          "baseurl": {
            "type": "string",
            "format": "url"
          },
          "description": {
            "type": "string"
          },
          "postflows": {
            "$ref": "#/components/schemas/Flow"
          },
          "preflows": {
            "$ref": "#/components/schemas/Flow"
          }
        }
      },
      "PostEndpoint": {
        "required": [
          "baseurl",
          "disabled",
          "name"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "endpoint name"
          },
          "disabled": {
            "type": "string",
            "default": "false",
            "enum": [
              "true",
              "false"
            ]
          },
          "baseurl": {
            "type": "string",
            "format": "url"
          },
          "description": {
            "type": "string"
          }
        }
      },
      "Flow": {
        "type": "object",
        "additionalProperties": {
          "type": "string",
          "format": "url"
        }
      },
      "EndpointDesc": {
        "required": [
          "description",
          "name",
          "disabled"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "endpoint name"
          },
          "description": {
            "type": "string"
          },
          "disabled": {
            "type": "string"
          }
        }
      },
      "EndpointWithPackage": {
        "allOf": [
          {
            "$ref": "#/components/schemas/NewEndpoint"
          },
          {
            "required": [
              "packages"
            ],
            "properties": {
              "packages": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "update": {
                "type": "string"
              },
              "created": {
                "type": "string"
              }
            }
          }
        ]
      },
      "Condition": {
        "required": [
          "cname",
          "pattern",
          "target",
          "verbs",
          "scope",
          "auth",
          "perm"
        ],
        "type": "object",
        "properties": {
          "cname": {
            "type": "string",
            "description": "condition name"
          },
          "pattern": {
            "type": "string"
          },
          "target": {
            "type": "string"
          },
          "scope": {
            "type": "string",
            "enum": [
              null,
              "openbanking",
              "qloudfin",
              "mbaas"
            ]
          },
          "verbs": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "excludes": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "auth": {
            "type": "string",
            "enum": [
              true,
              false
            ]
          },
          "realmurl": {
            "type": "string"
          },
          "perm": {
            "type": "string",
            "enum": [
              true,
              false
            ]
          },
          "permurl": {
            "type": "string"
          },
          "postflows": {
            "$ref": "#/components/schemas/Flow"
          },
          "preflows": {
            "$ref": "#/components/schemas/Flow"
          }
        }
      },
      "ConditionWithoutName": {
        "required": [
          "pattern",
          "target",
          "verbs"
        ],
        "type": "object",
        "properties": {
          "pattern": {
            "type": "string"
          },
          "target": {
            "type": "string"
          },
          "scope": {
            "type": "string"
          },
          "verbs": {
            "type": "array",
            "example": [
              "POST",
              "GET",
              "PUT",
              "DELETE"
            ],
            "items": {
              "type": "string"
            }
          },
          "excludes": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "auth": {
            "type": "string",
            "example": [
              true,
              false
            ]
          },
          "realmurl": {
            "type": "string"
          },
          "perm": {
            "type": "string",
            "example": [
              true,
              false
            ]
          },
          "permurl": {
            "type": "string"
          },
          "postflows": {
            "$ref": "#/components/schemas/Flow"
          },
          "preflows": {
            "$ref": "#/components/schemas/Flow"
          }
        }
      },
      "PackageDesc": {
        "type": "object",
        "properties": {
          "description": {
            "type": "string"
          }
        }
      },
      "Package": {
        "required": [
          "name"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "package name"
          },
          "description": {
            "type": "string"
          },
          "endpoints": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "apikey": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "apidesc": {
            "type": "string",
            "description": "oas json string"
          }
        }
      },
      "NewPackage": {
        "required": [
          "name"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "package name"
          },
          "description": {
            "type": "string"
          }
        }
      },
      "openapi": {
        "type": "object",
        "description": "this is current api spec json format"
      },
      "Rate": {
        "type": "object",
        "properties": {
          "qpd": {
            "type": "string",
            "format": "integer"
          },
          "qph": {
            "type": "string",
            "format": "integer"
          },
          "qps": {
            "type": "string",
            "format": "integer"
          }
        }
      },
      "Error": {
        "required": [
          "error",
          "error_description",
          "status"
        ],
        "properties": {
          "error": {
            "type": "string"
          },
          "error_description": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "err"
            ]
          }
        }
      },
      "Success": {
        "required": [
          "status"
        ],
        "properties": {
          "status": {
            "type": "string",
            "enum": [
              "ok"
            ]
          }
        }
      },
      "ApikeySuccess": {
        "required": [
          "status",
          "uuid"
        ],
        "properties": {
          "status": {
            "type": "string",
            "enum": [
              "ok"
            ]
          },
          "uuid": {
            "type": "string",
            "format": "uuid"
          }
        }
      },
      "inline_response_200": {
        "type": "object",
        "properties": {
          "status": {
            "type": "string",
            "enum": [
              "ok"
            ]
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ApikeyValue"
            }
          },
          "cursor": {
            "type": "string"
          }
        }
      },
      "inline_response_200_1": {
        "type": "object",
        "properties": {
          "status": {
            "type": "string",
            "enum": [
              "ok"
            ]
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/EndpointDesc"
            }
          },
          "cursor": {
            "type": "string"
          }
        }
      },
      "inline_response_200_2": {
        "type": "object",
        "properties": {
          "status": {
            "type": "string",
            "enum": [
              "ok"
            ]
          },
          "conditions": {
            "type": "object",
            "additionalProperties": {
              "$ref": "#/components/schemas/ConditionWithoutName"
            }
          }
        }
      },
      "inline_response_200_3": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Package"
            }
          },
          "cursor": {
            "type": "string"
          }
        }
      },
      "endpointswagger": {
        "required": [
          "targets",
          "swagger"
        ],
        "type": "object",
        "properties": {
          "targets": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "name": {
            "type": "string",
            "description": "swagger Name"
          },
          "securityscope": {
            "type": "string"
          },
          "swagger": {
            "$ref": "#/components/schemas/openapi"
          }
        }
      },
      "baseurls": {
        "required": [
          "baseurl"
        ],
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/baseurl"
        }
      },
      "baseurl": {
        "required": [
          "status"
        ],
        "properties": {
          "name": {
            "type": "string"
          },
          "value": {
            "type": "string",
            "format": "url"
          }
        }
      },
      "putbaseurl": {
        "required": [
          "value"
        ],
        "properties": {
          "value": {
            "type": "string"
          }
        }
      },
      "swaggerobject": {
        "type": "object",
        "properties": {
          "targets": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "securityscope": {
            "type": "string"
          },
          "swaager": {
            "type": "object"
          }
        }
      },
      "querybaseurls": {
        "type": "object",
        "properties": {
          "status": {
            "type": "string",
            "enum": [
              "ok"
            ]
          },
          "data": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "objectswagger": {
        "type": "object"
      },
      "objectswaggerlist": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/objectswagger"
        }
      }
    }
  }
}
