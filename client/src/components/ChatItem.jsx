import { Box, Flex, Text, Avatar,} from '@chakra-ui/react';

import { GoHubot } from "react-icons/go";
import { faker } from '@faker-js/faker';


const user = faker.image.avatarLegacy();


const ChatItem = ({role, msg}) => {


    if(role === 'User'){
        return (
            <Flex alignItems="flex-center" mb={4}>
            <Avatar h='35px' w='35px' name="User" src={user} mr={2} />
            <Text mr={2} color={`black`} fontSize="md" p={2} borderRadius="lg" w='100%' >
                {msg}
            </Text>
        </Flex>
        )
    }


    return (
        <Flex alignItems="flex-center" mb={4}>
        <Box as={GoHubot} h='35px' w='35px' name="Bot" ml={2} />
        <Text mr={2} color={`green.500`} fontSize="md" p={2} borderRadius="lg" w='100%' >
            {msg}
        </Text>
    </Flex>
    )
}



export default ChatItem