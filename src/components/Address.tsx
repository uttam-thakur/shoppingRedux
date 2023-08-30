import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Navbar from './Navbar';
import { setAddress } from '../store/authSlice';
import { useNavigate } from 'react-router';

const validationSchema = yup.object().shape({
  area: yup.string().required('Area is required'),
  pinCode: yup
    .string()
    .required('Pin code is required')
    .matches(/^\d+$/, 'Pin code must be a valid integer'),
  locality: yup.string().required('Locality is required'),
  phoneNo: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be a 10-digit number'),
  landmark: yup.string().required('Landmark is required'),
});

const Address: React.FC = () => {
  const dispatch = useDispatch();
  const storedAddress = useSelector(setAddress);
  const navigate = useNavigate()
  const { control, handleSubmit, formState: { errors }, trigger } = useForm({
    defaultValues: {
      area: '',
      pinCode: '',
      locality: '',
      phoneNo: '',
      landmark: '',
    },
    resolver: yupResolver(validationSchema),
  });


  const continueHandle = async (data: any) => {
    const valid = await trigger();
    if (valid) {
      dispatch(setAddress(data));
      console.log('Submitted Data:', storedAddress);
      navigate('/stripe');
    }
  }
  return (
    <>
      <Navbar />
      Add New Address
      <form onSubmit={handleSubmit(continueHandle)}>
        <Controller
          name="area"
          control={control}
          render={({ field }) => (
            <input {...field} placeholder="Area name" />
          )}
        />

        <Controller
          name="pinCode"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              placeholder="PinCode"

            />
          )}
        />

        <Controller
          name="locality"
          control={control}
          render={({ field }) => (
            <input {...field} placeholder="Locality" />
          )}

        />
        <br />

        <Controller
          name="phoneNo"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              placeholder="Phone No"

            />
          )}
        />
        <br />

        <Controller
          name="landmark"
          control={control}
          render={({ field }) => (
            <input {...field} placeholder="Landmark"
            />
          )}

        />
        <br />
        <button type="submit" color="primary" >
          continue to Buy
        </button>
      </form>
    </>
  );
};

export default Address;

