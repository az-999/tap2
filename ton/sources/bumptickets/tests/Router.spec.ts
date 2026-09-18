import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Router } from '../wrappers/Router';
import '@ton/test-utils';

describe('Router', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let router: SandboxContract<Router>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        router = blockchain.openContract(await Router.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await router.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: router.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and router are ready to use
    });
});
