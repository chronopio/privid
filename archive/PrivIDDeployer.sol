// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title PrivIDDeployer - Contract to manage and verify project deployment ownership
/// @notice Demonstrates commitment to accountability and on-chain transparency for OSS tools

contract PrivIDDeployer {
    address private _owner;
    string private _projectName;
    string private _contactInfo;
    bool private _isVerified;

    event ProjectVerified(address indexed verifier, string note);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == _owner, "Caller is not the owner");
        _;
    }

    /// @notice Initializes the deployer record with metadata
    /// @param projectName_ A human-readable name for the project
    /// @param contactInfo_ Contact information (email, ENS, Twitter handle, etc.)
    constructor(string memory projectName_, string memory contactInfo_) {
        _owner = msg.sender;
        _projectName = projectName_;
        _contactInfo = contactInfo_;
        _isVerified = false;
    }

    /// @notice Sets verification status with an optional public note
    /// @param _status True or false
    /// @param note Public text note or hash of verification
    function setVerification(bool _status, string memory note) public onlyOwner {
        _isVerified = _status;
        emit ProjectVerified(msg.sender, note);
    }

    /// @notice Transfers deployer ownership to a new address
    /// @param newOwner The new deployer address
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }

    /// @notice Returns full metadata about the deployer record
    function getMetadata() public view returns (
        address deployer,
        string memory projectName,
        string memory contactInfo,
        bool isVerified
    ) {
        return (_owner, _projectName, _contactInfo, _isVerified);
    }
}
