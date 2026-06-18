import * as zod from "zod"; 0


export const schema = zod.object({

    email: zod.string()
        .nonempty("ُEmail is required")
        .email("Invalid email address"),

    password: zod.string()
        .nonempty("Password is required")
        .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"),
})

