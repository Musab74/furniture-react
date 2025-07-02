import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  Fab,
  Stack,
  TextField,
  InputAdornment,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import MemberService from "../../services/memberService";
import { useGlobals } from "../../hooks/useGlobals";
import { T } from "../../../lib/types/common";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import { Messages } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { memberStatus, memberType } from "../../../lib/enums/member.enum";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: theme.shadows[6],
    padding: theme.spacing(4),
  },
}));

const ModalImg = styled.img`
  width: 50%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  margin-right: 32px;
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose } = props;
  const classes = useStyles();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();

  const handleUsername = (e: T) => setMemberNick(e.target.value);
  const handlePhone = (e: T) => setMemberPhone(e.target.value);
  const handlePassword = (e: T) => setMemberPassword(e.target.value);

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter") handleSignUpRequest();
  };

  const handleSignUpRequest = async () => {
    try {
      if (!memberNick || !memberPhone || !memberPassword)
        throw new Error(Messages.error3);

      const signUpInput: MemberInput = {
        memberNick,
        memberPhone,
        memberPassword,
        memberType: memberType.USER,
        memberStatus: memberStatus.ACTIVE,
        memberPoints: 0,
      };

      const member = new MemberService();
      const result = await member.signup(signUpInput);

      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      handleSignupClose();
      sweetErrorHandling(err);
    }
  };

  return (
    <Modal
      open={signupOpen}
      onClose={handleSignupClose}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={signupOpen}>
        <Box className={classes.paper} display="flex" width="800px">
          <ModalImg src="/img/auth.jpeg" alt="signup visual" />
          <Stack spacing={2} sx={{ width: "100%", maxWidth: 340 }}>
            <Typography variant="h5" fontWeight={600} textAlign="center" mb={1}>
              Create Account
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              onChange={handleUsername}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              onChange={handlePhone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneAndroidIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              onChange={handlePassword}
              onKeyDown={handlePasswordKeyDown}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <Fab
              variant="extended"
              color="primary"
              sx={{ mt: 2, width: "100%" }}
              onClick={handleSignUpRequest}
            >
              <LoginIcon sx={{ mr: 1 }} />
              Sign Up
            </Fab>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
