// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./BrokerLibrary.sol";

contract CryptogranaBroker {

    struct Params {
        bytes dataMarket;
        bytes dataPair;
        bytes dataOpType;
    }


    
    function main(Params memory params) external{
        BrokerLibrary.set();
    }

}