import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Typography } from '@material-ui/core';
import { productsContext } from '../../contexts/ProductsContext'
import { calcTotalPrice } from '../../helpers/calcPrice';

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  paper: {
    maxWidth: 1000,
    margin: '40px auto'
  }
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function Cart() {
  const classes = useStyles();

  const { cart, getCart, changeProductCount } = useContext(productsContext)

  useEffect(() => {
    getCart()
    console.log(cart)
    }, [])

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="right">SubPrice</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {cart.products ? (
                <>
                    {cart.products.map((elem) => (
                    <TableRow key={elem.item.id}>
                        <TableCell><img style={{width: "50px"}} src={elem.item.image} alt={elem.item.title}/></TableCell>
                        <TableCell align="right">{elem.item.title}</TableCell>
                        <TableCell align="right">{elem.item.price}</TableCell>
                        <TableCell align="right">
                        <input 
                            type="number" 
                            value={elem.count} 
                            onChange={(e) => changeProductCount(e.target.value, elem.item.id)}
                        />
                        </TableCell>
                        <TableCell align="right">{elem.subPrice}</TableCell>
                    </TableRow>
                    ))}
                </>
            ) : (<h1>Loading...</h1> )}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}><Typography variant="h5">Total:</Typography></TableCell>
            {
                cart.products  ? (
                    <TableCell align="right"><Typography variant="h5">{calcTotalPrice(cart.products)}</Typography></TableCell>
                ) : (null)
            }
          </TableRow>
          <TableRow >
          <TableCell colSpan={3} align="right">
              <Button variant="contained" color="primary">BUY</Button>
          </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
