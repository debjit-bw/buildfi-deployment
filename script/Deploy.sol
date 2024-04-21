// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";
import {IRiscZeroVerifier} from "risc0/IRiscZeroVerifier.sol";
import {ControlID, RiscZeroGroth16Verifier} from "risc0/groth16/RiscZeroGroth16Verifier.sol";
import {BuildFi} from "../src/BuildFi.sol";
import {IspTest} from "../src/IspTest.sol";

contract CounterScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerKey = uint256(vm.envBytes32("ETH_WALLET_PRIVATE_KEY"));
        vm.startBroadcast(deployerKey);
        address SIGN_DEPLOYED_ADDRESS = address(
            0x4e4af2a21ebf62850fD99Eb6253E1eFBb56098cD
        );

        console2.log("Control ids:", ControlID.CONTROL_ID_0, ControlID.CONTROL_ID_1);
        IRiscZeroVerifier verifier = new RiscZeroGroth16Verifier(
            ControlID.CONTROL_ID_0,
            ControlID.CONTROL_ID_1
        );
        console2.log("Deployed RiscZeroGroth16Verifier to", address(verifier));

        // BuildFi buildFi = new BuildFi(
        //     bytes32(
        //         0xaceac4faee5f55dde55fcc4e922317a3a74017b952b4c305e36eaae412b52bf5
        //     ),
        //     verifier,
        //     SIGN_DEPLOYED_ADDRESS
        // );
        // console2.log("Deployed BuildFi to", address(buildFi));
        // MAIN DEPLOYMENT ENDS

        BuildFi buildFi = new BuildFi(
            bytes32(
                0xaceac4faee5f55dde55fcc4e922317a3a74017b952b4c305e36eaae412b52bf5
            ),
            verifier,
            SIGN_DEPLOYED_ADDRESS
        );
        console2.log("Deployed BuildFi to", address(buildFi));

        // ## ## IspTest
        // IspTest ispTest = new IspTest(SIGN_DEPLOYED_ADDRESS);
        // console2.log("Deployed IspTest to", address(ispTest));

        vm.stopBroadcast();
    }
}
