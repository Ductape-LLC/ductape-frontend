import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { fetchApp } from '@/api/appsClient';
import {setApp, setBuilder} from '@/redux/slice/appSlice';
import { useWorkspaces } from '../useWorkspaces';
import { IAppBuilderService } from 'ductape-sdk/dist/appBuilder/services/appBuilder.service';
import { IApp } from 'ductape-sdk/dist/types/appBuilder.types';

interface IApps {
  app: IApp;
  builder: IAppBuilderService;
  fetchAndSaveApp: (app_id: string) => void;
}

export const useApps = (): IApps => {
  const dispatch = useDispatch();
  const { defaultWorkspace } = useWorkspaces();
  const [loading, setLoading] = useState(false);
  const { token, public_key, user } = useSelector((state: any) => state.user);
  const { app, builder } = useSelector((state: any) => state.app);

  const fetchAndSaveApp = async (app_id: string) => {
    try {
      const response = await fetchApp({
        user_id: user._id, public_key, token,
        workspace_id: defaultWorkspace.workspace_id,
      }, app_id);
      if (response) {
        console.log(response.fetchApp);
        dispatch(setBuilder(response));
        dispatch(setApp(response.fetchApp()))
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  return {
    app,
    builder,
    fetchAndSaveApp,
  };
};
