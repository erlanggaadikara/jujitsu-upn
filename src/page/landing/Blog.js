import { observer } from "mobx-react-lite";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  useMediaQuery,
  Link,
} from "@material-ui/core";
import { Carousel } from "react-responsive-carousel";

export default observer(() => {
  const isMobile = useMediaQuery("(max-width:640px)");
  return (
    <Box sx={{ textAlign: "center", mt: 10, position: "relative" }}>
      <Typography
        variant="h3"
        sx={{ color: "primary.light", fontWeight: "bold" }}
      >
        Berita & Blog (Coming Soon)
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
          ? [0, 0, 0, 0].map((item) => (
              <Box sx={{ display: "flex", flexDirection: "row", mt: 1, p: 5 }}>
                <Content
                  src="asset/image/luwak.jpg"
                  title="Latihan Rutin"
                  description="Setiap Senin dan Rabu Setiap Senin dan Rabu Setiap Senin dan Rabu Setiap Senin dan Rabu"
                />
              </Box>
            ))
          : [0, 0].map(() => (
              <Box sx={{ display: "flex", flexDirection: "row", mt: 1, p: 5 }}>
                <Content
                  src="asset/image/luwak.jpg"
                  title="Covid-19"
                  description="Stay safe"
                />
                <Content
                  src="asset/image/luwak.jpg"
                  title="Ujian Kenaikan Tingkat"
                  description="Ujian Kenaikan Tingkat"
                />
                <Content
                  src="asset/image/luwak.jpg"
                  title="Olimpiade 2020"
                  description="Selamat untuk atlet olimpiade"
                />
                <Content
                  src="asset/image/luwak.jpg"
                  title="Pedoman latihan"
                  description="Setiap Senin dan Rabu Setiap Senin dan Rabu Setiap Senin dan Rabu Setiap Senin dan Rabu"
                />
              </Box>
            ))}
      </Carousel>
      {/* <Link>
        <Typography
          variant="h6"
          sx={{ color: "primary.light", mx: 3, fontWeight: "lighter" }}
        >
          Selengkapnya
        </Typography>
      </Link> */}
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
