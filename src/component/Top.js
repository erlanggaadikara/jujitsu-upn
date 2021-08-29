import { Box, Typography, Button, CardMedia, Link } from "@material-ui/core";

export default ({ removeDaftar = false }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flex: "1",
        my: { laptop: 1 },
        alignItems: "center",
        justifyContent: "space-between",
        color: "primary.light",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <img src="/asset/image/favicon.png" width={60} alt="logo-jujitsu-upn" />
        <Typography
          sx={{
            fontSize: {
              mobile: 11,
              laptop: 20,
            },
            width: { mobile: 200, laptop: 500 },
          }}
        >
          UKM Jujitsu - UPN "Veteran" Jawa Timur
        </Typography>
      </Box>
      {!removeDaftar && (
        <Box>
          <Link href="/Daftar">
            <Typography sx={{ fontSize: { mobile: 11, laptop: 20 } }}>
              Daftar
            </Typography>
          </Link>
        </Box>
      )}
    </Box>
  );
};
