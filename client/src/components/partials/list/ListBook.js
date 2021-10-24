import React, { useState } from "react";
import { useHistory } from "react-router";
import { useQuery } from "react-query";
import { API } from "../../../config/api";

import ModalNotSubscribe from "../modal/ModalNotSubscribe";
import bookEmpty from '../../assets/img/book/book-empty.svg'

import './Style.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Row,
  Col,
  Card,
} from 'react-bootstrap';

function ListBook() {
  let api = API();
  const history = useHistory();
  const [modalShowNotSubscribe, setModalShowNotSubscribe] = useState(false);
  const showModalNotSubscribe = () => setModalShowNotSubscribe(true);

  let { data: books } = useQuery("booksCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/books", config);
    return response.data.books;
  });

  let { data: users } = useQuery("usersCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/users", config);
    return response.data.users;
  });

  let isSubs = false;

  if (users?.tb_transaction.length <= 0) {
    isSubs = false;
  } else if (users?.tb_transaction[0].userStatus === "Not Active") {
    isSubs = false;
  } else {
    isSubs = true;
  }

  return (
    <>
      <div className="ms-3">
        {books?.length !== 0 ? (
          <Row>

            {books?.map((item, index) => (
              <Col lg={3} sm={6} item={item} key={index}
              >
                <Card className="card-book" style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (isSubs) {
                      history.push(`/detail-book/${item.id}`);
                    } else {
                      showModalNotSubscribe();
                    }
                  }}
                >
                  <Card.Img variant="top" src={item.bookCover} className="img-book" />
                  <Card.Body className="ps-0">
                    <Card.Title className="my-2 title-book">{item.title}</Card.Title>
                    <Card.Subtitle className="my-3 author-book text-muted">{item.author}</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            ))}

          </Row>
        ) : (
          <div className="text-center">
            <img src={bookEmpty} alt="bookEmpty"
              style={{
                width: "30%",
                height: "30%",
              }}
            />
            <div className="mt-4" style={{
              fontSize: "1.8rem",
            }}>
              No data book
            </div>
          </div>
        )}

      </div>
      <ModalNotSubscribe show={modalShowNotSubscribe} onHide={() => setModalShowNotSubscribe(false)} />
    </>
  );
};
export default ListBook;