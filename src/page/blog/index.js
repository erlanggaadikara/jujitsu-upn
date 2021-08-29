import { observer, useLocalObservable } from "mobx-react-lite";
import { Box, Typography, Button, CardMedia, Link } from "@material-ui/core";
import { useParams } from "@reach/router";
import { runInAction } from "mobx";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import Top from "component/Top";

export default observer(() => {
  const params = useParams();
  const meta = useLocalObservable(() => ({
    blog: "",
    fade: false,
  }));

  useEffect(() => {
    const fetch = async () => {
      const kegiatan = await import("sample/kegiatan");
      if (kegiatan.default) {
        const blog = kegiatan.default.find((x) => x.slug === params.slug);
        runInAction(() => {
          meta.blog = blog;
          meta.fade = true;
        });
      }
    };

    fetch();
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "bg.main",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        px: { laptop: 20, mobile: 3 },
        overflowY: "auto",
      }}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog</title>
        <meta name="description" content={meta.blog.desc} />
      </Helmet>
      <Top />
      <CardMedia sx={{ height: "40vh" }} image={"/" + meta.blog.img} />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "flex-start",
          px: { laptop: 10, mobile: 1 },
          color: "primary.light",
        }}
      >
        <Typography variant="h3" sx={{ mt: 10 }}>
          {meta.blog.nama}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, fontStyle: "italic" }}>
          Author: {meta.blog.author}
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          {meta.blog.datePost}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {meta.blog.desc}
        </Typography>
      </Box>
    </Box>
  );
});
