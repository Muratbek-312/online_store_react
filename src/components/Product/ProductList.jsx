import { Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../contexts/ProductsContext";
import ProductCard from "./ProductCard";
import Pagination from "@material-ui/lab/Pagination";
import { useHistory } from "react-router-dom";

const ProductList = () => {
  const history = useHistory();
  // console.log(history)
  const { products, getProducts, paginatedPages } = useContext(productsContext);
  const [page, setPage] = useState(getPage());

  useEffect(() => {
    getProducts(history);
  }, []);
  // console.log(products)

  function getPage(e, page) {
    const search = new URLSearchParams(history.location.search);
    return search.get("_page");
  }

  const handlePage = (e, pageVal) => {
    const search = new URLSearchParams(history.location.search);
    search.set("_page", pageVal);
    // console.log(search.toString())
    // console.log(history)
    history.push(`${history.location.pathname}?${search.toString()}`);
    getProducts(history);
    setPage(pageVal);
  };
  //todo new in GRID JUSTIFY AND ALIGN AND STYLE (from 19.05.2021)
  return (
    <>
      <Grid
        container
        spacing={3}
        justify="space-evenly"
        alignItems="space-between"
        style={{ marginTop: "0px" }}
      >
        {products ? (
          products.map((item, index) => (
            <ProductCard item={item} key={index} history={history} />
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </Grid>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Pagination
          count={paginatedPages}
          color="primary"
          onChange={handlePage}
          page={+page}
        />
      </div>
    </>
  );
};

export default ProductList;
