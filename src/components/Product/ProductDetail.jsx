import { makeStyles, Paper } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productsContext } from "../../contexts/ProductsContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: "40px auto",
    maxWidth: 1000,
    height: "auto",
  },
}));

const ProductDetail = () => {
  const { id } = useParams();
  const { detail, getDetail, addProductInCart, checkProductIncart } =
    useContext(productsContext);
  const classes = useStyles();

  useEffect(() => {
    getDetail(id);
  }, [id]);

  console.log(detail);
  return (
    <Paper elevation={3} className={classes.paper}>
      <Typography>Detail</Typography>
      {detail ? (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <img style={{ width: "400px" }} src={detail.image} alt="" />
          </div>
          <div
            style={{
              width: "450px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Typography gutterBottom>{detail.title}</Typography>
            <Typography gutterBottom>{detail.type}</Typography>
            <Typography gutterBottom>{detail.description}</Typography>
            <Typography gutterBottom>{detail.price}</Typography>

            <IconButton
              aria-label="share"
              onClick={() => addProductInCart(detail)}
              color={checkProductIncart(detail.id) ? "secondary" : "inherit"}
            >
              <ShoppingCartIcon />
            </IconButton>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </Paper>
  );
};

export default ProductDetail;
