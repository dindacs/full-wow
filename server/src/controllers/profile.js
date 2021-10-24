const { tb_profile } = require('../../models')

// add profile
exports.addProfile = async (req, res) => {
  try {

    const { ...datas } = req.body;
    const profile = await tb_profile.create({
      ...datas,
      avatar: req.file.filename,
      idUser: req.user.id,
    });

    res.send({
      status: "success",
      idUser: req.user.id,
      profile,
    });

  } catch (error) {
    res.send({
      status: "failed",
      message: "server error",
    });
  }
}

// get detail profile
exports.getDetailProfile = async (req, res) => {
  try {

    let profile = await tb_profile.findOne({
      where: {
        idUser: req.user.id,
      },

      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
    });

    if (!profile) {
      return res.send({
        message: "profile empty"
      })
    }

    profile = JSON.parse(JSON.stringify(profile));

    profile = {
      ...profile,
      avatar: process.env.FILE_PATH + profile.avatar
    }

    res.send({
      status: "success",
      data: {
        profile,
        idUser: req.user.id,
      }
    });

  } catch (error) {
    res.send({
      status: "failed",
      message: "server error",
    });
  }
}

// edit profile
exports.updateProfile = async (req, res) => {
  try {

    const { id } = req.params;
    const datas = req.body;

    const profileUser = await tb_profile.update(
      {
        ...datas,
        idUser: req.user.id,
        avatar: req.file.filename,
      },
      {
        where: {
          id,
        },
      });

    res.send({
      status: "success",
      data: {
        profileUser
      },
    });

  } catch (error) {
    res.send({
      status: "failed",
      message: "server error",
    });
  }
}

// delete transaction
exports.deleteProfile = async (req, res) => {
  try {

    const { id } = req.params;

    await tb_profile.destroy({
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