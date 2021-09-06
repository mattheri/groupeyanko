import { FC } from "react";
import InputController from "components/Input/organism/InputController";

interface Props {
  formik: any;
  id: string;
  label: string;
}

const ProvinceSelect: FC<Props> = ({ formik, id, label }) => {
  return (
    <>
      <InputController label='Province' formik={formik} id={id} as="select">
        <option value="Québec">Québec</option>
        <option value="Alberta">Alberta</option>
        <option value="Colombie-Britannique">Colombie Britannique</option>
        <option value="Nouveau-Brunswick">Nouveau Brunswick</option>
        <option value="Labardor">Labardor</option>
        <option value="Territoires du Nord-Ouest">
          Territoires du Nord-Ouest
        </option>
        <option value="Nouvelle Écosse">Nouvelle Écosse</option>
        <option value="Nunavut">Nunavut</option>
        <option value="Saskatchewan">Saskatchewan</option>
        <option value="Yukon">Yukon</option>
        <option value="Île du Prince-Édouard">Île du Prince-Édouard</option>
      </InputController>
    </>
  );
};

export default ProvinceSelect;
