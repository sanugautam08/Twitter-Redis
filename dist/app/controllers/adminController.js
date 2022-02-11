// import apiResponse from "../helpers/apiResponse";
// import { User } from "../models";
// const getJobsPosted = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).populate("jobsPosted");
//     if (!user) {
//       return apiResponse.notFoundResponse(res, "User not found");
//     }
//     return apiResponse.successResponseWithData(
//       res,
//       "operation successful",
//       user.jobsPosted
//     );
//   } catch (error) {
//     console.log(error);
//     return apiResponse.ErrorResponse(res, "Error");
//   }
// };
// export { getJobsPosted };
"use strict";