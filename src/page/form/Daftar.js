import { observer, useLocalObservable } from "mobx-react-lite";
import { useRef } from "react";
import { action } from "mobx";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  TextField,
  Button,
  Select,
  Box,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@material-ui/core";
import { MobileDatePicker } from "@material-ui/lab";
import { toBase64 } from "utils/formatFile";

export default observer(() => {
  const meta = useLocalObservable(() => ({
    photo: "asset/image/upload.png",
  }));
  const validationSchema = yup.object({
    email: yup.string().email("Enter a valid email").required("Mohon diisi"),
    nama: yup.string().required("Mohon diisi"),
    npm: yup.string().required("Mohon diisi"),
    tempatLahir: yup.string().required("Mohon diisi"),
    tanggalLahir: yup.string().required("Mohon diisi"),
    alamat: yup.string().required("Mohon diisi"),
    jenisKelamin: yup.string().required("Mohon diisi"),
    noHp: yup.string().required("Mohon diisi"),
    fakultas: yup.string().required("Mohon diisi"),
    jurusan: yup.string().required("Mohon diisi"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      nama: "",
      npm: "",
      tempatLahir: "",
      tanggalLahir: new Date(),
      alamat: "",
      jenisKelamin: "",
      noHp: "",
      fakultas: "",
      jurusan: "",
      domisili: "",
      asal: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const FileInput = useRef(null);
  const setFileToUpload = action((e) => {
    const file = e.target.files[0];
    if (file) {
      const type = file.type != "" ? file.type : null;
      toBase64(file).then(
        action((result) => {
          let respon = result.split(",");
          meta.photo =
            respon && respon[1] ? `data:${type};base64,${respon[1]}` : "";
        })
      );
    }
  });

  return (
    <Box
      sx={{
        bgcolor: "bg.main",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflowY: "auto",
        py: 2,
      }}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Daftar</title>
        <meta name="description" content="Daftar Anggota Baru" />
      </Helmet>
      <Box
        component="form"
        sx={{
          border: 1,
          borderRadius: 3,
          bgcolor: "primary.light",
          width: "80%",
          p: 3,
        }}
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Daftar Anggota Baru
        </Typography>
        <Typography variant="h6">Mohon lengkapi form berikut</Typography>
        <Box
          sx={{
            m: 7,
            display: "flex",
            flexDirection: { laptop: "row", mobile: "column" },
            alignItems: "flex-start",
            justifyContent: "space-around",
          }}
        >
          <Box sx={{ width: { laptop: "45%", mobile: "100%" } }}>
            <TextField
              label="Email *"
              type="email"
              name="email"
              variant="outlined"
              color="primary"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ mb: 1 }}
            />
            <TextField
              label="Nama *"
              name="nama"
              variant="outlined"
              color="primary"
              fullWidth
              value={formik.values.nama}
              onChange={formik.handleChange}
              error={formik.touched.nama && Boolean(formik.errors.nama)}
              helperText={formik.touched.nama && formik.errors.nama}
              sx={{ my: 1 }}
            />
            <TextField
              label="NPM *"
              name="npm"
              variant="outlined"
              color="primary"
              fullWidth
              value={formik.values.npm}
              onChange={formik.handleChange}
              error={formik.touched.npm && Boolean(formik.errors.npm)}
              helperText={formik.touched.npm && formik.errors.nama}
              sx={{ my: 1 }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: { laptop: "row", mobile: "column" },
              }}
            >
              <TextField
                label="Tempat Lahir *"
                name="tempatLahir"
                variant="outlined"
                color="primary"
                fullWidth
                value={formik.values.tempatLahir}
                onChange={formik.handleChange}
                error={
                  formik.touched.tempatLahir &&
                  Boolean(formik.errors.tempatLahir)
                }
                helperText={
                  formik.touched.tempatLahir && formik.errors.tempatLahir
                }
                sx={{ my: 1, mr: 1 }}
              />
              <MobileDatePicker
                label="Tanggal Lahir *"
                inputFormat="MM/dd/yyyy"
                value={formik.values.tanggalLahir}
                onChange={(value) => {
                  formik.setFieldValue("tanggalLahir", value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    sx={{ my: 1 }}
                    color="primary"
                  />
                )}
              />
            </Box>
            <TextField
              label="Alamat *"
              name="alamat"
              variant="outlined"
              color="primary"
              fullWidth
              multiline
              maxRows={4}
              value={formik.values.alamat}
              onChange={formik.handleChange}
              error={formik.touched.alamat && Boolean(formik.errors.alamat)}
              helperText={formik.touched.alamat && formik.errors.alamat}
              sx={{ my: 1 }}
            />
            <FormControl
              fullWidth
              sx={{ my: 1 }}
              error={
                formik.touched.jenisKelamin &&
                Boolean(formik.errors.jenisKelamin)
              }
              helperText={
                formik.touched.jenisKelamin && formik.errors.jenisKelamin
              }
            >
              <InputLabel>Jenis Kelamin *</InputLabel>
              <Select
                label="Jenis Kelamin  *"
                name="jenisKelamin"
                value={formik.values.jenisKelamin}
                onChange={formik.handleChange}
                color="primary"
              >
                <MenuItem value={"Laki-laki"}>Laki-laki</MenuItem>
                <MenuItem value={"Perempuan"}>Perempuan</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="No Handphone/Whatsapp  *"
              name="noHp"
              variant="outlined"
              color="primary"
              fullWidth
              multiline
              maxRows={4}
              value={formik.values.noHp}
              onChange={formik.handleChange}
              error={formik.touched.noHp && Boolean(formik.errors.noHp)}
              helperText={formik.touched.noHp && formik.errors.noHp}
              sx={{ my: 1 }}
            />
          </Box>
          <Box sx={{ width: { laptop: "45%", mobile: "100%" } }}>
            <FormControl
              fullWidth
              sx={{ mb: 1 }}
              error={formik.touched.fakultas && Boolean(formik.errors.fakultas)}
              helperText={formik.touched.fakultas && formik.errors.fakultas}
            >
              <InputLabel id="demo-simple-select-helper-label">
                Fakultas *
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                label="Fakultas *"
                name="fakultas"
                value={formik.values.fakultas}
                onChange={formik.handleChange}
                color="primary"
              >
                <MenuItem value={"Laki-laki"}>Fasilkom</MenuItem>
                <MenuItem value={"Perempuan"}>FEB</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              sx={{ my: 1 }}
              error={formik.touched.jurusan && Boolean(formik.errors.jurusan)}
              helperText={formik.touched.jurusan && formik.errors.jurusan}
            >
              <InputLabel id="demo-simple-select-helper-label">
                Jurusan *
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                label="Jurusan *"
                name="jurusan"
                value={formik.values.jurusan}
                onChange={formik.handleChange}
                color="primary"
              >
                <MenuItem value={"Laki-laki"}>Teknik Informatika</MenuItem>
                <MenuItem value={"Perempuan"}>Manajemen</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Domisili"
              name="Domisili"
              variant="outlined"
              color="primary"
              fullWidth
              multiline
              maxRows={4}
              value={formik.values.domisili}
              onChange={formik.handleChange}
              sx={{ my: 1 }}
            />
            <TextField
              label="Asal"
              name="asal"
              variant="outlined"
              color="primary"
              fullWidth
              multiline
              maxRows={4}
              value={formik.values.asal}
              onChange={formik.handleChange}
              sx={{ my: 1 }}
            />
            <Typography variant="body1" sx={{ textAlign: "left", my: 1 }}>
              Upload Foto
            </Typography>
            <Card sx={{ width: 200 }} raised>
              <input
                type="file"
                ref={FileInput}
                style={{ display: "none" }}
                onChange={setFileToUpload}
              />
              <CardActionArea onClick={() => FileInput.current.click()}>
                <CardMedia sx={{ height: 200 }} image={meta.photo} />
              </CardActionArea>
            </Card>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 5, px: 10, mb: 5 }}
          type="submit"
        >
          Daftar
        </Button>
      </Box>
    </Box>
  );
});
