//export const StakeMasterAddress = 'EQDeIOS-q82rmqKEFgfpelTUDfgwpc-LyX2uuqTlcTkelwHK';
export const StakeMasterAddress = 'EQDkV771tW2vVqGyio9jEfhKpvzbfAiRGUyfnO-ISEZQ8Muy';
export type StakeRequest = {
    owner: string;
    amount: string;
    out_amount: string;
    mint_count: number;
    duration: number;
    max_claims: number;
}

export type ClaimRequest = {
    address: string;
    owner_address: string;
    id: string;
}

export type GetStakeDataRequest = {
    address: string;
    id?: string;
    owner_address?: string;
}
