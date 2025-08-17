import Message from "./Message";
import ListGroup from "./components/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./App.css";
import capsule_1 from "./assets/capsule.png";
import round_tablet_1 from "./assets/round_table_1.png";
import { API_value } from "./App_data_api";
import ReactMarkdown from "react-markdown";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import drug_intro_image from "./assets/drug_intro_image.png";

function App() {
  const handleSelectItem = (item: string) => {
    console.log(item);
  };
  const introduction = API_value("introduction");
  const quickNote = API_value("quick_note");
  const drug_introduction = API_value("drug_introduction");
  return (
    <div>
      {/* HEADER */}
      <div className="container-fluid whole">
        <div className="capsule_1">
          <img
            src={capsule_1}
            alt="capsule 1"
            className="img-fluid custom-image"
          />
        </div>
        <div className="capsule_2">
          <img
            src={capsule_1}
            alt="capsule 2"
            className="img-fluid custom-image"
          />
        </div>
        <div className="round_tablet_1">
          <img
            src={round_tablet_1}
            alt="capsule 1"
            className="img-fluid custom-image"
          />
        </div>

        <div className="container-fluid header_content">
          <div className="row header-bar">
            <h1 className="header-title">MY LEARNING NOTES</h1>
            <p className="sub-heading">SELF-LEARNING BLOGS</p>
          </div>

          {/* CONTENT (floating card) */}
          <div className="row content">
            <div className="intro-card-fluid">
              {drug_introduction ? (
                <>
                  <h4 className="text-center fw-bold">Hi Everyone!</h4>
                  <p className="text-center">{introduction}</p>

                  <div className="quick-note">
                    <b className="me-2">A QUICK NOTE:</b>
                    <p className="mb-0">{quickNote}</p>
                  </div>

                  <p className="text-center">
                    I'll begin by sharing what I'm learning about the pharma
                    domain, and I hope this content helps others who are also
                    starting their journey in this field.
                  </p>
                  <div
                    className="text drug_introduction"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    <img
                      src={drug_intro_image}
                      alt="API and Excipients division"
                      className="drug-image-float"
                    />
                    <ReactMarkdown>{drug_introduction ?? ""}</ReactMarkdown>
                  </div>
                </>
              ) : (
                <Stack spacing={1}>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={"100%"}
                    height={"3vw"}
                  />
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={"100%"}
                    height={"2vw"}
                  />
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={"100%"}
                    height={"10vw"}
                  />
                </Stack>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
