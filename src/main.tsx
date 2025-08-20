import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Error_404 from "./pages/404";
import QuestionList from "./pages/questionList";
import Question from "./pages/question";
import MockTest from "./pages/mockTest";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/global.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="questionList" element={<QuestionList />} />
          <Route path="mockTest" element={<MockTest />} />
          <Route path="question" element={<Question />} />
          <Route path="*" element={<Error_404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
