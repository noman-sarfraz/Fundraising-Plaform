import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CompaignPic1 from "../../assets/images/Fundraise1.jpg";
import CompaignPic2 from "../../assets/images/Fundraise2.jpg";
import CompaignPic3 from "../../assets/images/Fundraise3.jpg";

function StyledCard({ heading, description, image }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title="green iguana"
        loading="lazy"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {heading}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View</Button>
        <Button size="small" sx={{ color: "teal" }}>
          Share
        </Button>
        <Button size="small" sx={{ color: "#FF0000" }}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

function Compaigns() {
  return (
    <Box>
      <Box>
        <Typography
          color={"#1D548F"}
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            px: 2,
            py: 2,
            textDecoration: "underline",
            textUnderlineOffset: "5px",
          }}
        >
          Your Compaigns
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          justifyContent: "space-evenly",
        }}
      >
        <StyledCard
          heading="Flood Relief"
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam autem libero dolores. Distinctio cupiditate animi doloribus fugiat unde officiis laboriosam eum soluta voluptates voluptate aut veniam alias architecto, eos quas."
          image={CompaignPic1}
        />
        <StyledCard
          heading="Poverty Alleviation"
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam autem libero dolores. Distinctio cupiditate animi doloribus fugiat unde officiis laboriosam eum soluta voluptates voluptate aut veniam alias architecto, eos quas."
          image={CompaignPic2}
        />
        <StyledCard
          heading="Animal Welfare"
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam autem libero dolores. Distinctio cupiditate animi doloribus fugiat unde officiis laboriosam eum soluta voluptates voluptate aut veniam alias architecto, eos quas."
          image={CompaignPic3}
        />
      </Box>
    </Box>
  );
}

export default Compaigns;
