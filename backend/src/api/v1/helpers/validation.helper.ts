import Validator from "fastest-validator";

const v = new Validator({
    useNewCustomCheckerFunction: true,
});

const CreateAccountSchema = {
    AccountName: {
        type: "string",
        alphanum: true,
        empty: false,
        min: 5,
        max: 12,
        messages: {
            stringAlphanum: "Username cannot contain special chars",
            stringEmpty: "Username cannot be empty",
            stringMin: "Username must be 5-12 chars",
            stringMax: "Username must be 5-12 chars",
        },
    },

    Email: {
        type: "email",
        empty: false,
        messages: {
            emailEmpty: "Email cannot be empty",
            email: "Email is not valid",
        },
    },

    Password: {
        type: "string",
        min: 6,
        max: 14,
        messages: {
            stringMin: "Password must be 6-14 chars",
            stringMax: "Password must be 6-14 chars",
        },
    },
};

export const CreateAccountValidation = v.compile(CreateAccountSchema);
