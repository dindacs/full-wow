const { tb_chat, tb_user } = require("../../models")
const jwt = require("jsonwebtoken")

// operator
const { Op } = require("sequelize")

const connectedUser = {}
const socketIo = (io) => {

  // middlewares
  io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      next();
    } else {
      next(new Error("Not Authorized"));
    }
  });

  io.on('connection', async (socket) => {
    console.log('client connect: ', socket.id)

    // get user connected id
    const idUser = socket.handshake.query.id

    // save to connectedUser
    connectedUser[idUser] = socket.id

    socket.on("load admin contact", async () => {
      try {
        let adminContact = await tb_user.findOne({
          where: {
            role: "Admin"
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        });

        adminContact = JSON.parse(JSON.stringify(adminContact));
        adminContact = {
          ...adminContact,
          avatar: adminContact?.avatar
            ? process.env.FILE_PATH + adminContact?.avatar
            : null,
        }

        socket.emit("admin contact", adminContact)
      } catch (err) {
        console.log(err)
      }
    })

    // define listener on event load customer contact
    socket.on("load customer contacts", async () => {
      try {
        let customerContacts = await tb_user.findAll({
          include: [
            {
              model: tb_chat,
              as: "recipientMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"],
              },
            },
            {
              model: tb_chat,
              as: "senderMessage",
              attributes: {
                exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"],
              },
            },
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        })

        customerContacts = JSON.parse(JSON.stringify(customerContacts))
        customerContacts = customerContacts.map((item) => ({
          ...item,
          avatar: item?.avatar
            ? process.env.FILE_PATH + item?.avatar
            : null,
        }))

        socket.emit("customer contacts", customerContacts)
      } catch (err) {
        console.log(err)
      }
    })

    // define listener on event load messages
    socket.on("load messages", async (payload) => {
      try {
        const token = socket.handshake.auth.token

        const tokenKey = process.env.SECRET_KEY
        const verified = jwt.verify(token, tokenKey)

        const idRecipient = payload // catch recipient id sent from client
        const idSender = verified.id //id user

        const data = await tb_chat.findAll({
          where: {
            idSender: {
              [Op.or]: [idRecipient, idSender]
            },
            idRecipient: {
              [Op.or]: [idRecipient, idSender]
            }
          },
          include: [
            {
              model: tb_user,
              as: "recipient",
              attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
              },
            },
            {
              model: tb_user,
              as: "sender",
              attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
              },
            },
          ],
          order: [['createdAt', 'ASC']],
          attributes: {
            exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"],
          }
        })

        socket.emit("messages", data)
      } catch (error) {
        console.log(error)
      }
    })

    // define listener on event send message
    socket.on("send message", async (payload) => {
      try {
        const token = socket.handshake.auth.token

        const tokenKey = process.env.SECRET_KEY
        const verified = jwt.verify(token, tokenKey)

        const idSender = verified.id //id user
        const {
          message,
          idRecipient
        } = payload // catch recipient id and message sent from client

        await tb_chat.create({
          message,
          idRecipient,
          idSender
        })

        // emit to just sender and recipient default rooms by their socket id
        io.to(socket.id).to(connectedUser[idRecipient]).emit("new message", idRecipient)
      } catch (error) {
        console.log(error)
      }
    })

    socket.on("disconnect", () => {
      console.log("client disconnected", socket.id)
      delete connectedUser[idUser]
    })
  })
}

module.exports = socketIo;