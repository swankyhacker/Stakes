import { useEthers, useContractFunction } from "@usedapp/core";
import { constants, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";

import TokenFarm from "../chain_info/contracts/TokenFarm.json";
import networkMapping from "../chain_info/deployments/map.json";

export const useUnstakeTokens = () => {
  const { chainId } = useEthers();
  const tokenFarmAddress = chainId
    ? networkMapping[chainId]["TokenFarm"][0]
    : constants.AddressZero;

  const tokenFarmABI = TokenFarm.abi;
  const tokenFarmInterface = new utils.Interface(tokenFarmABI);
  const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface);

  const { send: unstakeSend, state: unstakeState } = useContractFunction(
    tokenFarmContract,
    "unstakeTokens",
    {
      transactionName: "Unstake tokens",
    }
  );

  return { unstakeSend, unstakeState };
};
