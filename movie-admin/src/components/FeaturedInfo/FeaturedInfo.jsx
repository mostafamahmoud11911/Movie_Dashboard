import { Box, Grid, Typography } from "@mui/material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

export default function FeaturedInfo() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={3} sm={6} xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              bgcolor: "#fff",
              p: 2,
              borderRadius: "2px",
              border: "1px solid lightgray",
            }}
          >
            <Typography variant="p" fontSize="13px" color="#A39FC2">
              TOTAL REVENUE
            </Typography>
            <Typography variant="p" fontWeight="bold" my={2}>
              $58,425
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  bgcolor: "#D9F2E8",
                  width: "max-content",
                  padding: "3px",
                  borderRadius: "5px",
                  color: "#2CB57E",
                }}
              >
                <ArrowUpwardRoundedIcon sx={{ fontSize: "13px" }} />
                <Box variant="span" component="span" sx={{p:0}}>
                  2.47%
                </Box>
              </Box>
              <Typography variant="p" color="#A39FC2">
                since last week
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              bgcolor: "#fff",
              p: 2,
              borderRadius: "2px",
              border: "1px solid lightgray",
            }}
          >
            <Typography variant="p" fontSize="13px" color="#A39FC2">
              TOTAL REVENUE
            </Typography>
            <Typography variant="p" fontWeight="bold" my={2}>
              $58,425
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  bgcolor: "#D9F2E8",
                  width: "max-content",
                  padding: "3px",
                  borderRadius: "5px",
                  color: "#2CB57E",
                }}
              >
                <ArrowUpwardRoundedIcon sx={{ fontSize: "13px" }} />
                <Box variant="span" component="span">
                  2.47%
                </Box>
              </Box>
              <Typography variant="span" color="#A39FC2">
                since last week
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              bgcolor: "#fff",
              p: 2,
              borderRadius: "2px",
              border: "1px solid lightgray",
            }}
          >
            <Typography variant="p" fontSize="13px" color="#A39FC2">
              TOTAL REVENUE
            </Typography>
            <Typography variant="p" fontWeight="bold" my={2}>
              $58,425
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  bgcolor: "#D9F2E8",
                  width: "max-content",
                  padding: "3px",
                  borderRadius: "5px",
                  color: "#2CB57E",
                }}
              >
                <ArrowUpwardRoundedIcon sx={{ fontSize: "13px" }} />
                <Box variant="span" component="span">
                  2.47%
                </Box>
              </Box>
              <Typography variant="span" color="#A39FC2">
                since last week
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              bgcolor: "#fff",
              p: 2,
              borderRadius: "2px",
              border: "1px solid lightgray",
            }}
          >
            <Typography variant="p" fontSize="13px" color="#A39FC2">
              TOTAL REVENUE
            </Typography>
            <Typography variant="p" fontWeight="bold" my={2}>
              $58,425
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  bgcolor: "#D9F2E8",
                  width: "max-content",
                  padding: "3px",
                  borderRadius: "5px",
                  color: "#2CB57E",
                }}
              >
                <ArrowUpwardRoundedIcon sx={{ fontSize: "13px" }} />
                <Box variant="span" component="span">
                  2.47%
                </Box>
              </Box>
              <Typography variant="span" color="#A39FC2">
                since last week
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
