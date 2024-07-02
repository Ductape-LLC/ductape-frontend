import { ENV } from "@/types/env.types";
import { Modal, Drawer } from "antd";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import CustomInput from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { addEnvSchema } from '@/schemas/env.schemas';
import { useState } from "react";
import { useWorkspaces } from "@/hooks/useWorkspaces";


interface WorkspaceEnvsModalProps {
  showEnvModal: boolean,
  setShowEnvModal: (value: boolean) => void;
  envs: Array<ENV>,
  setEnvs: (value: Array<ENV>) => void;
}


const WorkspaceEnvsModal: React.FC<WorkspaceEnvsModalProps> = ({
    showEnvModal,
    setShowEnvModal,
    envs,
    setEnvs
}) => {

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedEnv, setSelectedEnv] = useState<ENV>({
    env_name: '',
    slug: '',
    description: '',
  });
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { saveEnvs } = useWorkspaces();

  const selectEnv = (env: any, index: number) => {
    setSelectedEnv(env);
    setSelectedIndex(index);
    setVisible(true);
  };


  const handleAddEnv = (values: ENV, submitProps: any) => {
    submitProps.setSubmitting(false);
    setEnvs([...envs, values]);
    submitProps.resetForm();
  };

  const envFormik = useFormik<ENV>({
    initialValues: {
      env_name: '',
      slug: '',
      description: '',
    },
    validationSchema: addEnvSchema,
    onSubmit: handleAddEnv,
  });

  const handleDeleteEnv = (index: number) => {
    const newEnvs = envs.filter((_, i) => i !== index);
    setEnvs(newEnvs);
  };


  const handleSelectedEnvChange = (e: any) => {
    const { name, value } = e.target;
    setSelectedEnv((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditEnv = () => {
    const newEnvs = envs.map((env, i) => {
      if (i === selectedIndex) {
        return selectedEnv;
      }
      return env;
    });
    setEnvs(newEnvs);
    setSelectedEnv({ env_name: '', slug: '', description: '' });
    setVisible(false);
  };
    return (
        <Modal
        open={showEnvModal}
        width="730px"
        className="rounded-none"
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={() => setShowEnvModal(false)}
        style={{ padding: 0 }}
      >
        <div>
          <h1 className="text-[#232830] text-2xl font-bold border-b px-[30px] py-6">
            Default Environments
          </h1>
          <div className="px-[30px] mt-4 pb-7 border-b">
            <p className="text-[#232830] mt-3 text-sm font-medium">
              Configure which environments are created automatically for the new
              apps
            </p>

            <div className="mt-[31px]">
              {envs.map((env, i) => (
                <div
                  key={i}
                  className="flex gap-5 justify-between items-center mb-6"
                >
                  <div className="border flex-1 px-3 py-1 rounded">
                    <p className="text-[#979797] text-[10px] font-semibold rounded">
                      Environment Name
                    </p>
                    <p className="text-sm font-semibold">{env.env_name}</p>
                  </div>

                  <div className="border flex-1 px-3 py-1 rounded">
                    <p className="text-[#979797] text-[10px] font-semibold rounded">
                      Slug
                    </p>
                    <p className="text-sm font-semibold">{env.slug}</p>
                  </div>

                  <div className="border flex-1 px-3 py-1 rounded">
                    <p className="text-[#979797] text-[10px] font-semibold rounded">
                      Description
                    </p>
                    <p className="text-sm font-semibold">{env.description}</p>
                  </div>

                  <div className="flex">
                    <EditOutlined
                      onClick={() => selectEnv(env, i)}
                      className="mr-2 outline-none"
                    />
                    <DeleteOutlined
                      onClick={() => handleDeleteEnv(i)}
                      className="outline-none"
                    />
                  </div>
                </div>
              ))}

              <div className="flex gap-5 justify-between items-center mb-6">
                <div>
                  <CustomInput
                    placeholder="Environment Name"
                    onBlur={envFormik.handleBlur('env_name')}
                    value={envFormik.values.env_name}
                    onChange={envFormik.handleChange('env_name')}
                  />
                </div>
                <div>
                  <CustomInput
                    placeholder="Slug"
                    onBlur={envFormik.handleBlur('slug')}
                    value={envFormik.values.slug}
                    onChange={envFormik.handleChange('slug')}
                  />
                </div>
                <div>
                  <CustomInput
                    placeholder="Description"
                    onBlur={envFormik.handleBlur('description')}
                    value={envFormik.values.description}
                    onChange={envFormik.handleChange('description')}
                  />
                </div>
                <div className="flex">
                  <EditOutlined className="mr-2 text-transparent" />

                  <DeleteOutlined className="text-transparent" />
                </div>
              </div>

              <Button
                onClick={() => envFormik.handleSubmit()}
                className={`${
                  !envFormik.isValid || !envFormik.dirty || loading
                    ? 'bg-[#D9D9D9]'
                    : 'bg-primary'
                } bg-opacity-90 border text-white font-semibold text-xs outline-none rounded h-[33px] px-6`}
              >
                Add
              </Button>
            </div>
          </div>

          <div className="px-[30px] py-6 flex justify-end gap-5">
            <Button
              onClick={() => saveEnvs(envs)}
              className="bg-[#0846A6] text-white font-semibold text-xs outline-none rounded h-[33px] px-6"
            >
              Save
            </Button>
          </div>

          <Drawer
            destroyOnClose={true}
            title="Edit config variable"
            width={'22%'}
            onClose={() => {
              setVisible(false);
            }}
            visible={visible}
          >
            <div className="h-full flex flex-col items-between">
              <div className="flex-1">
                <div>
                  <label className="font-medium">Environment Name</label>
                  <CustomInput
                    className="mt-2"
                    value={selectedEnv.env_name}
                    name="env_name"
                    onChange={handleSelectedEnvChange}
                  />
                </div>

                <div className="mt-4">
                  <label className="font-medium">Slug</label>
                  <CustomInput
                    className="mt-2"
                    value={selectedEnv.slug}
                    name="slug"
                    onChange={handleSelectedEnvChange}
                  />
                </div>

                <div className="mt-4">
                  <label className="font-medium">Description</label>
                  <CustomInput
                    className="mt-2"
                    value={selectedEnv.description}
                    name="description"
                    onChange={handleSelectedEnvChange}
                  />
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <Button
                  onClick={() => setVisible(false)}
                  className="font-semibold text-xs border  text-[#232830] outline-none h-[33px] rounded px-6 gap-2 flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleEditEnv}
                  className="text-white font-semibold text-xs outline-none rounded h-[33px] px-6 flex-1 bg-[#0846A6]"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </Drawer>
        </div>
      </Modal>
    );
}

export default WorkspaceEnvsModal;