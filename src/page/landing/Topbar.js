import { observer } from "mobx-react-lite";
import { Box, Typography, Link } from "@material-ui/core";

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
      {/* <Typography
        variant="h6"
        sx={{ color: "primary.light", mx: 2, fontWeight: "bold" }}
      >
        Blog
      </Typography>
      <Link href="/Daftar">
        <Typography
          variant="h6"
          sx={{ color: "primary.light", mx: 3, fontWeight: "bold" }}
        >
          Daftar
        </Typography>
      </Link> */}
    </Box>
  );
});
