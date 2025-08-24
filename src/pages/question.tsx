import { useEffect, useState } from "react";

import { useSearchParams } from "react-router";
import type { Question } from "./questionList";
import { Button } from "react-bootstrap";

function QuestionPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  //

  const [backendData, setBackendData] = useState<Question[] | undefined>();

  const [selectedOption, setSelectedOption] = useState(-1);

  const [answeredQuestionCount, setAnsweredQuestionCount] = useState(0);
  const [correctQuestionCount, setCorrectQuestionCount] = useState(0);

  useEffect(() => {
    fetch("/UKDrivingTest/questions.json")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  const id: number = Number(searchParams.get("id"));
  let question: Question = {
    id: "undefined",
    question: "undefined",
    picture: "undefined",
    link: "undefined",
    category: "undefined",
    options: ["undefined", "undefined", "undefined", "undefined"],
    answer: "undefined",
  };

  if (typeof backendData !== "undefined") {
    question = backendData[id];
  }
  const answerIndex = question.options.indexOf(question.answer);

  function checkOption(optionIndex: number) {
    return optionIndex === answerIndex;
  }

  function handleOptionClick(optionIndex: number) {
    if (selectedOption === -1) {
      setSelectedOption(optionIndex);
    }
  }

  function redirectToRandomQuestion() {
    if (selectedOption == answerIndex) {
      setAnsweredQuestionCount(answeredQuestionCount + 1);
      setCorrectQuestionCount(correctQuestionCount + 1);
    } else if (selectedOption !== -1) {
      setAnsweredQuestionCount(answeredQuestionCount + 1);
    }

    searchParams.set(
      "id",
      String(Math.floor(Math.random() * (backendData?.length || 0)))
    );
    setSelectedOption(-1);
    setSearchParams(searchParams);
  }

  return (
    <>
      <div className="container position-fixed">
        <div className="row text-center">
          <div className="p-3 mx-3 col-auto text-light border rounded border-secondary bg-dark">
            {correctQuestionCount}/{answeredQuestionCount}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center mt-3">
          <div className="col-auto bg-dark rounded border border-secondary text-light p-4">
            <h1>
              Question {id}: {question.question}
            </h1>
          </div>
        </div>

        {question.picture !== null && (
          <>
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-5 justify-content-center">
                <img
                  className="p-4"
                  src={question.picture}
                  style={{
                    minWidth: "80%",
                    maxHeight: "400px",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
              </div>
            </div>
          </>
        )}

        <div className="row row-cols-1 row-cols-md-2 g-2 g-md-5 mt-1">
          <div className="col">
            <Button
              variant={getVariantName(0)}
              className="fs-3 p-3 w-100"
              onClick={() => handleOptionClick(0)}
              disabled={selectedOption !== -1}
            >
              {question.options[0].includes("<img") ? (
                <img
                  src={question.options[0]
                    .replace("<img src='", "")
                    .replace("'>", "")}
                ></img>
              ) : (
                question.options[0]
              )}
            </Button>
          </div>
          <div className="col">
            <Button
              variant={getVariantName(1)}
              className="fs-3 p-3 w-100"
              onClick={() => handleOptionClick(1)}
              disabled={selectedOption !== -1}
            >
              {question.options[1].includes("<img") ? (
                <img
                  src={question.options[1]
                    .replace("<img src='", "")
                    .replace("'>", "")}
                ></img>
              ) : (
                question.options[1]
              )}
            </Button>
          </div>
          <div className="col">
            <Button
              variant={getVariantName(2)}
              className="fs-3 p-3 w-100"
              onClick={() => handleOptionClick(2)}
              disabled={selectedOption !== -1}
            >
              {question.options[2].includes("<img") ? (
                <img
                  src={question.options[2]
                    .replace("<img src='", "")
                    .replace("'>", "")}
                ></img>
              ) : (
                question.options[2]
              )}
            </Button>
          </div>
          <div className="col">
            <Button
              variant={getVariantName(3)}
              className="fs-3 p-3 w-100"
              onClick={() => handleOptionClick(3)}
              disabled={selectedOption !== -1}
            >
              {question.options[3].includes("<img") ? (
                <img
                  src={question.options[3]
                    .replace("<img src='", "")
                    .replace("'>", "")}
                ></img>
              ) : (
                question.options[3]
              )}
            </Button>
          </div>
        </div>

        <div className="row g-2 g-md-5 justify-content-center mt-2">
          <div className="col col-sm-3 col-lg-2">
            <Button
              variant="dark"
              href="#/questionList"
              className="fs-5 p-3 w-100"
            >
              List
            </Button>
          </div>
          <div className="col col-sm-3 col-lg-2">
            <Button
              variant="dark"
              className="fs-5 p-3 w-100"
              onClick={() => setSelectedOption(-1)}
            >
              Reset
            </Button>
          </div>
          <div className="col col-sm-3 col-lg-2">
            <Button
              variant="dark"
              className="fs-5 p-3 w-100"
              onClick={redirectToRandomQuestion}
            >
              Random
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  function getVariantName(index: number) {
    if (selectedOption !== -1) {
      if (checkOption(index)) return "success";
      else if (selectedOption === index) return "danger";
    }
    return "dark";
  }
}

export default QuestionPage;
