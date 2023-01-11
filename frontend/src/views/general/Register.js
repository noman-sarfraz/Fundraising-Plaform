import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (role === "fundraiser") {
      setRole("");
      setIsError(false);
      navigate("/fr_account/");
    } else if (role === "donor") {
      setRole("");
      setIsError(false);
      navigate("/don_account/");
    } else {
      setRole("");
      setIsError(false);
      navigate("/don_account/");
      // setIsError(true);
    }
  };


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "#eee",
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          display: "flex",

          width: {
            xs: "80%",
            sm: "60%",
            md: "45%",
            lg: "30%",
          },
          my: 1,
          flexDirection: "column",
          justifyContent: "center",
          border: "0.5px solid #ccc",
          borderRadius: 5,
          p: {
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 300,
            textAlign: "center",
            fontSize: "24px",
            textDecoration: "underline",
            textUnderlineOffset: "5px",
            mb: 5,
          }}
        >
          FUND<b>RAISING</b>
        </Typography>
        <Typography
          sx={{ fontWeight: 400, textAlign: "center", mb: 2, fontSize: "20px" }}
        >
          Register Now
        </Typography>
        <TextField
          label="Name"
          sx={{
            my: 0.5,
          }}
          type="text"
          required
        />
        <TextField
          label="Email"
          sx={{
            my: 0.5,
          }}
          type="email"
          required
        />

        <TextField
          label="Password"
          sx={{
            my: 0.5,
          }}
          type="password"
          required
        />
        <TextField
          label="Confirm Password"
          sx={{
            my: 0.5,
          }}
          type="password"
          required
        />

        <FormControl
          fullWidth
          error={isError}
          sx={{
            my: 0.5,
          }}
        >
          <InputLabel id="select-role">Role</InputLabel>
          <Select
            labelId="select-role"
            id="simple-role-select"
            value={role}
            label="Role"
            onChange={handleChange}
          >
            <MenuItem value={"fundraiser"}>Fundraiser</MenuItem>
            <MenuItem value={"donor"}>Donor</MenuItem>
          </Select>
          {isError && <FormHelperText>This is required!</FormHelperText>}
        </FormControl>

        <Button
          sx={{
            color: "black",
            my: 1,
            border: "0.5px solid #ccc",
          }}
          onClick={onSubmit}
        >
          Register
        </Button>
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            my: 2,
          }}
        >
          Already have an account? <Link to="/login">login now</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Signup;
