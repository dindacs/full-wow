import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { API } from "../../../config/api";
import { useQuery, useMutation } from "react-query";

import {
  Table,
  Dropdown,
} from 'react-bootstrap';

import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { IconContext } from "react-icons";

function ListUsers() {

  let history = useHistory();
  let api = API();

  // Fetching all data transaction from database
  let { data: transactions, refetch } = useQuery("transactionsCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/transactions", config);
    return response.data.transactions;
  });

  const handleApprove = useMutation(async (e) => {
    try {
      e.preventDefault();

      let id = e.target.id;

      let changeData = {
        remainingAcvite: 30,
        userStatus: "Active",
        paymentStatus: "Approve",
      }
      const body = (JSON.stringify(changeData));

      const config = {
        method: "PUT",
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-Type": "application/json",
        },
        body: body,
      };

      await api.put(`/transaction/${id}`, config);
      refetch();

    } catch (error) {
      console.log(error);
    }
  });

  const handleCancel = useMutation(async (e) => {
    try {
      e.preventDefault();

      let id = e.target.id;

      let changeData = {
        remainingAcvite: 0,
        userStatus: "Not Active",
        paymentStatus: "Cancel",
      }

      const config = {
        method: "PUT",
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changeData),
      };

      await api.put(`/transaction/${id}`, config);
      refetch();

    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <div className="title-trans mb-5">Incoming Transaction</div>
      <div>
        <Table>
          <thead>
            <tr className="text-danger" style={{ borderBottom: "2px solid #cacaca" }} >
              <th>No</th>
              <th>Users</th>
              <th className="text-center">Bukti Transfer</th>
              <th>Remaining Active</th>
              <th>Status User</th>
              <th>Status Payment</th>
              <th>Action</th>
            </tr>
          </thead>

          {transactions?.map((item, index) => (
            <tbody item={item} key={index} >
              <tr style={{ borderBottom: "2px solid #cacaca" }}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td style={{ width: "25%" }} className="text-center">
                  <img src={item.transferProof} alt="transferProof" style={{ width: "45%" }} />
                </td>
                <td>{item.remainingAcvite}/hari</td>
                <td>
                  {
                    item.userStatus === "Active"
                      ? <span className="fw-bold text-success">Active</span>
                      : <span className="fw-bold text-danger">Not Active</span>
                  }
                </td>
                <td>
                  {
                    item.paymentStatus === "Approve"
                      ? <span className="fw-bold text-success">Approve</span>

                      : item.paymentStatus === "Pending"
                        ? <span className="fw-bold text-warning">Pending</span>

                        : <span className="fw-bold text-danger">Cancel</span>
                  }
                </td>
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

                      <Dropdown.Item
                        className="fw-bold text-center text-success" role="submit"
                        onClick={(e) => handleApprove.mutate(e)} id={item.id}>
                        Approve
                      </Dropdown.Item>

                      <Dropdown.Item
                        className="fw-bold text-center text-danger" role="submit"
                        onClick={(e) => handleCancel.mutate(e)} id={item.id}>
                        Cancel
                      </Dropdown.Item>

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

export default ListUsers;
