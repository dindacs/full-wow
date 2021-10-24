import React from "react";

import adduser from '../../assets/img/user/add-user.svg'

import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Contact({ dataContact, clickContact, contact }) {
  return (
    <>
      {dataContact.length > 0 && (
        <>
          {dataContact.map((item) => (
            <div
              key={item.id}
              className={`contact mt-3 p-2 ${contact?.id === item?.id && "contact-active"
                }`}
              onClick={() => {
                clickContact(item);
              }}
            >
              <img
                src={item?.avatar || adduser}
                className="rounded-circle me-2 img-contact"
                alt="user avatar"
              />
              <div className="ps-1 text-contact d-flex flex-column justify-content-around">
                <p className="mb-0">{item.name}</p>
                <p className="text-contact-chat mt-1 mb-0">
                  {item.message}
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
