pragma solidity ^0.4.24;

/// @title Update
/// @dev Defines an interface that an Updater contract should implement
/// when upgrading contracts.
interface Update {
    function implementationBefore() external view returns (address);
    function implementationAfter() external view returns (address);
    function migrateData() external;
}
