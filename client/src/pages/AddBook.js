import React, { useState } from 'react'
import { useMutation } from "react-query";
import { API } from "../config/api";
import { useHistory } from "react-router-dom";

import NavbarNav from '../components/partials/navigation/NavbarNav';
import UserDropdown from '../components/partials/dropdown/UserDropdown';

import {
  Container,
  Form,
  Button,
} from 'react-bootstrap';

// icons
import { IconContext } from 'react-icons';
import { FiPaperclip } from 'react-icons/fi';
import { BiBookAdd } from 'react-icons/bi';

function AddBook() {
  let api = API();
  let history = useHistory();

  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    title: "",
    publicationDate: "",
    pages: "",
    author: "",
    isbn: "",
    about: "",
    bookCover: "",
    bookFile: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.name === "bookCover") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Store data with FormData as object
      let formData = new FormData();
      formData.set("title", form.title);
      formData.set("publicationDate", form.publicationDate);
      formData.set("pages", form.pages);
      formData.set("author", form.author);
      formData.set("isbn", form.isbn);
      formData.set("about", form.about);
      formData.set("bookCover", form?.bookCover[0], form.bookCover[0]?.name);
      formData.set("bookFile", form?.bookFile[0], form.bookFile[0]?.name);

      // Configuration
      const config = {
        method: "POST",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
        body: formData,
      };

      const response = await api.post("/book", config);
      console.log(response)
      history.push("/data-books");

    } catch (error) {
      console.log(error);
    }
  });
  return (
    <>
      <Container className="nav-read-book d-flex justify-content-between">
        <NavbarNav />
        <UserDropdown />
      </Container>

      <Container className="p-5">
        <div className="title-trans mb-5 px-5">Add Book</div>

        <div className="px-5">
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control className="form-input-book" type="text" name="title" placeholder="Title" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control className="form-input-book" type="date" name="publicationDate" placeholder="Publication Date" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control className="form-input-book" type="number" name="pages" placeholder="Pages" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control className="form-input-book" type="text" name="author" placeholder="Author" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control className="form-input-book" type="number" name="isbn" placeholder="ISBN" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control className="form-input-book h-100" type="text" name="about" placeholder="About This Book" as="textarea" rows={5} onChange={handleChange} />
            </Form.Group>

            {/* proview image */}
            <div className="my-3">
              {preview && (
                <div>
                  <img
                    src={preview}
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      objectFit: "cover",
                    }}
                    alt="preview"
                  />
                </div>
              )}
            </div>

            <Form.Group className="mb-4" controlId="formAttachei">
              <Form.Control type="file" name="bookCover" onChange={handleChange} />
              <Form.Label className="form-input-book text-start w-25" name="bookCoverName" type="text" style={{ cursor: "pointer" }} onChange={handleChange}>
                Attache Book Cover
                <IconContext.Provider value={{ color: "#6c757d", className: "global-class-name", size: "1.5em" }}>
                  <span className="float-end">
                    <FiPaperclip />
                  </span>
                </IconContext.Provider>
              </Form.Label>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formAttache">
              <Form.Control type="file" name="bookFile" onChange={handleChange} />
              <Form.Label className="form-input-book text-start w-25" name="bookFileName" type="text" style={{ cursor: "pointer" }}>
                Attache Book File
                <IconContext.Provider value={{ color: "#6c757d", className: "global-class-name", size: "1.5em" }}>
                  <span className="float-end">
                    <FiPaperclip />
                  </span>
                </IconContext.Provider>
              </Form.Label>
            </Form.Group>

            {/* button submit */}
            <div className="d-flex justify-content-end">
              <Button className="btn-add-book my-4 mt-4" type="submit">
                {/* icon */}
                <IconContext.Provider value={{ color: "#FFF", className: "global-class-name", size: "1.7em" }}>
                  <span>
                    Add Book <BiBookAdd />
                  </span>
                </IconContext.Provider>
              </Button>
            </div>

          </Form>
        </div>
      </Container>
    </>
  )
}

export default AddBook
