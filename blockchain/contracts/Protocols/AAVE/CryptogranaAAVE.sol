// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CryptogranaAAVE {
    error FailToAddSupply(bytes message);
    error FailToWithdraw(bytes message);

    function supplyTokens(
        address pool,
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external {
        bytes memory data = abi.encodeWithSignature(
            "supply(address,uint256,address,uint16)",
            asset,
            amount,
            onBehalfOf,
            referralCode
        );

        (bool ok, bytes memory returnData) = pool.call(data);
        if (!ok) {
            revert FailToAddSupply(returnData);
        }
    }

    function supplyTokensWithPermit(
        address pool,
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode,
        uint256 deadline,
        uint8 permitV,
        bytes32 permitR,
        bytes32 permitS
    ) external {
        bytes memory data = abi.encodeWithSignature(
            "supplyWithPermit(address,uint256,address,uint16,uint256,uint8,bytes32,bytes32)",
            asset,
            amount,
            onBehalfOf,
            referralCode,
            deadline,
            permitV,
            permitR,
            permitS
        );

        (bool ok, bytes memory returnData) = pool.call(data);
        if (!ok) {
            revert FailToAddSupply(returnData);
        }
    }

    function withdrawTokens(
        address pool,
        address asset,
        uint256 amount,
        address to
    ) external {
        bytes memory data = abi.encodeWithSignature(
            "withdraw(address,uint256,address)",
            asset,
            amount,
            to
        );

        (bool ok, bytes memory returnData) = pool.call(data);
        if (!ok) {
            revert FailToWithdraw(returnData);
        }
    }

    function borrowTokens(
        address pool,
        address asset,
        uint256 amount,
        uint256 interestRateMode,
        uint16 referralCode,
        address onBehalfOf
    ) external {
        bytes memory data = abi.encodeWithSignature(
            "borrow(address,uint256,uint256,uint16,address)",
            asset,
            amount,
            interestRateMode,
            referralCode,
            onBehalfOf
        );

        (bool ok, bytes memory returnData) = pool.call(data);
        if (!ok) {
            revert FailToWithdraw(returnData);
        }
    }

    function repayTokens(
        address pool,
        address asset,
        uint256 amount,
        uint256 rateMode,
        address onBehalfOf
    ) external {
        bytes memory data = abi.encodeWithSignature(
            "repay(address,uint256,uint256,address)",
            asset,
            amount,
            rateMode,
            onBehalfOf
        );

        (bool ok, bytes memory returnData) = pool.call(data);
        if (!ok) {
            revert FailToWithdraw(returnData);
        }
    }

    function repayTokensWithPermit(
        address pool,
        address asset,
        uint256 amount,
        uint256 interestRateMode,
        address onBehalfOf,
        uint256 deadline,
        uint8 permitV,
        bytes32 permitR,
        bytes32 permitS
    ) external {
        bytes memory data = abi.encodeWithSignature(
            "repayWithPermit(address,uint256,uint256,address,uint256,uint8,bytes32,bytes32)",
            asset,
            amount,
            interestRateMode,
            onBehalfOf,
            deadline,
            permitV,
            permitR,
            permitS
        );

        (bool ok, bytes memory returnData) = pool.call(data);
        if (!ok) {
            revert FailToWithdraw(returnData);
        }
    }

    function repayTokensWithATokens(
        address pool, address asset,uint256 amount,uint256 interestRateMode
    ) external {
        bytes memory data = abi.encodeWithSignature(
            "repayWithATokens(address,uint256,uint256)",
            asset,
            amount,
            interestRateMode
        );

        (bool ok, bytes memory returnData) = pool.call(data);
        if (!ok) {
            revert FailToWithdraw(returnData);
        }
    }

    function swapBorrowRateMode(address pool, address asset, uint256 interestRateMode) external {
    
    bytes memory data = abi.encodeWithSignature(
            "swapBorrowRateMode(address,uint256)",
            asset,
            interestRateMode
        );

        (bool ok, bytes memory returnData) = pool.call(data);
        if (!ok) {
            revert FailToWithdraw(returnData);
        }
    }

    function rebalanceStableBorrowRate(address pool, address asset, address user) external {
        bytes memory data = abi.encodeWithSignature(
            "rebalanceStableBorrowRate(address,address)",
            asset,
            user
        );

        (bool ok, bytes memory returnData) = pool.call(data);
        if (!ok) {
            revert FailToWithdraw(returnData);
        }
    }

    function setUserUseReserveAsCollateral(address pool, address asset, bool useAsCollateral)
        external
    {
        bytes memory data = abi.encodeWithSignature(
            "setUserUseReserveAsCollateral(address,bool)",
            asset,
            useAsCollateral
        );

        (bool ok, bytes memory returnData) = pool.call(data);
        if (!ok) {
            revert FailToWithdraw(returnData);
        }
    }

   function mintToTreasury(address pool, address[] calldata assets) external {

        bytes memory data = abi.encodeWithSignature(
            "mintToTreasury(address[])",
            assets
        );

        (bool ok, bytes memory returnData) = pool.call(data);
        if (!ok) {
            revert FailToWithdraw(returnData);
        } 
   }

}
