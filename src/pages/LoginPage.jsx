import { TextField, InputLabel, Select, MenuItem, FormControl, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from "../Schema/LoginSchema";
import { loginFunction } from "../Services/AuthServices";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import image from "../assets/start.png"




const LoginPage = () => {
    const navigate = useNavigate()
    const { isLogged, setIsLogged } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [apiErrorMsg, setApiErrorMsg] = useState("");


    const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
        defaultValues: {

            email: "",
            password: "",

        }
        , resolver: zodResolver(schema)
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

        // console.log(response);




    }


    return <>
        <div className="container mx-auto h-screen">
            <div className="grid grid-cols-5  items-center py-5">
                <div className="col-span-3 hidden lg:flex justify-center items-center text-center">
                    <div>
                        <h1 className="text-5xl text-blue-600 font-bold mb-4">Login now!</h1>
                        <p className="text-gray-600">Connect with friends and the world around you.</p>
                        <img src={image} className="w-[450px]" alt="" />
                    </div>
                </div>
                <div className="col-span-5 lg:col-span-2 px-4 py-10 shadow-2xl mx-2 rounded-2xl ">
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="flex flex-col gap-4">
                            <h1 className="block lg:hidden text-3xl text-blue-600 font-bold mb-5 text-center">Login now !</h1>


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


                            <Button loading={isLoading} loadingPosition="start" variant="outlined" sx={{

                                borderRadius: "5px",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                            }} type="submit">Login</Button>
                            {apiErrorMsg && <p className="p-2 bg-red-200 text-red-800 text-sm text-center rounded-md">{apiErrorMsg}</p>}
                            <p className="text-center">You don't have an account ? <Link to={"/register"} className="text-blue-500">Register now</Link></p>
                        </div>
                    </form >
                </div >
            </div>

        </div>

    </>
}

export default LoginPage;