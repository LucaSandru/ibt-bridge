// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract IBT is ERC20, Ownable {

    /// Event used by your backend to detect bridging intent
    event BridgeBurn(
        address indexed user,
        uint256 amount,
        string toChain,
        string toAddress
    );

    constructor() ERC20("IBT", "IBT") Ownable(msg.sender) {}

    /// Only deployer can mint (teacher requirement)
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /// User burns his tokens → backend listens → mint on Sui
    function burn(
        uint256 amount,
        string memory toChain,
        string memory toAddress
    ) external {
        _burn(msg.sender, amount);

        emit BridgeBurn(msg.sender, amount, toChain, toAddress);
    }
}
