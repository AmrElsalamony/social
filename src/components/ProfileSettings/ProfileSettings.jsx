import { useContext, useRef, useState } from "react";
import { Avatar, TextField, Button } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { UserContext } from "../../Contexts/UserContext";
import { changePasswordApi, uploadProfilePhoto } from "../../Services/Profile";

export default function ProfileSettings() {
  const fileRef = useRef(null);

  const { userData, setUserData } = useContext(UserContext);

  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);



  const handlePickImage = () => {
    fileRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPhotoFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setPhotoFile(null);
    setPreview(null);
    fileRef.current.value = "";
  };

  async function updateProfilePicture() {
    try {
      const res = await uploadProfilePhoto(photoFile);
      // console.log(res.data.photo);

      if (res.data.photo) {
        setUserData((prev) => ({
          ...prev,
          photo: res.data.photo,
        }));

        removeImage();
      }
    } catch (error) {
      console.log(error);
    }
  }



  async function handlePasswordUpdate(password, newPassword) {
    const newPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    if (newPasswordRegex.test(newPassword)) {
      try {
        setError("");
        setSuccess("");
        setLoading(true);

        const res = await changePasswordApi(password, newPassword);

        console.log(res);


        if (res.success === false) {
          setError(res.message || "Something went wrong");
          return;
        }


        localStorage.setItem("token", res.data.token);
        setPassword("")
        setNewPassword("")
        setSuccess("Password updated successfully");

      } catch (error) {
        setError("Server error");
      } finally {
        setLoading(false);
      }

    } else {
      setError("Password must start with a capital letter and contain at least one special character ")

    }
  }



  return (
   <div className="container mx-auto px-3 pt-5">
     <div className="w-full max-w-2xl mx-auto space-y-6">

      {/* PROFILE PHOTO */}
      <div className="bg-white shadow-md rounded-2xl p-4 border">

        <h2 className="text-lg font-semibold mb-4">
          Profile Photo
        </h2>

        <div className="flex items-center gap-4">

          <Avatar
            src={preview || userData?.photo}
            sx={{ width: 90, height: 90 }}
            className="bg-gray-100"
          />

          <div className="flex flex-col gap-2">

            <input
              type="file"
              ref={fileRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />

            <Button
              variant="outlined"
              startIcon={<PhotoCameraIcon />}
              onClick={handlePickImage}
              sx={{ textTransform: "none" }}
            >
              Change Photo
            </Button>

            <Button
              variant="contained"
              disabled={!photoFile}
              onClick={updateProfilePicture}
              sx={{ textTransform: "none" }}
            >
              Save Photo
            </Button>

            {photoFile && (
              <Button
                variant="contained"
                onClick={removeImage}
                sx={{ textTransform: "none", backgroundColor: "#ef5350" }}
              >
                delete Photo
              </Button>
            )}

          </div>

        </div>
      </div>

      {/* PASSWORD */}
      <div className="bg-white shadow-md rounded-2xl p-4 border">

        <h2 className="text-lg font-semibold mb-4">
          Change Password
        </h2>

        <div className="flex flex-col gap-3">

          <TextField
            type="password"
            label="Current Password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            type="password"
            label="New Password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {error && (
            <p className="text-red-900 text-sm mt-2 bg-red-200 py-2 text-center rounded-lg">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-900 text-sm mt-2 bg-green-200 py-2 text-center rounded-lg">
              {success}
            </p>
          )}
          <Button
            variant="contained"
            disabled={!password || !newPassword}
            onClick={() => handlePasswordUpdate(password, newPassword)}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
            }}
          >
            {loading ? "Loading..." : "Change Password"}
          </Button>


        </div>

      </div>

    </div>
   </div>
  );
}