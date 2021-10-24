import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { io } from 'socket.io-client'

import NavbarNav from '../components/partials/navigation/NavbarNav';
import UserDropdown from '../components/partials/dropdown/UserDropdown';
import Contact from '../components/partials/complain/Contact'
import Chat from '../components/partials/complain/Chat'

import { Container, Row, Col } from 'react-bootstrap'

let socket
export default function ComplainAdmin() {
  const [contact, setContact] = useState(null)
  const [contacts, setContacts] = useState([])

  const [messages, setMessages] = useState([])

  const [state] = useContext(UserContext)

  useEffect(() => {
    socket = io('http://localhost:5000', {
      auth: {
        token: localStorage.getItem('token')
      },
      query: {
        id: state.user.id
      }
    })

    // define listener for every updated message
    socket.on("new message", () => {
      console.log("contact", contact)
      socket.emit("load messages", contact?.id)
    })

    loadContacts()
    loadMessages()

    return () => {
      socket.disconnect()
    }
  }, [messages])

  // contact
  const loadContacts = () => {
    socket.emit("load customer contacts")
    socket.on("customer contacts", (data) => {

      let dataContacts = data.filter(item => (item.role !== "Admin") && (item.recipientMessage.length > 0 || item.senderMessage.length > 0))

      dataContacts = dataContacts.map((item) => ({
        ...item,
        message: item.senderMessage.length > 0 ? item.senderMessage[item.senderMessage.length - 1].message : "Click here to start message"
      }))
      setContacts(dataContacts)
    })
  }

  const onClickContact = (data) => {
    setContact(data)
    socket.emit("load messages", data.id)
  }

  const loadMessages = () => {
    // define event listener for "messages"
    socket.on("messages", (data) => {
      // get data messages
      if (data.length > 0) {
        const dataMessages = data.map((item) => ({
          idSender: item.sender.id,
          message: item.message,
        }))
        setMessages(dataMessages)
      }
      loadContacts()
      const chatMessagesElm = document.getElementById("chat-messages")
      chatMessagesElm.scrollTop = chatMessagesElm?.scrollHeight
    })
  }

  const onSendMessage = (e) => {
    // listen only enter key event press
    if (e.key === 'Enter') {
      const data = {
        idRecipient: contact.id,
        message: e.target.value
      }

      //emit event send message
      socket.emit("send message", data)
      e.target.value = ""
    }
  }

  return (
    <>
      <Container className="nav-read-book d-flex justify-content-between">
        <NavbarNav />
        <UserDropdown />
      </Container>

      <Container fluid style={{ height: '80vh', marginTop: '20px', }}>
        <Row>
          <Col md={3} style={{ height: '80vh' }} className="px-3 border-end border-dark overflow-auto">
            <Contact dataContact={contacts} clickContact={onClickContact} contact={contact} />
          </Col>
          <Col md={9} style={{ maxHeight: '89.5vh' }} className="px-0">
            <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage} />
          </Col>
        </Row>
      </Container>
    </>
  )
}