import Head from "next/head";
import MagicLoginModal from "../components/MagicLoginModal";
import { Row, Col } from "react-bootstrap";

const Root = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* <Head>
        <title>Shared List</title>
        <meta name="description" content="Share Your List!" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      <Row className="flex-grow-1" style={{ border: "1px solid red" }}>
        <Col style={{ border: "1px solid red" }}>
          <MagicLoginModal />
        </Col>
      </Row>
    </div>
  );
};

export default Root;
