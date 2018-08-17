//pragma solidity ^0.4.24;
//
//import './KombuchaLib.sol';
//
//contract ProxyData {
//    address internal proxied;
//}
//
//contract Proxy is ProxyData {
//
//    constructor(address _proxied) public payable {
//        proxied = _proxied;
//    }
//
//    function implementation() public view returns (address) {
//        return proxied;
//    }
//    function proxyType() public pure returns (uint256) {
//        return 1; // for "forwarding proxy"
//                  // see EIP 897 for more details
//    }
//
//    function () public payable {
//        bool success = proxied.delegatecall(msg.data);
//        assembly {
//            let freememstart := mload(0x40)
//            returndatacopy(freememstart, 0, returndatasize())
//            switch success
//            case 0 { revert(freememstart, returndatasize()) }
//            default { return(freememstart, returndatasize()) }
//        }
//    }
//}
//
//contract OwnableData {
//    modifier onlyOwner() {
//        require(msg.sender == owner);
//        _;
//    }
//
//    address internal owner;
//
//    constructor(address _owner)
//        public
//    {
//        owner = _owner;
//    }
//}
//
//contract Ownable is OwnableData {
//    function setOwner(address newOwner)
//        public
//        onlyOwner
//    {
//        owner = newOwner;
//    }
//}
//
//interface Update {
//    function implementationBefore() external view returns (address);
//    function implementationAfter() external view returns (address);
//    function migrateData() external;
//}
//
//contract UpdatableProxyData is ProxyData, OwnableData {}
//
//contract UpdatableProxyShared is ProxyData, Ownable {
//    function updateProxied(Update update)
//        public
//        onlyOwner
//    {
//        require(update.implementationBefore() == proxied);
//        proxied = update;
//        Update(this).migrateData();
//        proxied = update.implementationAfter();
//    }
//}
//
//contract UpdatableProxy is Proxy, UpdatableProxyShared {
//    constructor(address proxied, address owner)
//        public
//        Proxy(proxied)
//        OwnableData(owner)
//    {}
//
//    function proxyType() public pure returns (uint256) {
//        return 2; // for "upgradable proxy"
//                  // again, see EIP 897
//    }
//}
//
//contract UpdatableProxyImplementation is UpdatableProxyShared {
//    constructor() public OwnableData(0) {}
//}
//
//contract KombuchaHeader {
//    event FilledKombucha(uint amountAdded, uint newFillAmount);
//    event DrankKombucha(uint amountDrank, uint newFillAmount);
//}
//
//contract KombuchaDataInternal is UpdatableProxyData, KombuchaHeader {
//    uint internal fillAmount;
//    uint internal capacity;
//    string internal flavor;
//}
//
//contract KombuchaData is UpdatableProxyData, KombuchaHeader {
//    event FilledKombucha(uint amountAdded, uint newFillAmount);
//    event DrankKombucha(uint amountDrank, uint newFillAmount);
//
//    uint public fillAmount;
//    uint public capacity;
//    string public flavor;
//}
//
//contract KombuchaProxy is Proxy, KombuchaDataInternal {
//    constructor (address _proxied, address _owner, string _flavor, uint _fillAmount, uint _capacity)
//        public
//        Proxy(_proxied) OwnableData(_owner)
//    {
//        // the body is identical to our original constructor!
//        require(_fillAmount <= _capacity && _capacity > 0);
//        flavor = _flavor;
//        fillAmount = _fillAmount;
//        capacity = _capacity;
//    }
//}
//
//contract Kombucha is UpdatableProxyImplementation, KombuchaData {
//
//    function fill(uint amountToAdd) public {
//        uint newAmount = fillAmount + amountToAdd;
//        require(newAmount > fillAmount && newAmount <= capacity);
//        fillAmount = newAmount;
//        emit FilledKombucha(amountToAdd, newAmount);
//    }
//
//    function drink(uint amountToDrink) public returns (bytes32) {
//        uint newAmount = fillAmount - amountToDrink;
//        require(newAmount < fillAmount);
//        fillAmount = newAmount;
//        emit DrankKombucha(amountToDrink, newAmount);
//        // this mess of hashes just here to pad out the bytecode
//        return keccak256(keccak256(keccak256(keccak256(keccak256(
//            keccak256(keccak256(keccak256(keccak256(keccak256(
//            keccak256(keccak256(keccak256(keccak256(keccak256(
//            keccak256(keccak256(keccak256(keccak256(keccak256(
//            keccak256(keccak256(keccak256(keccak256(keccak256(
//            keccak256(keccak256(keccak256(keccak256(keccak256(
//            keccak256(keccak256(keccak256(keccak256(keccak256(
//            keccak256(keccak256(keccak256(keccak256(keccak256(
//            keccak256(keccak256(keccak256(keccak256(keccak256(
//            keccak256(keccak256(keccak256(keccak256(keccak256(
//                amountToDrink
//            ))))))))))))))))))))))))))))))))))))))))))))))))));
//    }
//}
//
//contract KombuchaFactory {
//
//    Kombucha private masterCopy;
//
//    constructor(Kombucha _masterCopy) public {
//        masterCopy = _masterCopy;
//    }
//
//    function createKombucha(string flavor, uint fillAmount, uint capacity)
//        public
//        returns (Kombucha)
//    {
//        return Kombucha(new KombuchaProxy(masterCopy, msg.sender, flavor, fillAmount, capacity));
//    }
//}
//
//contract Kombucha2DataInternal is KombuchaDataInternal {
//    bool internal capped;
//}
//contract Kombucha2Data is KombuchaData {
//    bool public capped;
//}
//contract Kombucha2Proxy is KombuchaProxy, Kombucha2DataInternal {
//    constructor (address proxied, address owner, string flavor, uint fillAmount, uint capacity)
//        public
//        KombuchaProxy(proxied, owner, flavor, fillAmount, capacity)
//    {
//        capped = true;
//    }
//}
//
//contract Kombucha2 is Kombucha, Kombucha2Data {
//    function uncap() public {
//        require(capped);
//        capped = false;
//    }
//
//    function fill(uint amountToAdd) public {
//        require(!capped);
//        super.fill(amountToAdd);
//    }
//    function drink(uint amountToDrink) public returns (bytes32) {
//        require(!capped);
//        return keccak256(super.drink(amountToDrink));
//    }
//}
//
//contract Kombucha2Update is
//    KombuchaDataInternal,
//    Kombucha2DataInternal,
//    Update
//{
//    Kombucha internal kombucha;
//    Kombucha2 internal kombucha2;
//    constructor(Kombucha _kombucha, Kombucha2 _kombucha2)
//        public
//        OwnableData(0)
//    {
//        kombucha = _kombucha;
//        kombucha2 = _kombucha2;
//    }
//    function implementationBefore() external view returns (address)
//    {
//        return kombucha;
//    }
//
//    function implementationAfter() external view returns (address) {
//        return kombucha2;
//    }
//
//    function migrateData() external {
//        capped = true;
//    }
//}
