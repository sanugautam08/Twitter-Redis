import apiResponse from "../app/helpers/apiResponse";
import { User } from "../app/models";

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role < 1) {
      next();
      return;
    }
    apiResponse.unauthorizedResponse(res, "Access Denied: Not an admin");
  } catch (error) {
    apiResponse.ErrorResponse(res, "Server error");
  }
};

export default verifyAdmin;
