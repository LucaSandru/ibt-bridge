// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/IBTToken.sol";

contract DeployIBT is Script {
    function run() external {
        vm.startBroadcast();

        IBT token = new IBT();

        vm.stopBroadcast();
    }
}
