
import { Button, FormControl, FormLabel, Grid, Heading, HStack, Input, Select, Spacer, Text, useToast } from "@chakra-ui/react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom"
import AppBaseLayout from "../../../components/layouts/AppBaseLayout"
import { IProducer } from "../../../interfaces/IProducer";
import ProducersHttpService from "../../../services/services/http/producers-http.service";
import { formProducerValidations } from "../../../validations/formProducerValidations";

const defaultValues = {
    name: "",
    cpf: "",
    farm_name: "",
    state: "SC",
    city: "",
    total_area: 0,
    total_arable_area: 0,
    total_vegetation_area: 0,
    crops: "",
}

const message: any = {
    title: '',
    status: "success",
    duration: 2000,
    isClosable: true,
};

const RegisterProducer: React.FC = () => {
    const navigate = useNavigate();
    const toast = useToast();
    let { id } = useParams();

    const title = id ? "Editar produtor" : "Novo produtor";

    const { data, refetch } = useQuery('prodsducer', async () => await ProducersHttpService.getProducer(id), { enabled: id ? true : false });

    const saveMutation = useMutation(
        async (values: IProducer) => {
            if (id) {
                return await ProducersHttpService.update(+id, values);
            }

            return await ProducersHttpService.store(values);
        },
        {
            onError: (error: any) => {
                message.title = error.message;
                message.status = "error";

                toast(message);
            },
            onSuccess: () => {
                message.title = "Produtor salvo com sucesso";

                toast(message);

                navigate('/producers');
            },
        }
    );

    return (
        <AppBaseLayout>
            <Grid w='100%' p={4}>
                <Heading as="h5" size="lg">{title}</Heading>
                <br />

                <Formik
                    enableReinitialize={true}
                    initialValues={id && data?.data ? data?.data : defaultValues}
                    validationSchema={() => formProducerValidations}
                    onSubmit={async (values: any, { setSubmitting }) => {
                        console.log("enviando", values);
                        await saveMutation.mutateAsync(values);

                        setSubmitting(false);
                    }}
                >
                    {({ values, handleChange, handleSubmit, isSubmitting }) => (
                        <Form onSubmit={handleSubmit}>
                            <FormControl>
                                <FormLabel htmlFor='name'>Nome do produtor</FormLabel>
                                <Input as={Field} type="text" value={values?.name} name="name" placeholder="Nome do produtor" />
                                <ErrorMessage
                                    name="name"
                                    render={(msg: String) => <Text fontSize="xs" color="tomato">{msg}</Text>}
                                />
                            </FormControl>

                            <FormControl mt='2'>
                                <FormLabel htmlFor='cpf'>CPF</FormLabel>
                                <Input as={Field} type="text" value={values?.cpf} name="cpf" placeholder="CPF" />
                                <ErrorMessage
                                    name="cpf"
                                    render={(msg: String) => <Text fontSize="xs" color="tomato">{msg}</Text>}
                                />
                            </FormControl>

                            <FormControl mt='2'>
                                <FormLabel htmlFor='farmName'>Nome da fazenda</FormLabel>
                                <Input as={Field} type="text" value={values?.farm_name} name="farm_name" placeholder="Nome da fazenda" />
                                <ErrorMessage
                                    name="farm_name"
                                    render={(msg: String) => <Text fontSize="xs" color="tomato">{msg}</Text>}
                                />
                            </FormControl>

                            <FormControl mt='2'>
                                <FormLabel htmlFor='state'>Estado</FormLabel>
                                {/* <Input as={Field} type="text" name="state" placeholder="Estado" /> */}
                                <Select name="state" value={values?.state} placeholder='Selecione...'>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="PR">Paraná</option>
                                    <option value="RS">Rio Grande do SUl</option>
                                </Select>
                                <ErrorMessage
                                    name="state"
                                    render={(msg: String) => <Text fontSize="xs" color="tomato">{msg}</Text>}
                                />
                            </FormControl>

                            <FormControl mt='2'>
                                <FormLabel htmlFor='state'>Cidade</FormLabel>
                                <Input as={Field} type="text" value={values?.city} name="city" placeholder="Cidade" />
                                <ErrorMessage
                                    name="city"
                                    render={(msg: String) => <Text fontSize="xs" color="tomato">{msg}</Text>}
                                />
                            </FormControl>

                            <FormControl mt='2'>
                                <FormLabel htmlFor='total_area'>Área total em hectares da fazenda</FormLabel>
                                <Input as={Field} type="number" value={values?.total_area} name="total_area" placeholder="Área total em hectares da fazenda" />
                                <ErrorMessage
                                    name="total_area"
                                    render={(msg: String) => <Text fontSize="xs" color="tomato">{msg}</Text>}
                                />
                            </FormControl>

                            <FormControl mt='2'>
                                <FormLabel htmlFor='total_arable_area'>Área agricultável em hectares</FormLabel>
                                <Input as={Field} type="number" value={+values?.total_arable_area} name="total_arable_area" placeholder="Área agricultável em hectares" />
                                <ErrorMessage
                                    name="total_arable_area"
                                    render={(msg: String) => <Text fontSize="xs" color="tomato">{msg}</Text>}
                                />
                            </FormControl>

                            <FormControl mt='2'>
                                <FormLabel htmlFor='total_vegetation_area'>Área de vegetação em hectares</FormLabel>
                                <Input as={Field} type="number" value={+values?.total_vegetation_area} name="total_vegetation_area" placeholder="Área de vegetação em hectares" />
                                <ErrorMessage
                                    name="total_vegetation_area"
                                    render={(msg: String) => <Text fontSize="xs" color="tomato">{msg}</Text>}
                                />
                            </FormControl>

                            <FormControl mt='2'>
                                <FormLabel htmlFor='crops'>Culturas plantadas</FormLabel>
                                <Input as={Field} type="text" value={values?.crops} name="crops" placeholder="Culturas plantadas" />
                                <ErrorMessage
                                    name="crops"
                                    render={(msg: String) => <Text fontSize="xs" color="tomato">{msg}</Text>}
                                />
                            </FormControl>


                            <HStack>
                                <Spacer />
                                <Button
                                    mt={4}
                                    type='submit'
                                    bg="brain.0"
                                    color="white"
                                    _hover={{ bg: "brain.200" }}
                                    isLoading={isSubmitting}
                                    disabled={isSubmitting}
                                >
                                    Salvar dados
                                </Button>
                            </HStack>
                        </Form>
                    )}
                </Formik>

            </Grid>
        </AppBaseLayout>
    )
}

export default RegisterProducer