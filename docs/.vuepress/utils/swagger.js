/**
 * Get the name of the model used for parameters
 * @param {Object} swagger
 * @param {String} path
 * @param {String} verb
 */
function getParamModel(swagger, path, verb) {
  try {
    const parameters = swagger.paths[path][verb].parameters || [];
    return parameters
      .filter((param) => param.name === "body")[0]
      .schema.$ref.split("/")[2];
  } catch (error) {
    return "";
  }
}

/**
 * Get the name of a model used for response
 * @param {Object} swagger
 * @param {String} path
 * @param {String} verb
 * @param {String} code
 */
function getResponseModel(swagger, path, verb, code) {
  try {
    return swagger.paths[path][verb].responses[code].schema.$ref.split("/")[2];
  } catch (error) {
    return "";
  }
}

/**
 * Get the JSON response based on model name
 * @param {Object} swagger
 * @param {String} modelName
 */
function getResponseJson(swagger, modelName) {
  try {
    const obj = {};
    const properties = swagger.definitions[modelName].properties || {};
    Object.keys(properties).map((key) => {
      const prop = properties[key];
      obj[key] = prop.example === undefined ? prop.type : prop.example;
      if (key === "authorization") {
        obj[key] = {
          tenantId: {
            tenantId: "string",
            name: "string",
            roles: [],
            permissions: [],
          },
        };
      }
    });
    return obj;
  } catch (error) {
    return {};
  }
}

/**
 *
 * @param {Object} swagger
 * @param {String} ref
 */
function refDefinition(swagger, ref) {
  try {
    return swagger.definitions[ref];
  } catch (error) {
    return {};
  }
}

/**
 * Get the array of parameters based on model name
 * @param {Object} swagger
 * @param {String} modelName
 */
function getParamArray(swagger, modelName) {
  try {
    const arr = [];
    const properties = swagger.definitions[modelName].properties || {};
    const required = swagger.definitions[modelName].required || [];
    Object.keys(properties).map((key) => {
      let paramObj = properties[key];
      if (paramObj.$ref) {
        const modelName = paramObj.$ref.split("/")[2];
        paramObj = refDefinition(swagger, modelName) || paramObj;
      }
      if (key === "data") {
        paramObj.description =
          "A key-value object that you can use to save additional information.";
      }
      if (required.includes(key)) paramObj.required = true;
      paramObj.name = key;
      arr.push(paramObj);
    });
    return arr;
  } catch (error) {
    console.error("Error getting swagger parameters", error);
    return [];
  }
}

module.exports = {
  getParamModel,
  getParamArray,
  getResponseModel,
  getResponseJson,
};
