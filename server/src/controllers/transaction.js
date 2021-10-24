const { tb_transaction, tb_user } = require('../../models')

// add transaction
exports.addTransaction = async (req, res) => {
  try {

    const { datas } = req.body;
    const transactions = await tb_transaction.create({
      datas,
      transferProof: req.file.filename,
      idUser: req.user.id,
      remainingAcvite: 0,
      userStatus: "Not Active",
      paymentStatus: "Pending",
    });

    res.send({
      status: "success",
      idUser: req.user.id,
      transactions,
    });

  } catch (error) {
    res.send({
      status: "failed",
      message: "server error",
    });
  }
}

// get data transaction
exports.getTransactions = async (req, res) => {
  try {

    let transactions = await tb_transaction.findAll({
      include: [
        {
          model: tb_user,
          as: 'tb_user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password',]
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
    });

    transactions = JSON.parse(JSON.stringify(transactions));

    transactions = transactions.map((item) => {
      return {
        // ...item,
        id: item.id,
        remainingAcvite: item.remainingAcvite,
        userStatus: item.userStatus,
        paymentStatus: item.paymentStatus,
        name: item.tb_user.name,
        idUser: item.tb_user.id,
        transferProof: process.env.FILE_PATH + item.transferProof,
      }
    });


    res.send({
      status: "success",
      data: {
        transactions
      }
    });

  } catch (error) {
    res.send({
      status: "failed",
      message: "server error",
    });
  }
}

// get detail transaction
exports.getDetailTransaction = async (req, res) => {
  try {

    const { id } = req.params;

    let transaction = await tb_transaction.findOne({
      where: {
        id: req.user.id,
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
    });

    transaction = JSON.parse(JSON.stringify(transaction));
    transaction = {
      ...transaction,
      transferProof: process.env.FILE_PATH + transaction.transferProof
    }

    res.send({
      status: "success",
      data: {
        transaction
      }
    });

  } catch (error) {
    res.send({
      status: "failed",
      message: "server error",
    });
  }
}

// edit transaction
exports.updateTransaction = async (req, res) => {
  try {

    const { id } = req.params;
    const transaction = req.body;

    await tb_transaction.update(
      {
        ...transaction,
      },
      {
        where: {
          id,
        },
      });

    res.send({
      status: "success",
      data: {
        transaction,
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
exports.deleteTransaction = async (req, res) => {
  try {

    const { id } = req.params;

    await tb_transaction.destroy({
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