import { useEthers, useContractCall } from "@usedapp/core";
import { constants, utils } from "ethers";
import { formatUnits } from "@ethersproject/units";

import TokenFarm from "../chain_info/contracts/TokenFarm.json";
import networkMapping from "../chain_info/deployments/map.json";

export const useContract = () => {
  const { chainId, account } = useEthers();
  const tokenFarmAddress =
    chainId && networkMapping[chainId]
      ? networkMapping[chainId]["TokenFarm"][0]
      : constants.AddressZero;

  const tokenFarmABI = TokenFarm.abi;
  const tokenFarmInterface = new utils.Interface(tokenFarmABI);
  // const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface);

  function useStakedBalance(tokenAddress: string) {
    const [balance]: any =
      useContractCall({
        abi: tokenFarmInterface,
        address: tokenFarmAddress,
        method: "stakingBalance",
        args: [tokenAddress, account],
      }) ?? [];

    const formattedBalance: number = balance
      ? parseFloat(formatUnits(balance, 18))
      : 0;

    return formattedBalance;
  }
  return { useStakedBalance };
};
