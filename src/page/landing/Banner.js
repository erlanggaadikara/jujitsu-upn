import { observer } from "mobx-react-lite";
import { Box, Typography, Button } from "@material-ui/core";
import { navigate } from "@reach/router";

export default observer(() => {
  return (
    <Box
      sx={{
        width: { laptop: "100vw" },
        display: "flex",
        flexDirection: { mobile: "column-reverse", laptop: "row" },
      }}
    >
      <Box
        sx={{
          mx: { mobile: 10, laptop: 20 },
          my: 10,
          width: { laptop: "50%" },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "primary.light",
            fontWeight: "bold",
          }}
        >
          Born To Be Fighter!
        </Typography>
        <Box
          sx={{
            typography: { mobile: "h5", laptop: "h5" },
            color: "primary.light",
            my: 3,
          }}
        >
          Bergabung bersama kami dan siapkan dirimu menjadi Jujitsan sejati!
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { mobile: "column", laptop: "row" },
            justifyContent: "space-evenly",
            alignItems: { laptop: "center" },
            mt: { laptop: 30, mobile: 10 },
          }}
        >
          {/* <Box sx={{ width: { laptop: "50%" } }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={() => navigate("/Daftar")}
            >
              Daftar
            </Button>
          </Box> */}
          <Box sx={{ width: { laptop: "46%" }, my: 1 }}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              size="large"
              onClick={() => {
                window.open(
                  "https://wa.me/6282217401318/?text=Halo kak, mau tanya tanya jujitsu upn"
                );
              }}
            >
              Hubungi Kami
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ my: 2, mx: 20, width: { laptop: "50%" } }}>
        <img src="asset/image/favicon.png" width={"100%"} height={"100%"} />
      </Box>
    </Box>
  );
});
