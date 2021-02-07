import { Accordion, Button } from "react-bootstrap";
import { useState } from "react";

export default function TextExpand({ text }) {
  const [toggled, setToggled] = useState(false);

  return (
    <Accordion>
      {!toggled && <div>{text.substring(0, 250)}...</div>}
      <Accordion.Collapse eventKey="0">
        <div>{text}</div>
      </Accordion.Collapse>
      {
        text.length >= 450 ? (
           <Accordion.Toggle
        as={Button}
        variant="link"
        eventKey="0"
        onClick={() => {
          setToggled(!toggled);
        }}
        className="mb-2"
      >
        Read {!!toggled ? "less" : "more"}
      </Accordion.Toggle>
        ) : ''
      }
     
    </Accordion>
  );
}
