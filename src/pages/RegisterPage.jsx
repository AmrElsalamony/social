import { TextField, InputLabel, Select, MenuItem, FormControl, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from "../Schema/RegisterSchema";
import { RegisterFunction } from "../Services/AuthServices";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [apiErrorMsg, setApiErrorMsg] = useState("");
    const [apiSuccessMsg, setApiSuccessMsg] = useState("");

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            dateOfBirth: "",
            gender: "",
        },
        resolver: zodResolver(schema)
    })

    async function handleRegister(formData) {
        setIsLoading(true)
        const response = await RegisterFunction(formData)
        if (response == true) {
            setApiSuccessMsg("Account created successfully !")
            setApiErrorMsg("")
            setTimeout(() => {
                navigate("/login")
            }, 1000);
        } else {
            setApiSuccessMsg("")
            setApiErrorMsg("Account is already exists !")
        }
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] py-5 px-4">
            <div className="w-full max-w-[980px] flex flex-col md:flex-row items-center justify-between ">
                {/* Left Side - Facebook Brand */}
                <div className="flex-1 max-w-[500px] text-center">
                    <h1 className="text-6xl font-bold text-[#1877f2] mb-4">Amr Ahmed</h1>
                    <p className="text-xl text-gray-700 leading-10">
                        Connect with friends and the world around you.
                    </p>
                </div>

                {/* Right Side - Register Card */}
                <div className="flex-1 max-w-[400px] w-full">
                    <div className="bg-white rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.1)] p-5">
                        <form onSubmit={handleSubmit(handleRegister)}>
                            <div className="space-y-3">
                                {/* Name Field */}
                                <TextField
                                    placeholder="Full Name"
                                    type="text"
                                    error={errors.name?.message ? true : false}
                                    helperText={errors.name?.message || ""}
                                    {...register("name")}
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

                                {/* Email Field */}
                                <TextField
                                    placeholder="Email address"
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
                                    placeholder="New Password"
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

                                {/* Re-Password Field */}
                                <TextField
                                    placeholder="Confirm Password"
                                    type="password"
                                    error={errors.rePassword?.message ? true : false}
                                    helperText={errors.rePassword?.message || ""}
                                    {...register("rePassword")}
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

                                {/* Date of Birth */}
                                <TextField
                                    type="date"
                                    error={errors.dateOfBirth?.message ? true : false}
                                    helperText={errors.dateOfBirth?.message || ""}
                                    {...register("dateOfBirth")}
                                    label="Date of Birth"
                                    variant="outlined"
                                    fullWidth
                                    size="medium"
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
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
                                            fontSize: "14px",
                                            color: "#606770",
                                        },
                                        "& .MuiFormHelperText-root": {
                                            marginLeft: 0,
                                            marginTop: "4px",
                                            fontSize: "12px",
                                            color: "#f02849",
                                        },
                                    }}
                                />

                                {/* Gender Dropdown */}
                                <Controller
                                    name="gender"
                                    control={control}
                                    rules={{ required: "Gender is required" }}
                                    render={({ field }) => (
                                        <FormControl 
                                            fullWidth 
                                            error={!!errors.gender}
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
                                                    fontSize: "14px",
                                                    color: "#606770",
                                                },
                                            }}
                                        >
                                            <InputLabel>Gender</InputLabel>
                                            <Select {...field} label="Gender">
                                                <MenuItem value="male">Male</MenuItem>
                                                <MenuItem value="female">Female</MenuItem>
                                            </Select>
                                            {errors.gender?.message && (
                                                <p style={{ 
                                                    color: "#f02849", 
                                                    fontSize: "12px", 
                                                    marginTop: "4px", 
                                                    marginLeft: "0px" 
                                                }}>
                                                    {errors.gender?.message}
                                                </p>
                                            )}
                                        </FormControl>
                                    )}
                                />

                                {/* Error Message */}
                                {apiErrorMsg && (
                                    <div className="text-sm text-[#f02849] text-center bg-[#ffe8e8] p-2 rounded">
                                        {apiErrorMsg}
                                    </div>
                                )}

                                {/* Success Message */}
                                {apiSuccessMsg && (
                                    <div className="text-sm text-green-600 text-center bg-green-50 p-2 rounded">
                                        {apiSuccessMsg}
                                    </div>
                                )}

                                {/* Register Button */}
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
                                        backgroundColor: "#42b72a",
                                        textTransform: "none",
                                        fontSize: "20px",
                                        fontWeight: "700",
                                        "&:hover": {
                                            backgroundColor: "#36a420",
                                        },
                                        "&:disabled": {
                                            backgroundColor: "#77a7e8",
                                        },
                                    }}
                                >
                                    Sign Up
                                </Button>

                                {/* Divider */}
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-[#dadde1]"></div>
                                    </div>
                                </div>

                                {/* Login Link */}
                                <div className="text-center pt-2 pb-3">
                                    <p className="text-sm text-gray-600">
                                        Already have an account?{" "}
                                        <Link to="/login" className="text-[#1877f2] font-semibold hover:underline">
                                            Log In
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>

              
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;