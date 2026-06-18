import React, { useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';


import { Card, CardContent, Avatar, Typography } from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import EmailIcon from "@mui/icons-material/Email";
import WcIcon from "@mui/icons-material/Wc";
import PersonIcon from "@mui/icons-material/Person";
import { useOutletContext } from "react-router-dom";
import { useEffect } from 'react';
export default function AboutSection() {
    const { user } = useOutletContext();
    useEffect(() => {
      
     
    }, [user]);
  return (
    <Card className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto rounded-xl shadow-md">

      <CardContent>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">

          <Avatar src={user?.photo} />

          <div>
            <Typography fontWeight="bold">
              About
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Profile Information
            </Typography>

          </div>

        </div>

        {/* Info list */}

        <div className="space-y-4 text-sm">

          {/* Name */}
          <div className="flex items-center gap-2">
            <PersonIcon fontSize="small" />
            <span>{user?.name}</span>
          </div>

          {/* Username */}
          <div className="flex items-center gap-2">
            <PersonIcon fontSize="small" />
            <span>@{user?.username}</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2">
            <EmailIcon fontSize="small" />
            <span>{user?.email}</span>
          </div>

          {/* Gender */}
          <div className="flex items-center gap-2">
            <WcIcon fontSize="small" />
            <span>{user?.gender}</span>
          </div>

          {/* Birth date */}
          <div className="flex items-center gap-2">
            <CakeIcon fontSize="small" />
            <span>
              {user?.dateOfBirth &&
                new Date(user.dateOfBirth).toLocaleDateString()}
            </span>
          </div>

        </div>

      </CardContent>

    </Card>
  );
}
