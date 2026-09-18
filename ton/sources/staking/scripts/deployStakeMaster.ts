import { Address, toNano } from '@ton/core';
import { StakeMaster } from '../wrappers/StakeMaster';
import { NetworkProvider } from '@ton/blueprint';

const owner = "0QB3VqWU_DXlRxN9Exf_7sfsNOWT99V1gWedmUi18DZbuUhE"
const jetton = "kQBESBuK_T_R47huspjEZlB4g9srxQ57ZbDM4NbC_5UVk-sS"


export async function run(provider: NetworkProvider) {
    const stakeMaster = provider.open(await StakeMaster.fromInit(
        Address.parse(owner), 
        Address.parse(jetton),
        Address.parse(jetton),
        {}
    ));

    await stakeMaster.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(stakeMaster.address);

    // run methods on `stakeMaster`
}
