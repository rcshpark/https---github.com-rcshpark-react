import "./App.css";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ChatbotPage from "./pages/chatbot";
import Login from "./pages/login";
import Main from "./pages/main";
function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<ChatbotPage/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/main" element={<Main/>}/>
  </Routes>
  </BrowserRouter>
  );
}
export default App;