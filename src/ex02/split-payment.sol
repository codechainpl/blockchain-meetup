pragma solidity ^0.4.21;

contract SplitPayment {
    address public acc0 = 0x0091f85D04b8e58421a696884444fb104746E115; //marcinm
    address public acc1 = 0x00cECe5F6427267Cb601001b65BdF0E1F7D90986; //marintest
    // address public acc1 = 0x00a88fC3B3A86793De59c886e20B320A057a5723; //devmeetings
    uint256 public value;

    function pay() payable public {
        value = msg.value;
        acc0.transfer(value/2);
        acc1.transfer(value/2);
    }
}
