
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Navbar from './Navbar';
import { setAddress } from '../store/authSlice';
import { TextField, Button, Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme:any) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = yup.object().shape({
  area: yup.string().required('Area is required'),
  // pinCode: yup.string().required('Pin code is required'),
  pinCode: yup
  .string()
  .required('Pin code is required')
  .matches(/^\d+$/, 'Pin code must be a valid integer'),
  locality: yup.string().required('Locality is required'),
  // phoneNo: yup.string().required('Phone number is required'),
  phoneNo: yup
  .string()
  .required('Phone number is required')
  .matches(/^\d{10}$/, 'Phone number must be a 10-digit number'),
  landmark: yup.string().required('Landmark is required'),
});

const Address: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const storedAddress = useSelector(setAddress);
const navigate = useNavigate()
  const { control, handleSubmit, formState: { errors },trigger } = useForm({
    defaultValues: {
      area: '',
      pinCode: '',
      locality: '',
      phoneNo: '',
      landmark: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async(data:any) => {
    const valid = await trigger(); // Trigger validation for all fields
    if (valid) {
      dispatch(setAddress(data));
      navigate('/stripe');
    }
    
  };
// console.log("setAddress",storedAddress)

  const continueHandle = async() =>{
    const valid = await trigger(); // Trigger validation for all fields
    if (valid) {
      console.log('Submitted Data:', storedAddress); // Log the submitted data
      navigate('/stripe');
    }  }
  return (
    <>
      <Navbar />
      <Box display="flex" justifyContent="center">
        <Paper className={classes.paper} elevation={3}>
          <Typography component="h1" variant="h5">
            Add New Address
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="area"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Area name" variant="outlined" fullWidth margin="normal" helperText={errors.area?.message} error={!!errors.area}  />
              )}
            />

<Controller
          name="pinCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="PinCode"
              variant="outlined"
              fullWidth
              margin="normal"
              helperText={errors.pinCode?.message}
              error={!!errors.pinCode}
            />
          )}
        />

           <Controller
          name="locality"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Locality" variant="outlined" fullWidth margin="normal" helperText={errors.locality?.message} error={!!errors.locality} />
            )}
          
        />
        <br/>

        <Controller
          name="phoneNo"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone No"
              variant="outlined"
              fullWidth
              margin="normal"
              helperText={errors.phoneNo?.message}
              error={!!errors.phoneNo}
              inputProps={{ maxLength: 10 }} // Optional: Limit input to 10 characters
            />
            )}
            />
        <br/>

           <Controller
          name="landmark"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Landmark" variant="outlined" fullWidth margin="normal" helperText={errors.landmark?.message} error={!!errors.landmark} />
            )}
          
        />
        <br/>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submitButton} >
            {/* <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submitButton} onClick={continueHandle}> */}
               continue to Buy
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Address;

