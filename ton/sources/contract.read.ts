import {beginCell, toNano, Address, TonClient4, WalletContractV4, internal, TonClient} from "@ton/ton";
import {mnemonicToWalletKey} from "ton-crypto";
import * as dotenv from "dotenv";

dotenv.config();
// ================================================================= //
import {VoucherCollection, MintByOwner} from "./output/MM-NFT_VoucherCollection";
// ================================================================= //
import { getHttpV4Endpoint } from "@orbs-network/ton-access";
import { must } from "./utils/retry";
import { getCollectionInfo } from "./utils/config";


// ЛОГИКА:
// 1. Юзер жмет "купить"
// 2. Проверяем наш баланс (минт за наш счет), проверяем, что нфт еще есть в наличии
// 3. Замораживаем баланс юзера на бэке
// 4. Запускаем минт
// 5. Ждем, пока транза пройдет
// 6. Смотрим, увеличилось ли общее количество НФТ в коллекции
//   6.1. Если да -- говорим бэку, что у нас все ок
//   6.2. Если нет -- говорим бэку, что транза не прошла и надо вернуть деньги юзеру
// 7. Готово 


let user_address = Address.parse("UQBQJfEAoFxqcFPXyjt1pILjXLmy5-C6zl6RG9u05iw9ONUx"); //получаем с кошелька пользователя через tonconnect


const getEnv = (key: string) => process.env[key]?.toString() || '';

const getTonClient = async () => getEnv('NETWORK') === 'testnet' ? new TonClient4({
    endpoint: 'https://sandbox-v4.tonhubapi.com/',
}) : new TonClient4({endpoint: await getHttpV4Endpoint()});


const MintMsg: MintByOwner = {
    $$type: 'MintByOwner',
    mint_to: user_address
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

(async () => {
    const client = await getTonClient();
    // const client = new TonClient4({
    //     endpoint: "https://mainnet-v4.tonhubapi.com", // 🔴 Main-net API endpoint
    //     endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    // });
    
    const args = process.argv.slice(2);
    let collectionId = 0;
    if (args.length > 0) {
        collectionId = parseInt(args[0]);
    }

    const info = getCollectionInfo(collectionId);
    console.log('Deploying NFT Collection: ' + info);
    if (!info) throw new Error('Invalid collection ID');

    // Parameters
    let collection_address = Address.parse(info.address); //адрес коллекции, выносим в .енв
    console.log("NFT Collection Address: ", collection_address.toString());

    let contract_address = await VoucherCollection.fromAddress(collection_address);
    let client_open = client.open(contract_address);

    const collectiondata = await must(() => client_open.getGetCollectionData())
    const index = Number(collectiondata.next_item_index)


    console.log("Current index: ", index);
    if (index <= info.totalSupply) {
        let mnemonic = (process.env.OWNER_CONTRACT_MNEMONIC || "").toString(); //загружаем с .енв фразу кошелька, с которого деплоили
        const key = await mnemonicToWalletKey(mnemonic.split(" "));
        const wallet = WalletContractV4.create({publicKey: key.publicKey, workchain: 0});


        // open wallet and read the current seqno of the wallet
        const walletContract = client.open(wallet);
        const walletSender = walletContract.sender(key.secretKey);
        let balance = await must(() => walletContract.getBalance()) //проверяем наш баланс (нужно 0.3, чтобы транза прошла без проблем)


        if (balance >= toNano(0.3)) {

            
            //здесь функция заморзки денег юзера на бэке\
            await must(() => client_open.send(walletSender, {value: toNano(0.3), bounce: false}, MintMsg)); //сама транза на минт

            console.log("Transaction send, waiting for confirmation...");
            //я не уверен, можно ли так делать на фронте
            await delay(120000) //ждем, пока пройдет транза
            console.log("Transaction confirmed");

            const newdata = await must(() => client_open.getGetCollectionData()) //получаем новый последний индекс коллекции
            const newindex = Number(newdata.next_item_index)

            console.log("New index: ", newindex);
            if (newindex > index) {
                //здесь функция сообщения бэку, что все успешно
                console.log("Success")
            } else {
                //здесь функция разморозки
                console.log("Fail")
            }


        } else {
            console.log("Insufficient balance of deployer's wallet")
        }

    } else {
        console.log("Maximum amount of NFT minted :")
    }

})();

