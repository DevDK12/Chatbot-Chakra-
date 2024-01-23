import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from '@chakra-ui/react'
import Chat from './components/Chat'



const { Button } = chakraTheme.components

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}


const theme = extendBaseTheme({
  components: {
    Button,
  },
  colors,
})





const App = ()=>{
  return (
    <ChakraBaseProvider theme={theme}>
      <Chat />
    </ChakraBaseProvider>
  )
}

export default App;