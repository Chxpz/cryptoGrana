// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./aave-contracts/interfaces/IFlashLoanSimpleReceiver.sol";

interface IERC20{
    function balanceOf(address account) external view returns (uint256);
}

interface IAAVEFlashLoan {

    function flashLoanSimple(
        address receiverAddress,
        address asset,
        uint256 amount,
        bytes calldata params,
        uint16 referralCode
    ) external;
}

contract Broker is IFlashLoanSimpleReceiver {

    function callFlashLoanSimple(
        address poolAddress,
        address asset,
        uint256 amount,
        bytes calldata params,
        uint16 referralCode
    ) external {
        IAAVEFlashLoan aave = IAAVEFlashLoan(poolAddress);
        aave.flashLoanSimple(
            address(this),
            asset,
            amount,
            params,
            referralCode
        );
    }

   function executeOperation(
    address asset,
    uint256 amount,
    uint256 premium,
    address initiator,
    bytes calldata params
  ) external returns (bool){
    uint256 balance = IERC20(asset).balanceOf(address(this));

    // do the logic
  }

  function ADDRESSES_PROVIDER() external view returns (IPoolAddressesProvider){

  }

  function POOL() external view returns (IPool){

  }
}
