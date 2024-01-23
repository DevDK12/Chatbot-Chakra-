import {FaArrowRight} from 'react-icons/fa'
import { useState } from 'react';

import { Box, Flex, Input,  Container , IconButton} from '@chakra-ui/react';

import ChatList from './ChatList';
import ChatItem from './ChatItem';








const Chat = () => {

    const [messages, setMessages] = useState([
        {
            msg: 'Hi there! How can I assist you today?',
            role: 'Bot',
        },
    ]);

    const [msg, setMsg] = useState('');
    const changeHandler = (e) => {
        setMsg(e.target.value);
    }


    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        //_ validate input 
        if(msg === ''){
            setMessages(messages => [...messages, {
                role: 'Bot',
                msg: 'Oops! You forgot to type your message',
            }]);
            return;
        }

        setMessages(messages => [...messages, {
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

            if (res.status === 400) throw new Error('Bad request');
            if (res.status === 408) throw new Error('Request timeout');
            if (res.status === 429) throw new Error('Too many requests, please wait');
            if (res.status === 500) throw new Error('Internal server error');
            if (res.status === 503) throw new Error('Service unavailable');
            if (!res.ok) throw new Error('An unknown error occurred');
            
            const data = await res.json();

            console.log('Success:', data);

            setIsLoading(false);
            
            console.log(data.message)
            setMessages(messages => [...messages, {
                role: 'Bot',
                msg: data.message,
            }]);

        }
        catch(error){
            setIsLoading(false);

            //_ Use toast to send error to UI
            console.error('Error:', error);
        }

        setMsg('');
    };





    return (
        <Container centerContent h="100vh"  bg='#242424'>
            <Flex alignItems="center" justifyContent="center" placeItems="center" h='100vh' w="60vw" >

                <Box p={5} bg="white" borderRadius="lg" w="100%"  boxShadow="md">
                    <Flex 
                        direction="column" 
                        mb={6}  p={4}  h='80vh'
                        borderWidth={1} 
                        borderRadius="lg"  
                        overflowY="scroll"
                        css={{
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            },
                        }}
                    >
                        <ChatList messages={messages} />
                        {isLoading && 
                            <ChatItem 
                                role='Bot'
                                msg='Thinking...'
                            />
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