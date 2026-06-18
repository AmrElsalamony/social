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

            email: "amr22@gmail.com",
            password: "Amr@123456",

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
        <div className="py-5 my-5  max-w-2xl mx-2 md:mx-auto shadow-2xl px-4 rounded-4xl ">
            <form onSubmit={handleSubmit(handleLogin)}>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold text-shadow-lg text-center">Login Form</h1>
                    {/* this is name field start*/}


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
                                borderRadius: "16px",
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
                                borderRadius: "16px",

                            },

                        }}
                    />


                    <Button loading={isLoading} loadingPosition="start" variant="outlined" sx={{

                        borderRadius: "16px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                    }} type="submit">Login</Button>
                    {apiErrorMsg && <p className="p-2 bg-red-200 text-red-800 text-sm text-center rounded-md">{apiErrorMsg}</p>}
                    <p className="text-center">You don't have an account ? <Link to={"/register"} className="text-blue-500">create an account now</Link></p>
                </div>
            </form >
        </div >

    </>
}

export default LoginPage;


