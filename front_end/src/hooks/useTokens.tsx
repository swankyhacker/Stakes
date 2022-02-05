import { useEthers } from "@usedapp/core";
import { constants } from "ethers";
import networkMapping from "../chain_info/deployments/map.json";
import brownieConfig from "../brownie-config.json";

import Dapp from "../images/dapp.png";
import Dai from "../images/dai.png";
import Eth from "../images/eth.png";

import { Token } from "../components/main";
import helperConfig from "../helper-config.json";

export const useTokens = () => {
  const { chainId } = useEthers();
  const networkName = chainId ? helperConfig[chainId] : "dev";

  const dappTokenAddress =
    chainId && networkMapping[chainId]
      ? networkMapping[chainId]["DappToken"][0]
      : constants.AddressZero;
  const wethTokenAddress =
    chainId && networkMapping[chainId]
      ? brownieConfig["networks"][networkName]["weth_token"]
      : constants.AddressZero;
  const fauTokenAddress: String =
    chainId && networkMapping[chainId]
      ? brownieConfig["networks"][networkName]["fau_token"]
      : constants.AddressZero;

  const supportedTokens: Array<Token> = [
    {
      image: Dapp,
      address: dappTokenAddress,
      name: "DAPP",
    },
    {
      image: Dai,
      address: fauTokenAddress,
      name: "FAU",
    },
    {
      image: Eth,
      address: wethTokenAddress,
      name: "WETH",
    },
  ];
  return supportedTokens;
};
