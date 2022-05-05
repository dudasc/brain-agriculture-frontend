import { Divider, Grid, GridItem, Heading, Spinner, Stack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useQueries } from "react-query";
import ArableAreaByVegetationChart from "../../components/charts/arable-area-by-vegetation";
import FarmsByCropsChart from "../../components/charts/farms-by-crops";
import FarmsByStateChart from "../../components/charts/farms-by-state";
import AppBaseLayout from "../../components/layouts/AppBaseLayout";
import ReportsHttpService from "../../services/services/http/reports-http.service";

const Dashboard: React.FC = () => {
    const { colorMode } = useColorMode();
    const results: any = useQueries([
        { queryKey: ['', 0], queryFn: async () => await ReportsHttpService.getTotalFarms() },
        { queryKey: ['', 1], queryFn: async () => await ReportsHttpService.getTotalHectares() },
        { queryKey: ['', 2], queryFn: async () => await ReportsHttpService.getTotalArableArea() },
        { queryKey: ['totalFailureSAP', 3], queryFn: async () => await ReportsHttpService.getTotalFarms() },
        { queryKey: ['totalFinishedSAP', 4], queryFn: async () => await ReportsHttpService.getTotalFarms() },
    ])

    console.log(results);

    const dashboardItems = [
        { title: 'Total de fazendas', indexArrayResult: 0 },
        { title: 'Área total (hectares)', indexArrayResult: 1 },
        { title: 'Área áravel total (hectares)', indexArrayResult: 2},
    ];

    return (
        <AppBaseLayout>
            {/* <Grid w='100%' p={4}>
                <Heading as="h5" size="lg">Dashboard</Heading>
            </Grid> */}
            <Grid templateColumns='repeat(6, 12fr)' gap="4" m="4">
                {dashboardItems.map((item: any) => (
                    <>
                        <Stack direction={'column'}>
                            <GridItem w='100%'>
                                <Stack
                                    p="4"
                                    boxShadow="lg"
                                    borderWidth={1}
                                    borderRadius="sm"
                                    borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
                                    background={'green.700'}
                                    color="white"
                                // onClick={() => setComponentName(item.componentName)}
                                >
                                    <Stack direction="row" alignItems="center">
                                        <Text fontWeight="semibold">{item.title}</Text>
                                        {/* <FaInfoCircle /> */}
                                    </Stack>

                                    <Text fontSize={'45px'}>
                                        {
                                            results[item.indexArrayResult].isFetching || results[item.indexArrayResult].isFetching
                                                ? <Spinner size="lg" /> : results[item.indexArrayResult]?.data?.data.total}</Text>
                                </Stack>


                            </GridItem>

                        </Stack>
                    </>
                ))}
            </Grid >
            <Divider />
            <Grid templateColumns='repeat(5, 8fr)' gap="4" m="4">
                <Grid flexDirection={'column'}>
                    <GridItem w='100%'>
                        <FarmsByStateChart />
                    </GridItem>
                </Grid>
                <Grid>
                    <GridItem w='100%'>
                        <FarmsByCropsChart />
                    </GridItem>
                </Grid>

                <Grid>
                    <GridItem w='100%'>
                        <ArableAreaByVegetationChart />
                    </GridItem>
                </Grid>
            </Grid>
        </AppBaseLayout>
    )
}

export default Dashboard