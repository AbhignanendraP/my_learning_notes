import Message from "./Message";
import ListGroup from "./components/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./App.css";
import capsule_1 from "./assets/capsule.png";
import drug from "./assets/capsule.png";
import round_tablet_1 from "./assets/round_table_1.png";
import { useAPIValue } from "./App_data_api";
import ReactMarkdown from "react-markdown";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import drug_intro_image from "./assets/drug_intro_image.png";
import { useState, useEffect, useCallback } from "react";
import Divider from "@mui/material/Divider";
import { Chip } from "@mui/material";

function App() {
  const {
    value: intro_and_drugs,
    fetchContent: fetchIntroAndDrugs,
    loading: introLoading,
  } = useAPIValue([]);

  // Second fetch group (starts empty)
  const {
    value: drugClass,
    fetchContent: fetchDrugClass,
    loading: drugClassLoading,
  } = useAPIValue([]);

  // Step 1: fetch first batch on mount
  useEffect(() => {
    fetchIntroAndDrugs([
      "introduction",
      "quick_note",
      "drug_introduction_1",
      "drug_introduction_2",
      "drug_introduction_3",
    ]);
  }, []);

  // Step 2: once first batch is done, fetch drug_class
  useEffect(() => {
    if (!introLoading && Object.keys(intro_and_drugs).length > 0) {
      fetchDrugClass(["drug_class", "drug_family", "patent_generic"]);
    }
  }, [introLoading, intro_and_drugs]);
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
              {!introLoading ? (
                <>
                  <h4 className="text-center fw-bold">Hi Everyone!</h4>
                  <p className="text-center">{intro_and_drugs.introduction}</p>

                  <div className="quick-note">
                    <b className="me-2">A QUICK NOTE:</b>
                    <p className="mb-0">{intro_and_drugs.quick_note}</p>
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
                    <img src={drug} alt="Drug" className="drug" />
                    <ReactMarkdown>
                      {intro_and_drugs.drug_introduction_1 ?? ""}
                    </ReactMarkdown>
                    <img
                      src={drug_intro_image}
                      alt="API and Excipients division"
                      className="drug-image-float"
                    />
                    <ReactMarkdown>
                      {intro_and_drugs.drug_introduction_2 ?? ""}
                    </ReactMarkdown>
                    <ReactMarkdown>
                      {intro_and_drugs.drug_introduction_3 ?? ""}
                    </ReactMarkdown>
                  </div>
                  <Divider variant="middle" textAlign="left">
                    <b>Drug Division</b>
                  </Divider>
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

              {!drugClassLoading ? (
                <>
                  <div
                    className="text drug_class_family_patent"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    <ReactMarkdown>{drugClass.drug_class ?? ""}</ReactMarkdown>
                    <ReactMarkdown>{drugClass.drug_family ?? ""}</ReactMarkdown>
                    <ReactMarkdown>
                      {drugClass.patent_generic ?? ""}
                    </ReactMarkdown>
                  </div>
                </>
              ) : (
                <Stack spacing={1}>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={"100%"}
                    height={"10vw"}
                  />
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={"100%"}
                    height={"10vw"}
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
        <div>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default App;
