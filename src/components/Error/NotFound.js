import React, { useContext } from 'react';
import { Flex, Heading, VStack, Image, Text } from '@chakra-ui/react';
import ErrorImg from '../../assets/img/error.png';
import { useNavigate } from 'react-router-dom';
import AuthConText from '../../context/auth-context';
import { ROLES } from '../../App';

const NotFound = (props) => {
    const { userInfo } = useContext(AuthConText);
    const navigate = useNavigate();

    function onGoBack() {
        if (userInfo?.roles === ROLES.admin) {
            navigate('/admin/accounts');
            return;
        }
        return '/';
    }

    return (
        <Flex minH={450} justifyContent="center" backgroundColor="#fff" alignItems="center" w="100%" direction="column">
            <Image src={ErrorImg} w="350px" padding={30} />
            <VStack>
                <Heading>Error</Heading>
                <Text fontWeight="bold">Sorry!! We could not find the page you were looking for.</Text>
                <h4 style={{ color: 'green', lineHeight: 3.5, padding: '0 1.5rem' }}>
                    Oh! Có vẻ bạn đã nhập không chính xác ở đâu đó, hãy thử lại xem sao!!!
                </h4>
                <button className="button button-sm" onClick={onGoBack} type="button">
                    Back to Home
                </button>
            </VStack>
        </Flex>
    );
};

export default NotFound;
