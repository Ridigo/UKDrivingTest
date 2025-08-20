import { Button } from "react-bootstrap";

function Home() {
  return (
    <div className="container align-content-center" style={{ height: "100vh" }}>
      <h1 className="row text-light justify-content-center text-center my-3 fw-bold">
        A UK driving test practice site
      </h1>
      <p className="row text-light justify-content-center text-center mb-5">
        Feel free to explore the questions from the 2025 UK driving test
      </p>
      <div className="row justify-content-center">
        <div className="col">
          <Button
            variant="dark"
            href="/questionList"
            className="p-3 fs-3 w-100"
          >
            Question List
          </Button>
        </div>
        <div className="col">
          <Button
            href={"/question?id=" + String(Math.floor(Math.random() * 275))}
            variant="dark"
            className="p-3 fs-3 w-100"
          >
            Random question
          </Button>
        </div>
        <div className="col">
          <Button href="/mockTest" variant="dark" className="p-3 fs-3 w-100">
            Mock test
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
