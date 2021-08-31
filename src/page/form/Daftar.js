import { observer, useLocalObservable } from "mobx-react-lite";
import { useRef, useEffect } from "react";
import { action, runInAction, toJS } from "mobx";
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
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { MobileDatePicker } from "@material-ui/lab";
import { toBase64, Base64Image, base64Image } from "utils/formatFile";
import UploadIcon from "@material-ui/icons/Upload";
import Top from "component/Top";
import { Post, Get } from "utils/api";
import { formatDate } from "utils/format";
import { loading } from "component/Loading";
import { alert } from "component/Alert";

export default observer(() => {
  const meta = useLocalObservable(() => ({
    photo: "",
    openDialog: false,
    listjurusan: [],
    data: "",
  }));

  useEffect(() => {
    const getjurusan = async () => {
      const data = await Get("/jurusan");
      runInAction(() => {
        meta.listjurusan = data;
      });
    };

    getjurusan();
  }, []);

  const validationSchema = yup.object({
    email: yup.string().email().required("Mohon diisi"),
    nama: yup.string().required("Mohon diisi"),
    npm: yup.number().required("Mohon diisi"),
    tempatlahir: yup.string().required("Mohon diisi"),
    tanggallahir: yup.string().required("Mohon diisi"),
    alamat: yup.string().required("Mohon diisi"),
    nohp: yup.string().required("Mohon diisi"),
    jurusan_id: yup.number().required("Mohon diisi"),
  });

  const createMember = async (data) => {
    loading.show("Memproses data...");

    Post("/register_member", data)
      .then((res) => {
        loading.close();
        alert.show(
          "Pendaftaran Berhasil",
          "Form kamu sedang dalam proses validasi. Harap bersabar ya!"
        );
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      nama: "",
      npm: "",
      tempatlahir: "",
      tanggallahir: new Date(),
      alamat: "",
      nohp: "",
      jurusan_id: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = {
        ...values,
        tanggallahir: formatDate(values.tanggallahir),
        password: values.npm,
        foto: meta.photo.base64,
        otw_nama: "",
        otw_nohp: "",
        status_alumni: 0,
        status_pelatih: 0,
      };
      createMember(data);
    },
  });

  const FileInput = useRef(null);
  const setFileToUpload = action((e) => {
    const file = e.target.files[0];
    if (file) {
      const type = file.type != "" ? file.type : null;
      const fmtFile = type.split("/");
      if (["png", "jpg", "jpeg"].includes(fmtFile[1])) {
        toBase64(file).then(
          action((result) => {
            let respon = result.split(",");
            meta.photo = {
              file: respon && respon[1] ? base64Image(type, respon[1]) : "",
              base64: respon[1],
            };
          })
        );
      } else {
        alert("Format file tidak didukung");
      }
    }
  });

  return (
    <>
      <Box
        sx={{
          bgcolor: "bg.main",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "auto",
          py: 2,
        }}
      >
        <Helmet>
          <meta charSet="utf-8" />
          <title>Daftar</title>
          <meta name="description" content="Daftar Anggota Baru" />
        </Helmet>
        <Top removeDaftar />
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
                name="email"
                variant="outlined"
                color="primary"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ my: 1 }}
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
                  name="tempatlahir"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  value={formik.values.tempatlahir}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.tempatLahir &&
                    Boolean(formik.errors.tempatlahir)
                  }
                  helperText={
                    formik.touched.tempatlahir && formik.errors.tempatlahir
                  }
                  sx={{ my: 1, mr: 1 }}
                />
                <MobileDatePicker
                  label="Tanggal Lahir *"
                  inputFormat="MM/dd/yyyy"
                  value={formik.values.tanggalLahir}
                  onChange={(value) => {
                    formik.setFieldValue("tanggallahir", value);
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
            </Box>
            <Box sx={{ width: { laptop: "45%", mobile: "100%" } }}>
              <TextField
                label="No Handphone/Whatsapp  *"
                name="nohp"
                variant="outlined"
                color="primary"
                fullWidth
                multiline
                maxRows={4}
                value={formik.values.nohp}
                onChange={formik.handleChange}
                error={formik.touched.nohp && Boolean(formik.errors.nohp)}
                helperText={formik.touched.nohp && formik.errors.nohp}
                sx={{ my: 1 }}
              />
              <FormControl
                fullWidth
                sx={{ my: 1 }}
                error={
                  formik.touched.jurusan_id && Boolean(formik.errors.jurusan_id)
                }
              >
                <InputLabel id="demo-simple-select-helper-label">
                  Jurusan *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  label="Jurusan *"
                  name="jurusan_id"
                  value={formik.values.jurusan_id}
                  onChange={formik.handleChange}
                  color="primary"
                >
                  {meta.listjurusan.map((item, index) => (
                    <MenuItem key={index} value={item.jurusan_id}>
                      {item.jurusan_nama}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {formik.touched.jurusan_id && formik.errors.jurusan_id}
                </FormHelperText>
              </FormControl>
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
                  {!meta.photo ? (
                    <Box
                      sx={{
                        height: 200,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <UploadIcon fontSize="large" />
                      <Typography variant="caption">
                        Upload Image (".png, .jpg")
                      </Typography>
                    </Box>
                  ) : (
                    <CardMedia sx={{ height: 200 }} image={meta.photo.file} />
                  )}
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
      {/* <AcceptDialog
        open={meta.openDialog}
        data={meta.data}
        handleClose={action(() => (meta.openDialog = false))}
      /> */}
    </>
  );
});

const AcceptDialog = observer(({ open, handleClose, data }) => {
  console.log("data", toJS(data));
  console.log("foto", toJS(data.foto));
  const createMember = async () => {
    Post("/register_member", data)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      sx={{ px: { laptop: 50 } }}
    >
      <DialogTitle>Syarat dan Ketentuan</DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText tabIndex={1}>
          {[...new Array(50)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join("\n")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={createMember}>Terima dan Lanjutkan</Button>
      </DialogActions>
    </Dialog>
  );
});
