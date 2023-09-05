import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { fetchApp } from '@/api/appsClient';
import {setApp} from '@/redux/slice/appSlice';

interface IApps {
  app: any;
  fetchAndSaveApp: () => void;
}

export const useApps = (): IApps => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token, public_key, user } = useSelector((state: any) => state.user);
  const { app } = useSelector((state: any) => state.app);

  const fetchAndSaveApp = async () => {
    try {
      const response = await fetchApp(token, app._id, user._id, public_key);
      if (response.status === 200) {
        dispatch(setApp(response.data.data));
      }
    } catch (error: any) {
      console.log(error.response);
      toast.error(error.response.data.errors);
    }
  };

  return {
    app,
    fetchAndSaveApp,
  };
};
