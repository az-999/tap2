import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { StakeMaster } from '../wrappers/StakeMaster';
import '@ton/test-utils';

describe('StakeMaster', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let stakeMaster: SandboxContract<StakeMaster>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        stakeMaster = blockchain.openContract(await StakeMaster.fromInit(
            deployer.address,
        ));

    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and stakeMaster are ready to use
    });
});
