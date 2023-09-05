import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import {
  setWorkspaceStats,
  setDefaultWorkspace,
  setWorkspaces,
} from '@/redux/slice/workspaceSlice';
import { fetchApp } from '@/api/appsClient';

interface IApps {
  app: any;
  fetchAndSaveApp: () => void;
}

export const useApps = (): IApps => {
  const [app, setApp] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { token, public_key, user } = useSelector((state: any) => state.user);
  const { app_id } = useSelector((state: any) => state.app);

  const fetchAndSaveApp = async () => {
    try {
      const response = await fetchApp(token, app_id, user._id, public_key);
      if (response.status === 200) {
        setApp(response.data.data);
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
