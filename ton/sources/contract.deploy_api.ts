import {
    Address,
} from "@ton/ton";

import * as dotenv from "dotenv";
import { getTonClient } from "./utils/api";
import { higloadWalletDeploy } from "./console/deployHighload";
import { printWallet } from "./console/printWallet";
import { deployBumpticketRouter } from "./console/deployBumpticketRouter";
import { testBumpticketRouter } from "./console/testBumpticketRouter";
import { setBumpticketDividers } from "./console/setBumpticketDividers";
import { nftAssignHighload } from "./console/assignNftHighload";
import { assignToHighload } from "./console/assignHighload";
import { nftIssueHighloadTest } from "./console/issueHighloadTest";
import { multiIssue } from "./console/multiIssue";
import { burnNft } from "./console/burnNft";
import { nftDeployShipsCollection } from "./console/deployShipsCollection";
import { nftDeployOGPassCollection } from "./console/deployOGPass";
import { nftIssueShipTest } from "./console/issueShip";
import { checkQuery } from "./console/checkQuery";
import { changeTrustedAddress } from "./console/changeTrusted";
import { changeNFTTrustedAddress } from "./console/changeNFTTrustedAddr";
import { deploySale } from "./console/deploySale";
import { withdrawHigload } from "./console/withdrawHighload";
import { withdrawTON } from "./console/withdrawTon";
import { setSecondMinter } from "./console/setSecondMinter";
import { deployStakingMaster } from "./console/deployStakingMaster";
import { jettonDeploy } from "./console/deployJetton";
import { jettonSetSecondMinter } from "./console/setJettonSecondMinter";
import { stakeJetton } from "./console/stakeJetton";
import { claimStake } from "./console/claimStake";
import { specialFunc } from "./console/special";
import { reStake } from "./console/stakeRestake";
import { stakeWithdraw } from "./console/stakeWithdraw";
import { nftIssueShipMulti } from "./console/mintMany";
import { deployNewShipsCollection } from "./console/deployNewShips";
import { mintNew } from "./console/mintNew";
import { multiMint } from "./console/multiMint";
import { setSecondMinterNew } from "./console/setSecondMinterNew";
dotenv.config();


