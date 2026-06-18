import * as zod from "zod"; 0


export const schema = zod.object({
    name: zod.string()
        .nonempty("Name is required")
        .min(3, "Name must be at least 3 characters")
        .max(20, "Name must be at most 20 characters"),
    email: zod.string()
        .nonempty("ُEmail is required")
        .email("Invalid email address"),
    dateOfBirth: zod.string()
        .nonempty("Date of birth is required")
        .refine((date) => {
            const dob = new Date(date);
            const date_of_birth = dob.getFullYear();
            const now = new Date().getFullYear();
            const age = now - date_of_birth;
            return age >= 18;
        }, "You must be at least 18 years old"),
    gender: zod.enum(["male", "female"], {
        required_error: "Gender is required",
        invalid_type_error: "Gender is required",
    }),
    password: zod.string()
        .nonempty("Password is required")
        .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"),
    rePassword: zod.string()
        .nonempty("Password is required")
        .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"),
})
    .refine((data) => data.password === data.rePassword, {
        message: "Passwords do not match",
        path: ["rePassword"],
    }
    )


