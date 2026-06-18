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
    }
    , resolver: zodResolver(schema)
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

    // console.log(response);




  }


  return <>
    <div className="py-5 my-5  max-w-2xl mx-2 md:mx-auto shadow-2xl px-4 rounded-4xl ">
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-shadow-lg text-center">Register Form</h1>
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
                borderRadius: "16px",
              },
            }}
          />
          {/* this is name field end */}

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

            type="date"
            error={errors.dateOfBirth?.message ? true : false}
            helperText={`${errors.dateOfBirth?.message || ""}`}
            {...register("dateOfBirth")}
            label="dateOfBirth"
            variant="outlined"
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
              },
            }}
          />



          <Controller
            name="gender"

            control={control}
            rules={{ required: "gender is required" }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.gender} sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
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
                borderRadius: "16px",

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
                borderRadius: "16px",
              },
            }}
          />
          <Button loading={isLoading} loadingPosition="start" variant="outlined" sx={{

            borderRadius: "16px",
            paddingTop: "10px",
            paddingBottom: "10px",

          }} type="submit">Register</Button>
          {apiErrorMsg && <p className="p-2 bg-red-200 text-red-800 text-sm text-center rounded-md">{apiErrorMsg}</p>}
          {apiSuccessMsg && <p className="p-2 bg-green-200 text-green-800 text-sm text-center rounded-md">{apiSuccessMsg}</p>}
          <p className="text-center">I already have an account ? <Link to={"/login"} className="text-blue-500">login now</Link></p>

        </div>
      </form >
    </div >

  </>
}

export default RegisterPage;


