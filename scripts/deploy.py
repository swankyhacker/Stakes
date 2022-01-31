from brownie import DappToken, TokenFarm
from scripts.helpful_scripts import get_account, get_contract
from web3 import Web3
import yaml
import json
import os
import shutil

KEPT_BALANCE = Web3.toWei(100, "ether")


def deploy(front_end_update=False):
    account = get_account()
    dapp_token = DappToken.deploy({"from": account})
    token_farm = TokenFarm.deploy(dapp_token.address, {"from": account})
    tx = dapp_token.transfer(
        token_farm.address, dapp_token.totalSupply() - KEPT_BALANCE, {"from": account}
    )
    tx.wait(1)
    weth_token = get_contract("weth_token")
    fau_token = get_contract("fau_token")
    allowed_tokens_price_feed = {
        dapp_token: get_contract("dai_usd_price_feed"),
        fau_token: get_contract("dai_usd_price_feed"),
        weth_token: get_contract("eth_usd_price_feed"),
    }
    add_allowed_tokens(token_farm, allowed_tokens_price_feed, account)
    if front_end_update == True:
        update_front_end()
    return token_farm, dapp_token


def add_allowed_tokens(token_farm, allowed_tokens_price_feed, account):
    for token in allowed_tokens_price_feed:
        add_tx = token_farm.addAllowedTokens(token, {"from": account})
        add_tx.wait(1)
        set_tx = token_farm.setPriceFeedContract(
            token, allowed_tokens_price_feed[token], {"from": account}
        )
        set_tx.wait(1)
    return token_farm


def update_front_end():
    copy_folders_to_front_end("./build", "./front_end/src/chain_info")
    with open("brownie-config.yaml", "r") as brownie_config:
        config_dict = yaml.load(brownie_config, Loader=yaml.FullLoader)
        with open("./front_end/src/brownie-config.json", "w") as brownie_config_json:
            json.dump(config_dict, brownie_config_json)
    print("Front-end updated!!")


def copy_folders_to_front_end(src, dest):
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copytree(src, dest)


def main():
    deploy(front_end_update=True)
