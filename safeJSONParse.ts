export const safeJSONParse = (jsonstr) => {
  try {
    return JSON.parse(jsonstr);
  } catch (err) {
    return null;
  }
};
