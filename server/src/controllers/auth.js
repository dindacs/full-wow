const { tb_user } = require('../../models');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// add user
exports.register = async (req, res) => {

  const data = req.body;

  const schema = Joi.object({
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(3).required(),
    role: Joi.string().required(),
  });

  // show error
  const { error } = schema.validate(data);

  if (error) {
    return res.status(400).send({
      status: "error",
      message: error.details[0].message,
    });
  }

  try {

    // generate salt
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);

    // cek email
    const userExist = await tb_user.findOne({
      where: {
        email: data.email,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    if (userExist) {
      return res.send({
        status: "failed",
        message: "email already exist",
      });
    }

    // add new user
    const newUser = await tb_user.create({
      email: data.email,
      password: hashPassword,
      name: data.name,
      role: "Customer"
    });

    // get token
    const dataToken = {
      id: newUser.id,
    };
    const token = jwt.sign(dataToken, process.env.SECRET_KEY);

    res.send({
      status: 'success...',
      data: {
        user: {
          email: newUser.email,
          token,
        }
      },
    });

  } catch (error) {
    res.send({
      status: "failed",
      message: "server error",
    });
  }
}

// login
exports.login = async (req, res) => {

  const data = req.body;

  const schema = Joi.object({
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),
  });

  // show error
  const { error } = schema.validate(data);

  if (error) {
    return res.status(400).send({
      status: "error",
      message: error.details[0].message,
    });
  }

  try {
    const userExist = await tb_user.findOne({
      where: {
        email: data.email,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    // compare password
    const isValid = await bcrypt.compare(data.password, userExist.password);

    // cek password
    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "email or password dont match",
      });
    }

    //get token
    const dataToken = {
      id: userExist.id,
    };
    const token = jwt.sign(dataToken, process.env.SECRET_KEY);

    res.status(200).send({
      status: "success",
      data: {
        user: {
          id: userExist.id,
          email: userExist.email,
          role: userExist.role,
          token,
        }
      },
    });

  } catch (error) {
    res.send({
      status: "failed",
      message: "server error",
    });
  }
}

exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;

    const dataUser = await tb_user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
      });
    }

    res.send({
      status: "success",
      data: {
        user: {
          id: dataUser.id,
          name: dataUser.name,
          email: dataUser.email,
          role: dataUser.role,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};
