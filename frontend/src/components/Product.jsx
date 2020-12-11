import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
const { Badge } = require("react-bootstrap");

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: 20,
    marginBottom: 20,
  },
  media: {
    height: 140,
  },
});

const SingleProduct = ({ data }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={data.imageUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div className="d-flex justify-content-between">
          <Button size="small" color="primary">
            Learn More
          </Button>
          <div>
            {" "}
            <Badge variant="warning">{"$ " + data.price}</Badge>
          </div>
        </div>
      </CardActions>
    </Card>
  );
};

export default SingleProduct;
