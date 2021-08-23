import { observer } from "mobx-react-lite";
import { Box, Typography } from "@material-ui/core";
import { Link } from "@reach/router";

export default observer(() => {
  return (
    <Box
      sx={{
        py: 5,
        px: { laptop: 10, mobile: 1 },
        display: "flex",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: "primary.light", mx: 2, fontWeight: "bold" }}
      >
        Profil
      </Typography>
      <Link to="/Daftar">
        <Typography
          variant="h6"
          sx={{ color: "primary.light", mx: 3, fontWeight: "bold" }}
        >
          Daftar
        </Typography>
      </Link>
    </Box>
  );
});
