import { body, validationResult } from "express-validator";

export const registerValidator = [
    body("fullname.firstname")
        .notEmpty().withMessage("First name is required")
        .isLength({ min: 2 }).withMessage("First name must be at least 2 chars"),

    body("fullname.lastname")
        .notEmpty().withMessage("Last name is required"),

    body("email")
        .isEmail().withMessage("Invalid email"),

    body("password")
        .isLength({ min: 5 }).withMessage("Password must be at least 5 chars"),
];

export const loginValidator = [
    body("email")
        .isEmail().withMessage("Invalid email"),

    body("password")
        .isLength({ min: 5 }).withMessage("Password must be at least 5 chars"),
];

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    next;
};