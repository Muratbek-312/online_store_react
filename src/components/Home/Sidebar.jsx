import React, {useContext, useState} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Grid, Paper, makeStyles, Button } from '@material-ui/core';
import { productsContext } from '../../contexts/ProductsContext';
import {useHistory} from 'react-router-dom';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        marginRight: '20px',
        marginBottom: '20px',
        minWidth: '170px',  //TODO0 NEW (from 19.05.2021)
        maxWidth: '350px'  //TODO0 NEW (from 19.05.2021)
    }
}))

export default function Sidebar() {
    const history = useHistory()
    const classes = useStyles()
    const { getProducts } = useContext(productsContext)
    const [type, setType] = useState(getType())
    const [price, setPrice] = useState(getPrice())

    function getPrice() {
        const search = new URLSearchParams(history.location.search)
        return search.get('price_lte')
    }

    function getType() {
        const search = new URLSearchParams(history.location.search)
        return search.get('type')
    }

    const handleChangePrice = (event, value) => {
        const search = new URLSearchParams(history.location.search)
        search.set('price_lte', value)
        history.push(`${history.location.pathname}?${search.toString()}`)
        getProducts(history)
        setPrice(value)
    }

    const handleChangeType = (event) => {
        console.log(event.target.value === 'all')
        if(event.target.value === 'all'){
            history.push(`${history.location.pathname.replace('type')}`)
            getProducts(history)
            setType(event.target.value)
            return  //todo2 ADD return (from 19.05.2021)
        }
        const search = new URLSearchParams(history.location.search)
        search.set('type', event.target.value)
        history.push(`${history.location.pathname}?${search.toString()}`)
        getProducts(history)
        setType(event.target.value)
    }
  //todo3 CHANGED paper elevation from 3 to 2 (from 19.05.2021)
  const handleDrop = () => {
    history.push(`${history.location.pathname.replace('type')}`)
    history.push(`${history.location.pathname.replace('price_lte')}`)
    getProducts(history)
    setType(getType())
    setPrice(getPrice())
  }
  return (
      <Grid item md={3}>
          <Paper elevation={2} className={classes.paper}>  
            <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={type} onChange={handleChangeType}>
                <FormControlLabel value="iphone" control={<Radio />} label="Iphone" />
                <FormControlLabel value="samsung" control={<Radio />} label="Samsung" />
                <FormControlLabel value="all" control={<Radio />} label="All" />
            </RadioGroup>
            </FormControl>

            <Grid>
                <Slider
                    value={price}
                    onChange={handleChangePrice}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    min={100}
                    max={300}
                />
                <Button variant='outlined' color='primary' onClick={handleDrop} >Drop</Button>
            </Grid>
          </Paper>
      </Grid>
  );
}
