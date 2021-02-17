function getModelName(swagger, path, verb) {
  try {
    const parameters = swagger.paths[path][verb].parameters || [];
    return parameters
      .filter((param) => param.name === "body")[0]
      .schema.$ref.split("/")[2];
  } catch (error) {
    return "";
  }
}
function refDefinition(swagger, ref) {
  try {
    return swagger.definitions[ref];
  } catch (error) {
    return {};
  }
}
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

module.exports = { getModelName, getParamArray };
