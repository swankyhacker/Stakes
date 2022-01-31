import { useState } from "react";
import { useEthers } from "@usedapp/core";
import { constants } from "ethers";
import { makeStyles, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import networkMapping from "../chain_info/deployments/map.json";
import brownieConfig from "../brownie-config.json";
import helperConfig from "../helper-config.json";
import Dapp from "../images/dapp.png";
import Dai from "../images/dai.png";
import Eth from "../images/eth.png";

import { Token } from "./main";

import { YourWallet } from "./Wallet/yourWallet";
export const SwiperCard = () => {
  const [selectedToken, setSelectedToken] = useState<number>(0);
  const { chainId } = useEthers();
  const classes = useStyles();
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

  return (
    <div className={classes.wrapper}>
      <IconButton
        onClick={() => {
          setSelectedToken((token) => {
            return (token - 1) % 3;
          });
        }}
      >
        <ArrowBackIosIcon className={classes.icon} />
      </IconButton>
      <YourWallet token={supportedTokens[Math.abs(selectedToken)]} />
      <IconButton
        onClick={() => {
          setSelectedToken((token) => {
            return (token + 1) % 3;
          });
        }}
      >
        <ArrowForwardIosIcon className={classes.icon} />
      </IconButton>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "80%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    width: "62px",
    color: "white",
    height: "50px",
  },
}));
