import { useState, useEffect } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import { constants, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";

import TokenFarm from "../chain_info/contracts/TokenFarm.json";
import ERC20 from "../chain_info/contracts/MockERC20.json";
import networkMapping from "../chain_info/deployments/map.json";

export const useStakeTokens = (tokenAddress: string) => {
  const { chainId } = useEthers();
  const tokenFarmAddress = chainId
    ? networkMapping[chainId]["TokenFarm"][0]
    : constants.AddressZero;

  const tokenFarmABI = TokenFarm.abi;
  const tokenFarmInterface = new utils.Interface(tokenFarmABI);
  const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface);

  const erc20ABI = ERC20.abi;
  const erc20Interface = new utils.Interface(erc20ABI);
  const erc20Contract = new Contract(tokenAddress, erc20Interface);

  const { send: approveErc20Send, state: approveErc20State } =
    useContractFunction(erc20Contract, "approve", {
      transactionName: "Approve ERC20 transfer",
    });
  const approveAndStake = (amount: string) => {
    if (amount === "0") {
      return;
    }
    setAmountToStake(amount);
    return approveErc20Send(tokenFarmAddress, amount);
  };

  const { send: stakeSend, state: stakeState } = useContractFunction(
    tokenFarmContract,
    "stakeTokens",
    {
      transactionName: "Stake tokens",
    }
  );

  const [amountToStake, setAmountToStake] = useState("0");
  const [state, setState] = useState(approveErc20State);

  useEffect(() => {
    if (approveErc20State.status === "Success") {
      stakeSend(amountToStake, tokenAddress);
    }
  }, [approveErc20State, tokenAddress, amountToStake]);

  useEffect(() => {
    if (approveErc20State.status === "Success") {
      setState(stakeState);
    } else {
      setState(approveErc20State);
    }
  }, [approveErc20State, stakeState]);

  return { approveAndStake, state };
};
