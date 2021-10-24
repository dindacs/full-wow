import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { API } from "../../../config/api";

import ShowMoreText from "react-show-more-text";
import dateFormat from "dateformat";
import ModalDeleteData from "../modal/ModalDeleteData";

import {
  Table,
  Dropdown,
  Button,
} from 'react-bootstrap';

import { IconContext } from "react-icons";
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { BiBookAdd } from 'react-icons/bi';

function ListBookAdmin() {

  const history = useHistory();
  let api = API();

  // Variabel for delete data
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // get data books
  let { data: books, refetch } = useQuery("booksCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/books", config);
    return response.data.books;
  });

  // For get id & show modal confirm delete data
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  // execute delete data
  const deleteById = useMutation(async (id) => {
    try {
      const config = {
        method: "DELETE",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      };
      await api.delete("/book/" + id, config);
      refetch();

    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <>
      <Button
        onClick={() => {
          history.push(`/add-book`);
        }}
        style={{ backgroundColor: "#d60000", border: "none" }} className="fw-bold" >
        {/* icon */}
        <IconContext.Provider value={{ color: "#FFF", className: "global-class-name", size: "1.7em" }}>
          <span>
            Add Book <BiBookAdd />
          </span>
        </IconContext.Provider>
      </Button>

      <div>
        <Table >
          <thead>
            <tr className="text-danger" style={{ borderBottom: "2px solid #cacaca" }} >
              <th>No</th>
              <th>Title</th>
              <th>Author</th>
              <th>Pages</th>
              <th>Publication Date</th>
              <th>Isbn</th>
              <th>About</th>
              <th className="text-center">Book Cover</th>
              <th>Action</th>
            </tr>
          </thead>

          {books?.map((item, index) => (
            <tbody item={item} key={index} >
              <tr style={{ borderBottom: "2px solid #cacaca" }}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.pages}</td>
                <td>{dateFormat(item.publicationDate, "d mmmm yyyy")}</td>
                <td>{item.isbn}</td>
                <td>
                  <ShowMoreText
                    lines={1}
                    more="show"
                    less="hide"
                    className="content-css"
                    anchorClass="my-anchor-css-class"
                    expanded={false}
                    width={200}
                  >
                    {item.about}
                  </ShowMoreText>
                </td>

                <td className="text-center"><img src={item.bookCover} alt="bookCover" style={{ width: "30%", height: "auto", }} /></td>

                <td>
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      {/* icon */}
                      <IconContext.Provider value={{ color: "#1C9CD2", className: "global-class-name", size: "1.7em" }}>
                        <div>
                          <FaCaretDown />
                        </div>
                      </IconContext.Provider>
                    </Dropdown.Toggle>

                    <Dropdown.Menu id={`dropdown-button-drop-up`}>

                      <IconContext.Provider value={{ color: "#FFF", className: "global-class-name", size: "2em" }}>
                        <div className="text-end icon-caret">
                          <FaCaretUp />
                        </div>
                      </IconContext.Provider>

                      <Dropdown.Item className="fw-bold text-center text-warning" onClick={() => {
                        history.push(`/edit-book/${item.id}`);
                      }}
                      > Edit
                      </Dropdown.Item>

                      <Dropdown.Item className="fw-bold text-center text-danger" onClick={() => {
                        handleDelete(item.id);
                      }}>
                        Delete
                      </Dropdown.Item>

                      <ModalDeleteData setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose} />

                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            </tbody>
          ))}

        </Table>
      </div >

    </>
  )
}

export default ListBookAdmin;
