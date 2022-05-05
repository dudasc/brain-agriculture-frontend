import * as Yup from "yup";

export const formProducerValidations = Yup.object().shape({
  name: Yup.string()
    .required('Campo obrigatório'),
  cpf: Yup.string()
    .required('Campo obrigatório'),
  farm_name: Yup.string()
    .required('Campo obrigatório'),
  state: Yup.string()
    .required('Campo obrigatório'),
  city: Yup.string()
    .required('Campo obrigatório'),
  total_area: Yup.string()
    .required('Campo obrigatório'),
  total_arable_area: Yup.string()
    .required('Campo obrigatório'),
  total_vegetation_area: Yup.string()
    .required('Campo obrigatório'),
  crops: Yup.string()
    .required('Campo obrigatório'),
}); 
