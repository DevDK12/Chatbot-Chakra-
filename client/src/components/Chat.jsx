import { Box, Flex, Text, Input, Avatar, Container , IconButton} from '@chakra-ui/react';

import {FaArrowRight} from 'react-icons/fa'
import { GoHubot } from "react-icons/go";
import { faker } from '@faker-js/faker';
import { useState } from 'react';




const user = faker.image.avatarLegacy();

const data = [
    {
        msg: 'Hi there! How can I assist you today?',
        role: 'Bot',
    },
]



const Chat = () => {

    const [messages, setMessages] = useState(data);

    const [msg, setMsg] = useState('');
    const changeHandler = (e) => {
        setMsg(e.target.value);
    }


    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        //_ validate input 

        setMessages(messages => [...messages, {
            url: user,
            msg: msg,
            role: 'User',
        }]);

        setIsLoading(true);

        try{
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    msg 
                }),
            })

            if (res.status === 429) throw new Error('Too many requests, please wait');
            if (res.status === 500) throw new Error('Internal server error');
            if (res.status === 503) throw new Error('Service unavailable');
            if (!res.ok) throw new Error('An unknown error occurred');

            if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            
            const data = await res.json();

            console.log(data.status);

            setIsLoading(false);
            
            console.log(data.message.content)
            setMessages(messages => [...messages, {
                role: 'Bot',
                msg: data.message.content,
            }]);

        }
        catch(error){
            setIsLoading(false);
            //_ Throw toast for error 
            console.error('Error:', error);
        }
    
        setMsg('');
    };





    return (
        <Container centerContent h="100vh"  bg='#242424'>
            <Flex alignItems="center" justifyContent="center" placeItems="center" h='100vh' w="60vw" >

                <Box p={5} bg="white" borderRadius="lg" w="100%"  boxShadow="md">
                    <Flex direction="column" mb={6}  p={4}  borderWidth={1} borderRadius="lg" h='80vh' 
                    overflowY="scroll"
                    css={{
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        '-ms-overflow-style': 'none',  /* IE and Edge */
                        'scrollbar-width': 'none',  /* Firefox */
                    }}
                >

                    {messages.map((entry, id) => {
                        return (
                            entry.role === 'User' ?
                            <Flex key={id} alignItems="flex-center" mb={4}>
                                <Avatar h='35px' w='35px' name="User" src={entry.url}  mr={2} />
                                <Text mr={2} color={`${entry.color}.500`}  fontSize="md" p={2} borderRadius="lg" w='100%' >
                                    {entry.msg}
                                </Text>
                            </Flex>
                            :
                            <Flex key={id} alignItems="flex-center" mb={4}>
                                <Box as={GoHubot} h='35px' w='35px' name="Bot" ml={2} />
                                <Text mr={2} color={`green.500`}  fontSize="md" p={2} borderRadius="lg" w='100%' >
                                    {entry.msg}
                                </Text>
                            </Flex>
                        );
                    })}

                    {
                        isLoading && 
                        <Flex alignItems="flex-center" mb={4}>
                            <Box as={GoHubot} h='35px' w='35px' name="Bot" ml={2} />
                            <Text mr={2} color={`green.500`}  fontSize="md" p={2} borderRadius="lg"  w='100%' >
                                Thinking ... ... 
                            </Text>
                        </Flex>
                    }


                    </Flex>
                    <form onSubmit={handleSubmit}>
                        <Box position="relative" >
                            <Input
                                placeholder="Enter your query here..."
                                borderRadius="lg"
                                w='100%'
                                value={msg}
                                p='0.5rem 1rem'
                                onChange={changeHandler}
                            />
                            <IconButton
                                h="1.75rem"
                                size="sm"
                                icon={<FaArrowRight />}
                                type="submit"
                                position="absolute"
                                right="1rem"
                                top="50%"
                                transform="translateY(-50%)"
                            />
                        </Box>
                    </form>
                </Box>
            </Flex>
        </Container>

    );
};

export default Chat;