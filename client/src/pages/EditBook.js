import React, { useState } from 'react'
import { useMutation } from "react-query";
import { API } from "../config/api";
import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "react-query";

import NavbarNav from '../components/partials/navigation/NavbarNav';
import UserDropdown from '../components/partials/dropdown/UserDropdown';

import {
  Container,
  Form,
  Button,
} from 'react-bootstrap';

import { IconContext } from 'react-icons';
import { FiPaperclip } from 'react-icons/fi';
import { BiBookAdd } from 'react-icons/bi';

function EditBook() {
  let api = API();
  let history = useHistory();
  const { id } = useParams();

  const [preview, setPreview] = useState(null);
  const [bookEdit, setBookEdit] = useState({});
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

  useQuery("bookCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/book/" + id, config);

    setForm({
      title: response.data.book.title,
      publicationDate: response.data.book.publicationDate,
      pages: response.data.book.pages,
      author: response.data.book.author,
      isbn: response.data.book.isbn,
      about: response.data.book.about,
      bookFile: response.data.book.bookFile,
      bookCover: response.data.book.bookCover,
    });
    setBookEdit(response.data.book);
    console.log(response.data.book.bookFile);
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.name === "bookCover") {
      setPreview(e.target.files);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Store data with FormData as object
      let formData = new FormData();
      if (preview) {
        formData.set("bookCover", preview[0], preview[0]?.name);
      }
      formData.set("title", form.title);
      formData.set("publicationDate", form.publicationDate);
      formData.set("pages", form.pages);
      formData.set("author", form.author);
      formData.set("isbn", form.isbn);
      formData.set("about", form.about);
      // formData.set("bookCover", form?.bookCover[0], form.bookCover[0]?.name);
      formData.set("bookFile", form?.bookFile[0], form.bookFile[0]?.name);

      const config = {
        method: "PUT",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
        body: formData,
      };

      // Insert data
      const response = await api.put("/book/" + bookEdit.id, config);
      console.log(response);
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
        <div className="title-trans mb-5 px-5">Edit Book</div>

        <div className="px-5">
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            {/* <Form > */}
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control className="form-input-book" type="text" name="title" placeholder="Title" onChange={handleChange} value={form.title} />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control className="form-input-book" type="date" name="publicationDate" placeholder="Publication Date" onChange={handleChange} value={form.publicationDate} />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control className="form-input-book" type="number" name="pages" placeholder="Pages" onChange={handleChange} value={form.pages} />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control className="form-input-book" type="text" name="author" placeholder="Author" onChange={handleChange} value={form.author} />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control className="form-input-book" type="number" name="isbn" placeholder="ISBN" onChange={handleChange} value={form.isbn} />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control className="form-input-book h-100" type="text" name="about" placeholder="About This Book" as="textarea" rows={5} onChange={handleChange} value={form.about} />
            </Form.Group>

            {/* proview book cover */}
            <div>
              {!preview ? (
                <div>
                  <img
                    src={form.bookCover}
                    style={{
                      maxWidth: "150px",
                      maxHeight: "150px",
                      objectFit: "cover",
                    }}
                    alt="preview"
                  />
                </div>
              ) : (
                <div>
                  <img
                    src={URL.createObjectURL(preview[0])}
                    style={{
                      maxWidth: "150px",
                      maxHeight: "150px",
                      objectFit: "cover",
                    }}
                    alt="preview"
                  />
                </div>
              )}
            </div>

            <Form.Group className="my-4" controlId="formAttachei">
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
              <Form.Label className="form-input-book text-start w-25" name="bookFileName" type="text" style={{ cursor: "pointer" }} value={form.bookFile}>
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
                    Edit Book <BiBookAdd />
                  </span>
                </IconContext.Provider>
              </Button>
            </div>

          </Form>
        </div>
      </Container >
    </>
  )
}

export default EditBook
