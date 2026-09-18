import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { ShipsCollection } from '../wrappers/ShipsCollection';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('ShipsCollection', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('ShipsCollection');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let shipsCollection: SandboxContract<ShipsCollection>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        shipsCollection = blockchain.openContract(ShipsCollection.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await shipsCollection.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: shipsCollection.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and shipsCollection are ready to use
    });
});
