import { useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import { runInAction, toJS } from "mobx";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  useMediaQuery,
} from "@material-ui/core";
import { Carousel } from "react-responsive-carousel";

export default observer(() => {
  const isMobile = useMediaQuery("(max-width:640px)");
  const meta = useLocalObservable(() => ({
    arr: [],
    kegiatan: [],
  }));

  useEffect(() => {
    const fetch = async () => {
      const kegiatan = await import("sample/kegiatan");
      if (kegiatan) {
        const arrKegiatan = kegiatan.default;
        let currentArr = [];
        let initArr = [];

        for (let x in arrKegiatan) {
          initArr.push(arrKegiatan[x]);
          if (initArr.length === 4) {
            currentArr.push(initArr);
            initArr = [];
          }
        }
        console.log(currentArr);

        runInAction(() => {
          meta.arr = currentArr;
          meta.kegiatan = arrKegiatan;
        });
      }
    };

    fetch();
  }, []);

  return (
    <Box sx={{ textAlign: "center", mt: 10, position: "relative" }}>
      <Typography
        variant="h3"
        sx={{ color: "primary.light", fontWeight: "bold" }}
      >
        Kegiatan
      </Typography>
      <Carousel
        autoPlay
        interval={4000}
        transitionTime={800}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        centerMode
      >
        {isMobile
          ? meta.kegiatan.map((item) => (
              <Box
                key={item}
                sx={{ display: "flex", flexDirection: "row", mt: 1, p: 5 }}
              >
                <Content
                  src={item.img}
                  title={item.nama}
                  description={item.desc}
                />
              </Box>
            ))
          : meta.arr.map((item) => (
              <Box
                key={item}
                sx={{ display: "flex", flexDirection: "row", mt: 1, p: 5 }}
              >
                {item.map((items) => (
                  <Content
                    key={items}
                    src={items.img}
                    title={items.nama}
                    description={items.desc}
                  />
                ))}
              </Box>
            ))}
      </Carousel>
    </Box>
  );
});

const Content = ({ src, title, description }) => {
  return (
    <Card sx={{ width: 345, bgcolor: "bg.main", mx: 2 }} raised>
      <CardActionArea>
        <CardMedia sx={{ height: 140 }} image={src} />
        <CardContent sx={{ bgcolor: "bg.main" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="primary.light"
          >
            {title}
          </Typography>
          <Typography variant="body2" color="primary.light">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
