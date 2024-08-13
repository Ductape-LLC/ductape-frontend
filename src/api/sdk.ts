import Ductape from "ductape-sdk";
import { IBuilderInit } from "ductape-sdk/dist/types/index.types";

export const connectDuctape = ({
  workspace_id,
  public_key,
  token,
  user_id,
}: IBuilderInit) => {
  const ductape = new Ductape({ workspace_id, user_id });
  ductape.setPublicKey(public_key);
  ductape.setToken(token);
  return ductape;
};
