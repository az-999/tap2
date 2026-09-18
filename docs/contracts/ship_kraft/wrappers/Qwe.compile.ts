import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/qwe.tact',
    options: {
        debug: true,
    },
};
