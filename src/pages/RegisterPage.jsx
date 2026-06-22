import { TextField, InputLabel, Select, MenuItem, FormControl, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from "../Schema/RegisterSchema";
import { RegisterFunction } from "../Services/AuthServices";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/start.png"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';



const RegisterPage = () => {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [apiErrorMsg, setApiErrorMsg] = useState("");
    const [apiSuccessMsg, setApiSuccessMsg] = useState("");
   

    const { register, handleSubmit, formState: { errors }, control, reset, watch, setValue } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            dateOfBirth: "",
            gender: "",
        }
        , resolver: zodResolver(schema)
    })

 const [selectedDate, setSelectedDate] = useState(
        watch("dateOfBirth") ? dayjs(watch("dateOfBirth")) : null
    );



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

        // console.log(response);




    }


    return <>
        <div className="container mx-auto  ">
            <div className="block lg:grid lg:grid-cols-5 lg:gap-4 ">
                <div className="col-span-3 hidden   lg:flex justify-center items-center text-center">
                    <div>
                        <h1 className="text-5xl text-blue-600 font-bold mb-4">Register now !</h1>
                        <p className="text-gray-600">Connect with friends and the world around you.</p>
                        <img src={image} className="w-[450px]" alt="" />
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="py-6 mt-3 mb-6 max-w-2xl mx-2 md:mx-auto shadow-2xl px-4 rounded-xl  ">
                        <form onSubmit={handleSubmit(handleRegister)}>
                            <div className="flex flex-col gap-4">
                                <div className="block lg:hidden text-center">
                                    <h1 className="text-3xl text-blue-600 font-bold mb-2">Register now !</h1>
                                </div>
                                {/* <h1 className="text-2xl font-bold text-shadow-lg text-center">Register Form</h1> */}
                                {/* this is name field start*/}
                                <TextField
                                    error={errors.name?.message ? true : false}
                                    helperText={`${errors.name?.message || ""}`}

                                    label="Name"
                                    type="name"
                                    {...register("name")}
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "5px",
                                        },
                                    }}
                                />


                                <TextField
                                    label="Email"
                                    type="email"
                                    error={errors.email?.message ? true : false}
                                    helperText={`${errors.email?.message || ""}`}
                                    {...register("email")}
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "5px",
                                        },
                                    }}
                                />




                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <div className="">
                                        <DatePicker
                                            label="Date of Birth"
                                            value={selectedDate}
                                            onChange={(newValue) => {
                                                const formattedDate = newValue ? newValue.format('YYYY-MM-DD') : '';
                                                setSelectedDate(newValue);
                                                setValue("dateOfBirth", formattedDate, {
                                                    shouldValidate: true,
                                                    shouldDirty: true
                                                });
                                            }}
                                            maxDate={dayjs()}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    error: !!errors.dateOfBirth,
                                                    helperText: errors.dateOfBirth?.message,
                                                    sx: {
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '5px !important',
                                                            backgroundColor: 'white',
                                                        },
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                            borderRadius: '5px !important',
                                                            borderColor: errors.dateOfBirth ? '#ef4444' : '#dddfe2',
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: errors.dateOfBirth ? '#ef4444' : '#1877f2',
                                                        },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: errors.dateOfBirth ? '#ef4444' : '#1877f2',
                                                            borderWidth: '2px',
                                                        },
                                                        '& .MuiInputBase-root': {
                                                            borderRadius: '5px !important',
                                                        }
                                                    },
                                                },
                                            }}
                                            format="DD/MM/YYYY"
                                        />
                                    </div>
                                </LocalizationProvider>


                                <Controller
                                    name="gender"

                                    control={control}
                                    rules={{ required: "gender is required" }}
                                    render={({ field }) => (
                                        <FormControl fullWidth error={!!errors.gender} sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "5px",
                                            },
                                        }}>
                                            <InputLabel>Gender</InputLabel>

                                            <Select {...field} label="Gender">
                                                <MenuItem value="male">Male</MenuItem>
                                                <MenuItem value="female">Female</MenuItem>
                                            </Select>

                                            <p style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px", marginLeft: "12px" }}>
                                                {errors.gender?.message}
                                            </p>
                                        </FormControl>
                                    )}
                                />


                                <TextField
                                    label="Password"
                                    type="password"
                                    error={errors.password?.message ? true : false}
                                    helperText={`${errors.password?.message || ""}`}
                                    {...register("password")}
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "5px",

                                        },

                                    }}
                                />



                                <TextField
                                    label="Re-password"
                                    type="password"
                                    error={errors.rePassword?.message ? true : false}
                                    helperText={`${errors.rePassword?.message || ""}`}
                                    {...register("rePassword")}
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "5px",
                                        },
                                    }}
                                />
                                <Button loading={isLoading} loadingPosition="start" variant="outlined" sx={{

                                    borderRadius: "5px",
                                    paddingTop: "10px",
                                    paddingBottom: "10px",

                                }} type="submit">Register</Button>
                                {apiErrorMsg && <p className="p-2 bg-red-200 text-red-800 text-sm text-center rounded-md">{apiErrorMsg}</p>}
                                {apiSuccessMsg && <p className="p-2 bg-green-200 text-green-800 text-sm text-center rounded-md">{apiSuccessMsg}</p>}
                                <p className="text-center">I already have an account ? <Link to={"/login"} className="text-blue-500">login now</Link></p>

                            </div>
                        </form >
                    </div >
                </div>


            </div>
        </div>

    </>
}

export default RegisterPage;
