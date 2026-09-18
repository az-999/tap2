import { toNano } from '@ton/core';
import { Router } from '../wrappers/Router';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const router = provider.open(await Router.fromInit());

    await router.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(router.address);

    // run methods on `router`
}
