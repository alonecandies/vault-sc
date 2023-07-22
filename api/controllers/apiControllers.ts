import SmartContractDAO from "../data/SmartContractDAO";
import helpers from "./helpers";

exports.withdraw = async (req: any, res: any) => {
  try {
    let { address, amount } = req.body;
    if (!address || !amount || amount <= 0) {
      return res.status(101).json(helpers.APIResponse(101, "Bad Request"));
    }
    let dao = new SmartContractDAO();
    let result = await dao.withdrawToken(address, amount);
    return res.status(200).json(
      helpers.APIResponse(
        200,
        {
          txHash: result.transactionHash,
          to: address,
          amount: amount,
        },
        "Withdrawal Successful"
      )
    );
  } catch (error) {
    return res
      .status(500)
      .json(helpers.APIResponse(500, error, "Internal Server Error"));
  }
};
