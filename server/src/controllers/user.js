const { tb_user, tb_transaction } = require('../../models')

// get data user
exports.getUsers = async (req, res) => {
  try {

    let users = await tb_user.findOne({
      where: {
        id: req.user.id,
      },
      include: [
        {
          model: tb_transaction,
          as: "tb_transaction",
          attributes: {
            exclude: ["createdAt", "updatedAt", "idUser", "transferProof", "remainingAcvite", "paymentStatus"],
          },
        },
      ],
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      },
    })

    users = JSON.parse(JSON.stringify(users));
    users = {
      ...users,
      avatar: process.env.FILE_PATH + users.avatar,
    }

    res.send({
      status: "success",
      data: {
        users,
      }
    });

  } catch (error) {
    res.send({
      status: "failed",
      message: "server error",
    });
  }
}

// edit profile user
exports.updateProfile = async (req, res) => {
  try {

    const id = req.user.id;
    const datas = req.body;
    const avatar = req.file.filename;

    await tb_user.update(
      {
        ...datas,
        avatar
      },
      {
        where: {
          id,
        },
      },
    );

    res.send({
      status: "success",
      data: {
        datas,
        avatar
      },
    });

  } catch (error) {
    console.log(error)
    res.send({
      status: "failed",
      message: "server error",
    });
  }
}

// delete user
exports.deleteUser = async (req, res) => {
  try {

    const { id } = req.params;

    await tb_user.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      data: {
        id: `${id}`
      }
    });

  } catch (error) {
    res.send({
      status: "failed",
      message: "server error",
    });
  }
}