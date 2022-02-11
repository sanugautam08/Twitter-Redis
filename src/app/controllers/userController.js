import { validationResult } from "express-validator";
import apiResponse from "../helpers/apiResponse";
import { User } from "../models";

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
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

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    return apiResponse.successResponseWithData(
      res,
      "Deletion successful",
      user
    );
  } catch (error) {
    return apiResponse.ErrorResponse(res, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req).array();
    if (errors.length > 0) {
      return apiResponse.validationErrorWithData(
        res,
        errors[0].msg,
        errors[0].value
      );
    }

    const update = {
      fullName: req.body.fullName,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      city: req.body.city,
      contactNumber: req.body.contactNumber,
    };

    const user = await User.findByIdAndUpdate(req.user.id, update, {
      new: true,
    });

    if (!user) {
      return apiResponse.notFoundResponse(res, "failed to update. try again!");
    }

    return apiResponse.successResponseWithData(res, "user updated", user);
  } catch (error) {
    return apiResponse.ErrorResponse(res, error);
  }
};

export { getUser, updateUser, deleteUser };
