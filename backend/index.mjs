import { handleMintOnSui } from "./utils/mintSui.mts";
import { handleMintOnEth } from "./utils/mintEth.ts";

await handleMintOnSui(
  "0xdc01866926ef19a647c953925ff2cf2f63d5d52a522148726ed7010c215ffc36",
  100n
);

await handleMintOnEth(
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  100n
);
