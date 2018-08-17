pragma solidity ^0.4.24;

interface Update {
    function implementationBefore() external view returns (address);
    function implementationAfter() external view returns (address);
    function migrateData() external;
}
