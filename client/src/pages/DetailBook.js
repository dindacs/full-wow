import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API } from "../config/api";
import { useQuery, useMutation } from "react-query";

import dateFormat from "dateformat";
import Sidebar from '../components/partials/navigation/Sidebar';

import {
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';

import { BsBookmark } from 'react-icons/bs';
import { BsChevronRight } from 'react-icons/bs';


function DetailBook() {

  const history = useHistory();
  let { id } = useParams();
  let api = API();

  const [isChecked, setIsChecked] = useState(false);

  let { data: check } = useQuery("checkCache", async () => {
    try {
      const config = {
        method: "GET",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      };
      const response = await api.get("/list-book", config);
      const booleanCheck = response.data.listBook.filter((item) => {
        return item.id === +id;
      });
      booleanCheck.length > 0 ? setIsChecked(true) : setIsChecked(false);
    } catch (error) {
      console.log(error);
    }
  });

  // Fetching data from database
  let { data: book } = useQuery("bookCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/book/" + id, config);
    return response.data.book;
  });

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const body = (JSON.stringify({ idBook: id }));

      // Configuration Content-type
      const config = {
        method: "POST",
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-Type": "application/json",
        },
        body: body,
      };

      // Insert data user to database
      const response = await api.post("/list-book", config);
      history.push('/profile-user');
    } catch (error) {
      console.log(error);
    }
  });

  // useEffect(() => {
  //   book();
  //   check.mutate(isChecked);
  // }, []);

  return (
    <>
      <Container fluid className="main-dashboard">
        <Row>
          <Col lg={3} className="dash-side-left">
            <Sidebar />
          </Col>
          <Col lg={9}>
            <Row className="about-book">
              <Col lg={4}>
                <img src={book?.bookCover} alt="book" className="img-detail-book" />
              </Col>
              <Col lg={6} className="desc-book">
                <div className="title-book">
                  {book?.title}
                </div>
                <div className="author-book">
                  {book?.author}
                </div>
                <div className="publication-jmlpages-book">
                  Publication Book
                </div>
                <div className="ket-book">
                  {dateFormat(book?.publicationDate, "d mmmm yyyy")}
                </div>
                <div className="publication-jmlpages-book">
                  Pages
                </div>
                <div className="ket-book">
                  {book?.pages}
                </div>
                <div className="isbn-book">
                  ISBN
                </div>
                <div className="ket-book">
                  {book?.isbn}
                </div>
              </Col>
            </Row>
            <div className="title-about-book">About This Book</div>
            <div className="sinopsis-book">
              <p>
                {book?.about}
              </p>
            </div>
            <div className="text-end btn-detail-book">
              {isChecked ? null : (
                <Button className="btn-action btn-add-list mt-4" type="submit" onClick={(e) => handleSubmit.mutate(e)}>
                  Add My List <BsBookmark />
                </Button>
              )}

              <Button className="btn-action btn-read-book mt-4" type="button"
                onClick={() => {
                  history.push(`/read-book/${id}`);
                }}>
                Read Book <BsChevronRight />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default DetailBook;