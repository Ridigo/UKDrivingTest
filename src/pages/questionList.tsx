import { useEffect, useState } from "react";
import ListGroup from "../components/ListGroup";
import { Button } from "react-bootstrap";

type QuestionObject = {
  id: string;
  question: string;
  picture: string;
  link: string;
  category: string;
  options: string[];
  answer: string;
};

function QuestionList() {
  const [backendData, setBackendData] = useState<
    QuestionObject[] | undefined
  >();
  const [questions, setQuestions] = useState(backendData);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    fetch("/UKDrivingTest/questions.json")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
        setQuestions(data);
      });
  }, []);

  function handleSearch(val: string) {
    if (val === "") {
      setQuestions(backendData);
      return;
    }
    const filterBySearch = backendData?.filter((item) => {
      if (item.question.toLowerCase().includes(val.toLowerCase())) {
        return item;
      }
    });
    setQuestions(filterBySearch);
  }

  return (
    <>
      <div className="container position-fixed">
        <div className="row text-center">
          <Button
            variant="dark border border-secondary"
            href="/UKDrivingTest/"
            className="p-3 mx-3 col-auto"
          >
            Home
          </Button>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center my-2 my-md-3">
          <div className="col-8 col-md-auto bg-dark text-light rounded border border-secondary p-4">
            <h1>List of all questions present in the 2025 driving test</h1>
          </div>
        </div>
        <div className="row justify-content-center my-2 my-md-3">
          <div className="col">
            <input
              type="text"
              className="w-100 border border-secondary rounded bg-dark text-light p-2"
              placeholder="Search through questions"
              value={searchVal}
              onChange={(e) => {
                setSearchVal(e.target.value);
                handleSearch(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row">
          <ListGroup
            items={questions?.map((question) => question.question) || []}
            ids={
              questions?.map(
                (question) => backendData?.indexOf(question) || 0
              ) || []
            }
          />
        </div>
      </div>
    </>
  );
}

export default QuestionList;
export type { QuestionObject };
