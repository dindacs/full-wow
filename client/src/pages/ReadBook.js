import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { ReactReader } from "react-reader";

import NavbarNav from '../components/partials/navigation/NavbarNav';

import { Container } from 'react-bootstrap';

function ReadBook() {

  let { id } = useParams();
  let api = API();

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

  const [location, setLocation] = useState(null)
  const locationChanged = (epubcifi) => {
    setLocation(epubcifi)
  }

  return (
    <>
      <Container className="nav-read-book d-flex justify-content-start">
        <NavbarNav />
      </Container>

      <Container fluid>
        <div style={{ height: "100vh" }}>
          <ReactReader
            location={location}
            locationChanged={locationChanged}
            url={book?.bookFile}
          />
        </div>
      </Container>
    </>
  )
}

export default ReadBook
