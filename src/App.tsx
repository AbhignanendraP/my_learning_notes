import Message from "./Message";
import ListGroup from "./components/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./App.css";
import capsule_1 from "./assets/capsule.png";

function App() {
  let items = ["Hyderabad", "Bangalore", "Chennai"];
  const handleSelectItem = (item: string) => {
    console.log(item);
  };
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
        <div className="container-fluid header_content">
          <div className="row header-bar">
            <h1 className="header-title">MY LEARNING NOTES</h1>
            <p className="sub-heading">SELF-LEARNING BLOGS</p>
          </div>

          {/* CONTENT (floating card) */}
          <div className="row content">
            <div className="intro-card-fluid shadow">
              <h4 className="text-center fw-bold">Hi Everyone!</h4>
              <p className="text-center">
                I created this website to share all the knowledge I'm gaining as
                I learn new things. I'm just starting my journey in the
                pharmaceutical industry, so I want to document what I discover
                along the way.
              </p>

              <div className="text-center">
                <span className="quick-note">
                  <b>A QUICK NOTE:</b> I'm still learning, so if you spot any
                  mistakes or have corrections, please feel free to give me
                  feedback! I believe we can all learn together, and your input
                  will help me improve.
                </span>
              </div>

              <p className="text-center">
                I'll begin by sharing what I'm learning about the pharma domain,
                and I hope this content helps others who are also starting their
                journey in this field.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
