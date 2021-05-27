import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { productsContext } from "../../contexts/ProductsContext";
import { authContext } from "../../contexts/AuthContext";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 345,
    marginBottom: "30px", //todo add this  (from 19.05.2021)
  },
  media: {
    backgroundSize: "contain",
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export default function ProductCard({ item, history }) {
  const classes = useStyles();

  const { addProductInCart, checkProductIncart, deleteProduct } =
    useContext(productsContext);
  const { currentUser, currUser } = useContext(authContext);

  useEffect(() => {
    currUser();
  }, []);

  let icons = null;
  if (currentUser === "admin@gmail.com") {
    icons = (
      <>
        <CardActions disableSpacing>
          <Link
            to={`/edit/${item.id}/`}
            style={{ color: "black", textDecoration: "none" }}
          >
            <IconButton aria-label="add to favorites">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton
            aria-label="share"
            onClick={() => deleteProduct(item.id, history)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </>
    );
  } else if (currentUser) {
    icons = (
      <>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton
            aria-label="share"
            onClick={() => addProductInCart(item)}
            color={checkProductIncart(item.id) ? "secondary" : "inherit"}
          >
            <ShoppingCartIcon />
          </IconButton>
        </CardActions>
      </>
    );
  } else {
    icons = null;
  }

  return (
    <Card className={classes.root}>
      <Link to={`/detail/${item.id}`} style={{textDecoration: 'none'}} >
        <CardHeader title={item.title} subheader={item.type} />
        <CardMedia
          className={classes.media}
          image={item.image}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.description}
          </Typography>
        </CardContent>
      </Link>
      <CardContent>
        <Typography style={{ color: "pink" }} variant="h5" color="pink">
          {item.price}
        </Typography>
      </CardContent>
      {icons}
    </Card>
  );
}
