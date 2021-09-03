import { Col, Image } from "antd";
import React, { Component } from "react";
import rec from "../images/recruit-agent-analyzing-candidates_74855-4565 1.svg";
export default class RecruiterImg extends Component {
  render() {
    return (
      <Col xs={24} md={{ span: 6, offset: 1 }} style={{ marginTop: "5rem" }}>
        <Image src={rec} preview={false} className="img1" width={480} />
      </Col>
    );
  }
}
