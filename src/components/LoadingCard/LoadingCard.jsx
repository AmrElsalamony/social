import { Skeleton, Box, Stack } from "@mui/material";

export default function LoadingCard() {
  return (
    <Box
    className ="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl shadow-lg"
      sx={{
        
        margin: "20px auto",
        padding: 2,
        borderRadius: 3,
        border: "1px solid #e0e0e0",
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      <Stack direction="row" spacing={2} >
        <Skeleton variant="circular" width={45} height={45} />
        <Box sx={{ flex: 1 }}>
          <Skeleton width="45%" height={18} />
          <Skeleton width="25%" height={15} />
        </Box>
      </Stack>

      {/* Text */}
      <Box sx={{ mt: 2 }}>
        <Skeleton width="90%" />
        <Skeleton width="80%" />
        <Skeleton width="60%" />
      </Box>

      {/* Image */}
      <Skeleton
        variant="rectangular"
        height={300}
        sx={{ mt: 2, borderRadius: 2 }}
      />


    </Box>
  );
}