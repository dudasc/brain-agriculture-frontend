import { Flex } from '@chakra-ui/react';
import React, { } from 'react';
import Navbar from '../../navigation/NavBar';

interface Props {
    children: any;
}

const AppBaseLayout: React.FC<Props> = ({ children }) => (
    <>
        <Navbar />
        {/* <Flex
            direction="column"
           
            maxW={{ xl: "1200px" }}
            m="0 auto"
        > */}
            {children}
        {/* </Flex> */}

    </>
);

export default AppBaseLayout;