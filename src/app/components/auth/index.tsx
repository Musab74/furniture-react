import React, { useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Box,
  Divider,
  Fab,
  useTheme,
  Button,
} from "@mui/material";
import {
  Person,
  Lock,
  PhoneAndroid,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
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
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const classes = useStyles();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const { setAuthMember } = useGlobals();

  const handleUsername = (e: T) => setMemberNick(e.target.value);
  const handlePhone = (e: T) => setMemberPhone(e.target.value);
  const handlePassword = (e: T) => setMemberPassword(e.target.value);

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter") handleLoginRequest();
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

  const handleLoginRequest = async () => {
    try {
      if (!memberNick || !memberPassword)
        throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick,
        memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);
      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      console.log("error", err);
      handleLoginClose();
      sweetErrorHandling(Messages.error1).then();
    }
  };

  return (
    <div>
      {/* Sign Up Modal */}
      <Modal
        open={signupOpen}
        onClose={handleSignupClose}
        className={classes.modal}
        closeAfterTransition
      >
        <Fade in={signupOpen}>
          <Box className={classes.paper} display="flex" width="800px">
            <ModalImg 
          
            src="/img/auth.jpeg" alt="signup" />
            <Stack spacing={2} sx={{paddingLeft:1, width: "100%", maxWidth: 340 }}>
              <Typography
                variant="h5"
                fontWeight={700}
                color="primary"
                textAlign="center"
              >
                Create Account
              </Typography>
              <Divider />
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                onChange={handleUsername}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
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
                      <PhoneAndroid color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                onChange={handlePassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSignUpRequest}
                startIcon={<PersonAddIcon />}
                sx={{
                  mt: 2,
                  fontWeight: "bold",
                  py: 1,
                  textTransform: "none",
                  '&:hover': { bgcolor: "primary.dark", transform: "scale(1.03)" }
                }}
              >
                Sign Up
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>

      {/* Login Modal */}
      <Modal
        open={loginOpen}
        onClose={handleLoginClose}
        className={classes.modal}
        closeAfterTransition
      >
        <Fade in={loginOpen}>
          <Box className={classes.paper} display="flex" width="700px">
            <ModalImg 
        
            src="/img/auth.jpeg" alt="login" />
            <Stack
              spacing={2}
              sx={{
                marginLeft: "40px",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Typography
                variant="h5"
                fontWeight={700}
                color="primary"
                textAlign="center"
              >
                Login
              </Typography>
              <Divider />
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                onChange={handleUsername}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                fullWidth
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleLoginRequest}
                endIcon={<LoginIcon />}
                sx={{
                  mt: 2,
                  fontWeight: "bold",
                  py: 1,
                  width: "100%",
                  textTransform: "none",
                  '&:hover': { bgcolor: "primary.dark", transform: "scale(1.03)" }
                }}
              >
                Login
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
