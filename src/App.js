import "./App.css";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ChatBot from "./pages/chatbot";
function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<ChatBot/>}/>
  </Routes>
  </BrowserRouter>
  );
}
export default App;