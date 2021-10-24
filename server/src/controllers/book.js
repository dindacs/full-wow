const { tb_book } = require('../../models');

const Joi = require('joi');

// add book
exports.addBook = async (req, res) => {


  const { ...datas } = req.body;

  const schema = Joi.object({
    title: Joi.string().min(4).required(),
    author: Joi.string().min(4).required(),
    pages: Joi.string().min(2).required(),
    isbn: Joi.string().min(4).required(),
    about: Joi.string().min(10).required(),
    publicationDate: Joi.string().required(),
  })

  const { error } = schema.validate(datas)

  if (error) {
    return res.status(400).send({
      status: "error",
      message: error.details[0].message,
    });
  }

  try {
    let book = await tb_book.create({
      title: datas.title,
      author: datas.author,
      pages: datas.pages,
      isbn: datas.isbn,
      about: datas.about,
      publicationDate: datas.publicationDate,
      bookFile: req.files.bookFile[0].filename,
      bookCover: req.files.bookCover[0].filename,
    });

    console.log(book)

    // add file path for img book
    book = JSON.parse(JSON.stringify(book));
    book = {
      ...book,
      bookFile: process.env.FILE_PATH + book.bookFile,
      bookCover: process.env.FILE_PATH + book.bookCover,
    }

    res.status(200).send({
      status: "success",
      data: {
        title: book.title,
        author: book.author,
        pages: book.pages,
        isbn: book.isbn,
        about: book.about,
        bookFile: book.bookFile,
        publicationDate: book.publicationDate,
        bookCover: book.bookCover,
      }
    });

  } catch (error) {
    res.status(400).send({
      status: "failed",
      message: "server error",
    });
  }
}

// get data book
exports.getBooks = async (req, res) => {
  try {

    let books = await tb_book.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      order: [['createdAt', 'DESC']],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      }
    });

    // add file path for img book
    books = JSON.parse(JSON.stringify(books));
    books = books.map((item) => {
      return {
        ...item,
        bookFile: process.env.FILE_PATH + item.bookFile,
        bookCover: process.env.FILE_PATH + item.bookCover,
      }
    });

    res.status(200).send({
      status: "success",
      data: {
        books
      }
    });

  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
}

// get detail book
exports.getDetailBook = async (req, res) => {
  try {

    const { id } = req.params;

    let book = await tb_book.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
    });

    book = JSON.parse(JSON.stringify(book));
    book = {
      ...book,
      bookFile: process.env.FILE_PATH + book.bookFile,
      bookCover: process.env.FILE_PATH + book.bookCover,
    }

    res.status(200).send({
      status: "success",
      data: {
        book
      }
    });

  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
}

// edit book
exports.updateBook = async (req, res) => {
  try {

    const { id } = req.params;
    const book = req.body;
    const bookFile = req.files.bookFile[0].filename;
    const bookCover = req.files.bookCover[0].filename;

    await tb_book.update(
      {
        ...book,
        bookFile,
        bookCover,
      },
      {
        where: {
          id,
        },
      });

    res.status(200).send({
      status: "success",
      data: {
        ...book,
        bookCover,
        bookFile,
      }
    });

  } catch (error) {
    res.send({
      status: "failed",
      message: "server error",
    });
  }
}

// delete book
exports.deleteBook = async (req, res) => {
  try {

    const { id } = req.params;

    await tb_book.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({
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