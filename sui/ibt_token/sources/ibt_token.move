module ibt_token::ibt_token {

    use sui::coin;
    use sui::coin::{Coin, TreasuryCap};
    use sui::tx_context::TxContext;
    use sui::transfer;

    /// ===== ONE TIME WITNESS (MUST MATCH MODULE NAME IN CAPS) =====
    public struct IBT_TOKEN has drop {}

    /// ===== INIT =====
    fun init(witness: IBT_TOKEN, ctx: &mut TxContext) {

        let (treasury_cap, metadata) =
            coin::create_currency<IBT_TOKEN>(
                witness,
                9,
                b"IBT",
                b"IBT Token",
                b"Student project token",
                option::none(),
                ctx
            );

        transfer::public_transfer(treasury_cap, tx_context::sender(ctx));
        transfer::public_transfer(metadata, tx_context::sender(ctx));
    }

    /// ===== MINT =====
    public entry fun mint_ibt(
        cap: &mut TreasuryCap<IBT_TOKEN>,
        amount: u64,
        recipient: address,
        ctx: &mut TxContext
    ) {
        coin::mint_and_transfer(cap, amount, recipient, ctx);
    }

    /// ===== BURN =====
    public entry fun burn_ibt(
        cap: &mut TreasuryCap<IBT_TOKEN>,
        coin_to_burn: Coin<IBT_TOKEN>
    ) {
        coin::burn(cap, coin_to_burn);
    }

    /// ===== TRANSFER =====
    public entry fun transfer_ibt(
        coin_to_send: Coin<IBT_TOKEN>,
        recipient: address
    ) {
        transfer::public_transfer(coin_to_send, recipient);
    }
}
