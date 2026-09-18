import { toNano } from '@ton/core';
import { ShipsCollection } from '../wrappers/ShipsCollection';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const shipsCollection = provider.open(ShipsCollection.createFromConfig({}, await compile('ShipsCollection')));

    await shipsCollection.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(shipsCollection.address);

    // run methods on `shipsCollection`
}
