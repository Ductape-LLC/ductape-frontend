import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import {
  setWorkspaceStats,
  setDefaultWorkspace,
  setWorkspaces,
} from '@/redux/slice/workspaceSlice';
import {
  fetchWorkspaceStats,
  changeDefaultWorkspace,
  createWorkspace,
  fetchWorkspaces,
  updateWorkspaceEnvs,
} from '@/api/workspaceClient';

interface IWorkspaces {
  workspaces: any;
  defaultWorkspace: any;
  saveEnvs: (envs: ENV[]) => void;
  fetchAndSaveWorkSacpes: () => void;
}

interface ENV {
  env_name: string;
  slug: string;
  description: string;
  _id?: string;
}

export const useWorkspaces = (): IWorkspaces => {
  const dispatch = useDispatch();
  const { defaultWorkspace, workspaces } = useSelector(
    (state: any) => state.workspace
  );
  const { token, public_key, user } = useSelector((state: any) => state.user);
  const [loading, setLoading] = React.useState(false);

  const fetchAndSaveWorkSacpes = async () => {
    try {
      const response = await fetchWorkspaces(token, user._id, public_key);
      if (response.status === 201) {
        console.log(response.data.data);
        const workspacesData = response.data.data;
        const workspace = workspacesData.find(
          (workspace: any) => workspace.default === true
        );
        dispatch(setWorkspaces(workspacesData));
        dispatch(setDefaultWorkspace(workspace));
      }
    } catch (error: any) {
      console.log(error.response);
      toast.error(error.response.data.errors);
    }
  };

  const saveEnvs = async (envs: ENV[]) => {
    try {
      setLoading(true);
      toast.loading('Loading...');
      const response = await updateWorkspaceEnvs(token, defaultWorkspace._id, {
        envs,
        user_id: user._id,
        public_key,
      });

      if (response.status === 201) {
        toast.success('Environments Saved successfully');
        await fetchAndSaveWorkSacpes();
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error.response.data.errors);
    }
  };

  const ChangeDefaultWorkspace = async (workspaceId: string) => {
    console.log(workspaceId);
    try {
      setLoading(true);
      const response = await changeDefaultWorkspace(
        token,
        user._id,
        workspaceId,
        public_key
      );
      if (response.status === 200) {
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.errors);
    }
  };

  const getWorkSpaceStats = async (workspaceId: string) => {
    try {
      const response = await fetchWorkspaceStats(
        token,
        workspaceId,
        public_key
      );

      if (response.status === 200) {
        const { apps, integrations, inbound_requests, outbound_requests } =
          response.data.data;
        dispatch(
          setWorkspaceStats({
            apps,
            integrations,
            inbound_requests,
            outbound_requests,
          })
        );
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.errors);
    }
  };

  const handleChangeDefaultWorkspace = async (workspace: any) => {
    await getWorkSpaceStats(workspace.workspace_id);
    await ChangeDefaultWorkspace(workspace.workspace_id);
    await dispatch(setDefaultWorkspace(workspace));
  };

  

  return {
    workspaces,
    defaultWorkspace,
    saveEnvs,
    fetchAndSaveWorkSacpes,
  };
};
