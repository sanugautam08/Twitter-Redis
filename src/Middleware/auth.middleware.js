import apiResponse from "../app/helpers/apiResponse";

const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    /* Verify token and add user as payload to req object */
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];

    if (!token) {
      return apiResponse.unauthorizedResponse(res, "Unauthorized request");
    }

    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifiedUser) {
      return apiResponse.unauthorizedResponse(res, "Unauthorized request");
    }

    req.user = verifiedUser;
    next();
  } catch (e) {
    return apiResponse.unauthorizedResponse(res, "Unauthorized request");
  }
};

export default authenticate;
