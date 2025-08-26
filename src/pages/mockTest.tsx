import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import type { QuestionObject } from "./questionList";
import Timer from "../components/Timer";

function MockTest() {
  const [questions, setQuestions] = useState<QuestionObject[]>([]);

  const [backendData, setBackendData] = useState<
    QuestionObject[] | undefined
  >();

  const [deadline, setDeadline] = useState(0);

  useEffect(() => {
    fetch("/UKDrivingTest/questions.json")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  function generateQuestions() {
    if (typeof backendData !== "undefined") {
      for (let index = 0; index < 1; index++) {
        setQuestions([
          ...questions,
          backendData[Math.floor(Math.random() * (backendData?.length || 0))],
        ]);
        setDeadline(Date.now() + 60000 * 57);
      }
    }
  }

  return (
    <>
      {questions.length === 0 ? (
        <div
          className="container align-content-center"
          style={{ height: "100vh" }}
        >
          <h1 className="row text-light justify-content-center text-center my-3 fw-bold">
            Practice test
          </h1>
          <p className="row text-light justify-content-center text-center mb-5">
            You will have 57 minutes to complete 50 random questions
          </p>
          <div className="row justify-content-center">
            <div className="col">
              <Button
                onClick={generateQuestions}
                variant="dark"
                className="p-3 fs-3 w-100"
              >
                Start
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container position-fixed">
          <div className="row text-center">
            <Button
              variant="dark border border-secondary"
              href="/UKDrivingTest/"
              className="p-3 m-3 col-auto"
            >
              Home
            </Button>
            <Timer
              deadline={deadline}
              onFinish={() => console.log("finished")}
            ></Timer>
          </div>
        </div>
      )}
    </>
  );
}

export default MockTest;
