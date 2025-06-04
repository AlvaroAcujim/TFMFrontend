import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { loginUser } from "../features/auth/authSlice.js";
import "./Login.css";
import TitleGrowEffect from "../components/TitleGrowEffect.jsx";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import schema from "../components/Form/yupLogin.js";
import { yupResolver } from "@hookform/resolvers/yup";
import RegisterDialog from "../components/RegisterDialog.jsx";

const Login = () => {
  const [rememberEmail, setRememberEmail] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setValue("identifier", savedEmail);
      setRememberEmail(true);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    if (rememberEmail) {
      localStorage.setItem("rememberEmail", data.identifier);
    } else {
      localStorage.removeItem("rememberEmail");
    }
    try {
      const result = await dispatch(loginUser(data));
      if (result.meta.requestStatus === "fulfilled") {
        setTimeout(() => navigate("/"), 1000);
      } else {
        setError("root", {
          type: "manual",
          message:
            result.payload?.message || "Usuario o contraseña incorrectos",
        });
      }
    } catch (err) {
      console.error(err);
      setError("root", {
        type: "manual",
        message: "Error inesperado. Intenta más tarde.",
      });
    }
  };

  return (
    <section className="container__main">
      <div className="container__main__form">
        <article className="container__main__form__block__intro">
          <TitleGrowEffect
            title={"¿Listo para dar el primer paso?"}
            height={"40vh"}
            marginBotMD={"20px"}
            marginBotxs={"20px"}
            marginBotSM={"20px"}
            marginBotLG={"20px"}
            marginBotXL={"20px"}
            fontSize={"3rem"}
          />
          <div className="container__main__form__block__intro__description">
            <h4>Únete a nosotros</h4>
            <h4>
              Podrás guardar todas las tablas de ejercicios que quieras crear
            </h4>
            <h4>para utilizarlas y mantenerlas guardadas ¡sin ningún coste!</h4>
          </div>
        </article>
        <article>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="container__main__form__block__data"
          >
            <h2>Login de usuario</h2>
            <TextField
              label="Email"
              variant="standard"
              {...register("identifier")}
              error={!!errors.identifier}
              helperText={errors.identifier?.message}
              sx={{
                "& label": { color: "#ffffff" },
                "& label.Mui-focused": { color: "#ffffff" },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#d2a119",
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "#ffffff",
                },
              }}
            />
            <TextField
              label="Contraseña"
              variant="standard"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                "& label": { color: "#ffffff" },
                "& label.Mui-focused": { color: "#ffffff" },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#d2a119",
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "#ffffff",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberEmail}
                  onChange={() => setRememberEmail(!rememberEmail)}
                  sx={{
                    color: "#d2a119",
                    "&.Mui-checked": { color: "#d2a119" },
                  }}
                />
              }
              label="Recordar email"
            />
            {errors.root && <Chip label={errors.root.message} color="error" />}
            <h4 onClick={() => setOpen(true)}>
              ¿Aún no tienes cuenta? Pulsa aquí para registrarte
            </h4>
            <RegisterDialog
              open={open}
              handleClickOpen={() => setOpen(true)}
              handleClose={() => setOpen(false)}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "#d2a119", color: "black" }}
              type="submit"
              endIcon={<SendIcon />}
            >
              Login
            </Button>
          </form>
        </article>
      </div>
    </section>
  );
};

export default Login;
