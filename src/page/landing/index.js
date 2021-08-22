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
      <Spinner />
    </Box>
  );
});
