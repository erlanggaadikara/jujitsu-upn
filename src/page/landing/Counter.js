import { observer } from "mobx-react-lite";
import { Box, Typography } from "@material-ui/core";
import CountUp from "react-countup";

export default observer(({ position }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { mobile: "column", laptop: "row" },
        alingItems: "center",
        justifyContent: "center",
        px: { laptop: 20 },
        py: { laptop: 16, mobile: 1 },
      }}
    >
      <CountUp start={0} end={position <= 57 ? 0 : 3} duration={2.1}>
        {({ countUpRef }) => (
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h1"
              sx={{ color: "primary.main", fontWeight: "bold" }}
              ref={countUpRef}
            ></Typography>
            <Typography variant="h3" sx={{ color: "primary.main" }}>
              Pelatih
            </Typography>
          </Box>
        )}
      </CountUp>

      <CountUp start={0} end={position <= 57 ? 0 : 50} duration={2.1}>
        {({ countUpRef }) => (
          <Box
            sx={{
              textAlign: "center",
              mx: { laptop: 8 },
              my: { mobile: 3, laptop: 0 },
            }}
          >
            <Typography
              variant="h1"
              sx={{ color: "primary.main", fontWeight: "bold" }}
              ref={countUpRef}
            ></Typography>
            <Typography variant="h3" sx={{ color: "primary.main" }}>
              Anggota
            </Typography>
          </Box>
        )}
      </CountUp>
      <CountUp start={0} end={position <= 57 ? 0 : 16} duration={2.1}>
        {({ countUpRef }) => (
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h1"
              sx={{ color: "primary.main", fontWeight: "bold" }}
              ref={countUpRef}
            ></Typography>
            <Typography variant="h3" sx={{ color: "primary.main" }}>
              Alumni
            </Typography>
          </Box>
        )}
      </CountUp>
    </Box>
  );
});
