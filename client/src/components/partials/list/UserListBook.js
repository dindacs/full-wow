import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../../../config/api";

import bookEmpty from '../../assets/img/book/book-empty.svg'

import './Style.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Row,
  Col,
  Card,
} from 'react-bootstrap';

function UserListBook() {

  let api = API();
  const history = useHistory();

  let { data: listBooks } = useQuery("listBooksCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/list-book", config);
    return response.data.listBook;
  });

  return (
    <>
      <div className="ms-3">
        {listBooks?.length !== 0 ? (
          <Row>
            {listBooks?.map((item, index) => (
              <Col lg={3} sm={6} item={item} key={index}
              >
                <Card className="card-book"
                  onClick={() => {
                    history.push(`/detail-book/${item.id}`);
                  }}
                  style={{ cursor: "pointer" }}
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

    </>
  );
};
export default UserListBook;