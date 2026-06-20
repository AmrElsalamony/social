import { TextField, InputLabel, Select, MenuItem, FormControl, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from "../Schema/LoginSchema";
import { loginFunction } from "../Services/AuthServices";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

const LoginPage = () => {
    const navigate = useNavigate()
    const { isLogged , setIsLogged} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [apiErrorMsg, setApiErrorMsg] = useState("");

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(schema)
    })

    async function handleLogin(formData) {
        setIsLoading(true)
        const response = await loginFunction(formData)
        if (response.success == true) {
            localStorage.setItem("token", response.data.token)
            setIsLogged(true)
            setApiErrorMsg("")
            navigate("/")
        } else {
            setApiErrorMsg(response ? response : false)
        }
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] py-4 sm:py-10 px-4">
            <div className="w-full max-w-[980px] flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-12">
                {/* Left Side - Facebook Brand */}
                <div className="flex-1 max-w-[500px] text-center">
                    <h1 className="text-4xl sm:text-6xl font-bold text-[#1877f2] mb-2 sm:mb-6">Amr Ahmed</h1>
                    <p className="text-sm sm:text-xl text-gray-700 leading-10">
                        Connect with friends and the world around you.
                    </p>
                </div>

                {/* Right Side - Login Card */}
                <div className="flex-1 max-w-[400px] w-full">
                    <div className="bg-white rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.1)] p-5">
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <div className="space-y-3">
                                {/* Email Field */}
                                <TextField
                                    placeholder="Email address or phone number"
                                    type="email"
                                    error={errors.email?.message ? true : false}
                                    helperText={errors.email?.message || ""}
                                    {...register("email")}
                                    variant="outlined"
                                    fullWidth
                                    size="medium"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "6px",
                                            backgroundColor: "#fff",
                                            "& fieldset": {
                                                borderColor: "#dddfe2",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "#1b74e4",
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "#1877f2",
                                                borderWidth: "2px",
                                            },
                                        },
                                        "& .MuiInputLabel-root": {
                                            display: "none",
                                        },
                                        "& .MuiFormHelperText-root": {
                                            marginLeft: 0,
                                            marginTop: "4px",
                                            fontSize: "12px",
                                            color: "#f02849",
                                        },
                                    }}
                                />

                                {/* Password Field */}
                                <TextField
                                    placeholder="Password"
                                    type="password"
                                    error={errors.password?.message ? true : false}
                                    helperText={errors.password?.message || ""}
                                    {...register("password")}
                                    variant="outlined"
                                    fullWidth
                                    size="medium"
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "6px",
                                            backgroundColor: "#fff",
                                            "& fieldset": {
                                                borderColor: "#dddfe2",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "#1b74e4",
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "#1877f2",
                                                borderWidth: "2px",
                                            },
                                        },
                                        "& .MuiInputLabel-root": {
                                            display: "none",
                                        },
                                        "& .MuiFormHelperText-root": {
                                            marginLeft: 0,
                                            marginTop: "4px",
                                            fontSize: "12px",
                                            color: "#f02849",
                                        },
                                    }}
                                />

                                {/* Error Message */}
                                {apiErrorMsg && (
                                    <div className="text-sm text-[#f02849] text-center bg-[#ffe8e8] p-2 rounded">
                                        {apiErrorMsg}
                                    </div>
                                )}

                                {/* Login Button */}
                                <Button
                                    loading={isLoading}
                                    loadingPosition="start"
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                    sx={{
                                        borderRadius: "6px",
                                        paddingTop: "10px",
                                        paddingBottom: "10px",
                                        backgroundColor: "#1877f2",
                                        textTransform: "none",
                                        fontSize: "20px",
                                        fontWeight: "700",
                                        "&:hover": {
                                            backgroundColor: "#166fe5",
                                        },
                                        "&:disabled": {
                                            backgroundColor: "#77a7e8",
                                        },
                                    }}
                                >
                                    Log In
                                </Button>

                                {/* Forgot Password */}
                                <div className="text-center">
                                    <button disabled  className="text-sm text-[#1877f2] hover:underline">
                                        Forgotten password?
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-[#dadde1]"></div>
                                    </div>
                                </div>

                                {/* Create Account Button */}
                                <div className="text-center pt-2 pb-3">
                                    <Link to="/register">
                                        <Button
                                            variant="contained"
                                            sx={{
                                                borderRadius: "6px",
                                                paddingTop: "10px",
                                                paddingBottom: "10px",
                                                paddingLeft: "16px",
                                                paddingRight: "16px",
                                                backgroundColor: "#42b72a",
                                                textTransform: "none",
                                                fontSize: "17px",
                                                fontWeight: "700",
                                                "&:hover": {
                                                    backgroundColor: "#36a420",
                                                },
                                            }}
                                        >
                                            Create New Account
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>

               
                </div>
            </div>
        </div>
    )
}

export default LoginPage;