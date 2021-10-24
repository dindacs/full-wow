const { tb_userlistbook, tb_book } = require('../../models')

// add listbook
exports.addListBook = async (req, res) => {
  try {

    const listbook = await tb_userlistbook.create({
      idUser: req.user.id,
      idBook: req.body.idBook,
    });
    res.send({
      status: "success",
      listbook,
    });

  } catch (error) {
    res.status(401).send({
      status: "failed",
      message: "server error",
    });
  }
}

// get data listbook
exports.getListBook = async (req, res) => {
  try {

    // const id = req.user.id;

    let listBook = await tb_userlistbook.findAll({
      where: {
        idUser: req.user.id,
      },
      include: [
        {
          model: tb_book,
          as: "tb_book",
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
    });

    listBook = JSON.parse(JSON.stringify(listBook));
    listBook = listBook.map((item) => {
      return {
        id: item.idBook,
        bookCover: process.env.FILE_PATH + item.tb_book.bookCover,
        title: item.tb_book.title,
        author: item.tb_book.author
      };
    });

    res.send({
      status: "success",
      data: {
        listBook
      }
    });

  } catch (error) {
    res.send({
      status: "failed",
      message: "server error",
    });
  }
}

// delete listbook
exports.deleteListBook = async (req, res) => {
  try {

    const { id } = req.params;

    await tb_userlistbook.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      data: {
        id: `${id}`,
      },
    });

  } catch (error) {
    res.send({
      status: "failed",
      message: "server error",
    });
  }
}