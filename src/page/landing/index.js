import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { observer, useLocalObservable } from "mobx-react-lite";
import { action } from "mobx";
import { Box, Typography } from "@material-ui/core";
import Spinner from "component/Spinner";
import Topbar from "page/landing/Topbar";
import Banner from "page/landing/Banner";
import Kegiatan from "page/landing/Kegiatan";
import Counter from "page/landing/Counter";
import Blog from "page/landing/Blog";

export default observer(() => {
  const meta = useLocalObservable(() => ({
    position: 0,
  }));

  const handleScroll = action(() => {
    const getPosition = window.pageYOffset;
    console.log(getPosition);
    meta.position = getPosition;
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "bg.main",
      }}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Honeybadger</title>
      </Helmet>
      <Topbar />
      <Banner />
      <Counter position={Number(meta.position)} />
      <Kegiatan />
      <Blog />
      <Box
        sx={{
          position: "relative",
          bottom: 0,
          width: "100vw",
          alignContent: "center",
          py: 2,
          mt: 10,
          color: "primary.main",
        }}
      >
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Copyright © 2021 | All Right Reserved
        </Typography>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Unit Kegiatan Mahasiswa Jujitsu - UPN "Veteran" Jawa Timur
        </Typography>
      </Box>
    </Box>
  );
});
