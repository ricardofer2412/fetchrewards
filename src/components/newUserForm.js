import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

class NewUserForm extends React.Component {
  state = {
    occupations: [],
    userState: [],
    fullname: "",
    userEmail: "",
    userPassword: "",
  };

  async componentDidMount() {
    const apiData = await axios.get(
      "https://frontend-take-home.fetchrewards.com/form"
    );
    this.setState({
      occupations: apiData.data.occupations,
      userState: apiData.data.states,
    });
    console.log("info loaded", this.state.occupations);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { fullname, userEmail, userPassword, occupations, userState } =
      this.state;
    return (
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xs"
          style={{ backgroundColor: "white" }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#510359" }}>
              <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create New User
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                InputProps={{ name: "fullname" }}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="fullName"
                value={fullname}
                autoFocus
                onChange={(e) => this.handleChange(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={userEmail}
                InputProps={{ name: "userEmail" }}
                onChange={(e) => this.handleChange(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={userPassword}
                InputProps={{ userPassword }}
                onChange={(e) => this.handleChange(e)}
              />
              <TextField
                fullWidth
                select
                label="Occupation"
                InputProps={{ name: "occupations" }}
                value={occupations}
                SelectProps={{
                  MenuProps: {},
                }}
                onChange={(e) => this.handleChange(e)}
              >
                {this.state.occupations.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                select
                label="Select"
                value=""
                onChange={(e) => this.handleChange(e)}
                helperText="Please select your currency"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: "#ffa900" }}
              >
                Create User
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    );
  }
}

export default NewUserForm;
