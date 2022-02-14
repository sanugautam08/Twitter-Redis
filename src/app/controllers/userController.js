import client from "../../utils/connectDb";
import apiResponse from "../helpers/apiResponse";

const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await client.hGetAll(`users:${userId}`);
    console.log(user);
    if (!user) {
      return apiResponse.notFoundResponse(res, "user not found!");
    }
    return apiResponse.successResponseWithData(
      res,
      "operation successful",
      user
    );
  } catch (error) {
    return apiResponse.ErrorResponse(res, error);
  }
};

export { getUser };
