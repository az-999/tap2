import { toNano } from '@ton/core';
import { Module } from '../wrappers/Module';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const module = provider.open(await Module.fromInit());

    await module.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(module.address);

    // run methods on `module`
}