(async () => {
    try {
        // Create client for testnet sandboxv4 API - alternative endpoint
        const client4 = await getTonClient();
        if (process.argv.length > 2) {
            const arg = process.argv[2];
            if (arg == "highload") {
                await higloadWalletDeploy(client4);
                process.exit(0);
            } else if (arg == "wallet") {
                await printWallet(client4);
                process.exit(0);
            } else if (arg == "bumpticket") {
                const refAddr = Address.parse(process.argv[3]);
                const prizeAddr = Address.parse(process.argv[4]);
                const mainAddr = Address.parse(process.argv[5]);
                await deployBumpticketRouter(client4, refAddr, prizeAddr, mainAddr);
                process.exit(0);
            } else if (arg == "bumpticket-test") {
                await testBumpticketRouter(client4);
                process.exit(0);
            } else if (arg == "bumpticket-dividors") {
                const rNum = parseInt(process.argv[3]);
                const rDenum = parseInt(process.argv[4]);
                const pNum = parseInt(process.argv[5]);
                const pDenum = parseInt(process.argv[6]);
                await setBumpticketDividers(client4, rNum, rDenum, pNum, pDenum);
                process.exit(0);
            } else if (arg == "set-second-minter") {
                const address = Address.parse(process.argv[3]);
                const secondMinter = Address.parse(process.argv[4]);
                await setSecondMinter(client4, address, secondMinter);
                process.exit(0);
            } else if (arg == "set-second-minter-new") {
                const address = Address.parse(process.argv[3]);
                const secondMinter = Address.parse(process.argv[4]);
                await setSecondMinterNew(client4, address, secondMinter);
                process.exit(0);
            } else if (arg == "deploy-staking") {
                const jettonAddress = Address.parse(process.argv[3]);
                const nftAddress = Address.parse(process.argv[4]);
                const feeAddress = Address.parse(process.argv[5]);
                await deployStakingMaster(client4, jettonAddress, nftAddress, feeAddress);
                process.exit(0);
            } else if (arg == "deploy-jetton") {
                await jettonDeploy(client4);
                process.exit(0);
            } else if (arg == "jetton-set-second-minter") {
                const address = Address.parse(process.argv[3]);
                const secondMinter = Address.parse(process.argv[4]);
                await jettonSetSecondMinter(client4, address, secondMinter);
                process.exit(0);
            } else if (arg == "stake") {
                const masterAddress = Address.parse(process.argv[3]);
                await stakeJetton(client4, masterAddress);
                process.exit(0);
            } else if (arg == "claim") {
                const stakeAddress = Address.parse(process.argv[3]);
                await claimStake(client4, stakeAddress);
                process.exit(0);
            } else if (arg == "restake") {
                const stakeAddress = Address.parse(process.argv[3]);
                await reStake(client4, stakeAddress);
                process.exit(0);
            } else if (arg == "stake-withdraw") {
                const stakeAddress = Address.parse(process.argv[3]);
                await stakeWithdraw(client4, stakeAddress);
                process.exit(0);
            } else if (arg == 'special') {
                await specialFunc(client4, process.argv.slice(3));
                process.exit(0);
            } else if (arg == "assign") {
                const address = Address.parse(process.argv[3]);
                const newOwner = Address.parse(process.argv[4]);
                await nftAssignHighload(client4, address, newOwner);
                process.exit(0);
            } else if (arg == "assign-hw") {
                const address = Address.parse(process.argv[3]);
                const newOwner = Address.parse(process.argv[4]);
                await assignToHighload(client4, address, newOwner);
                process.exit(0);
            } else if (arg == "issue") {
                const address = Address.parse(process.argv[3]);
                const receiver = Address.parse(process.argv[4]);
                await nftIssueHighloadTest(client4, address, receiver);
                process.exit(0);
            } else if (arg == "issue-multi") {
                await multiIssue(client4);
                process.exit(0);
            } else if (arg == "issue-many") {
                const address = Address.parse(process.argv[3]);
                const count = parseInt(process.argv[4]);
                await nftIssueShipMulti(client4, count, address);
                process.exit(0);
            } else if (arg == "burn") {
                const address = Address.parse(process.argv[3]);
                await burnNft(client4, address.toString());
                process.exit(0);
            } else if (arg == "deploy") {
                const address = Address.parse(process.argv[3]);
                await nftDeployShipsCollection(client4, address.toString());
                process.exit(0);
            } else if (arg == "deploy-new") {
                const trustedAddress = Address.parse(process.argv[3]);
                const secondMinter = Address.parse(process.argv[4]);
                await deployNewShipsCollection(client4, trustedAddress, secondMinter);
                process.exit(0);
            } else if (arg == "mint-new") {
                const address = Address.parse(process.argv[3]);
                const id = parseInt(process.argv[4]);
                const to = Address.parse(process.argv[5]);
                await mintNew(client4, address, id, to);
                process.exit(0);
            } else if (arg == "multi-mint") {
                const address = Address.parse(process.argv[3]);
                const to = Address.parse(process.argv[4]);
                const count = parseInt(process.argv[5]);
                await multiMint(client4, address, to, count);
                process.exit(0);
            } else if (arg == "deploy-og") {
                await nftDeployOGPassCollection(client4);
                process.exit(0);
            } else if (arg == "ship") {
                const itemId = parseInt(process.argv[3]);
                const receiver = Address.parse(process.argv[4]);
                await nftIssueShipTest(client4, itemId, receiver);
                process.exit(0);
            } else if (arg == "check") {
                const queryId = process.argv[3];
                await checkQuery(client4, queryId);
                process.exit(0);
            } else if (arg == "burn") {
                const address = Address.parse(process.argv[3]);
                await burnNft(client4, address.toString());
                process.exit(0);
            } else if (arg == "trusted") {
                const collection = process.argv[3];
                const address = Address.parse(process.argv[4]);
                await changeTrustedAddress(client4, collection, address.toString());
                process.exit(0);     
            } else if (arg == "trusted-nft") {
                const nft = process.argv[3];
                const address = process.argv[4];
                await changeNFTTrustedAddress(client4, nft, address);
                process.exit(0);              
            } else if (arg == "sale") {
                const nftAddress = process.argv[3];
                await deploySale(client4, nftAddress);
                process.exit(0);
            } else if (arg == "withdraw-coins") {
                const address = process.argv[3];
                const value = process.argv[4];
                await withdrawHigload(client4, address, value);
                process.exit(0);
            } else if (arg == "withdraw-ton") {
                const collection = process.argv[3];
                const dest = process.argv[4];
                const value = process.argv[5];
                await withdrawTON(client4, collection, dest, value);
                process.exit(0);
            } else {
                console.error("Unknown argument: ", arg);
                process.exit(1);
            }
        }
    } catch (error) {
        console.error("An error occurred during the deployment process: ", error);
    }
})();
