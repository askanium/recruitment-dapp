const companyFactoryAbi = {
  "contractName": "CompanyFactory",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "companies",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_masterCopy",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_address",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_name",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "_timestamp",
          "type": "uint256"
        }
      ],
      "name": "CompanyCreated",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "createCompany",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getNrOfCompanies",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b50604051602080610bb68339810180604052810190808051906020019092919050505080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050610b32806100846000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632813d19d1461005c5780633efae350146100c9578063f14513f2146100f4575b600080fd5b34801561006857600080fd5b50610087600480360381019080803590602001909291905050506101e3565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156100d557600080fd5b506100de610221565b6040518082815260200191505060405180910390f35b34801561010057600080fd5b506101a1600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919291929050505061022d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000818154811015156101f257fe5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008080549050905090565b600080600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1633858561025e610506565b808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018060200180602001838103835285818151815260200191508051906020019080838360005b838110156103035780820151818401526020810190506102e8565b50505050905090810190601f1680156103305780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b8381101561036957808201518184015260208101905061034e565b50505050905090810190601f1680156103965780820380516001836020036101000a031916815260200191505b509650505050505050604051809103906000f0801580156103bb573d6000803e3d6000fd5b50905060008190806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550507f0b79b070cca3f7526581a0021b06b7f15820831124863b99e122dde9e6255a46818542604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001838152602001828103825284818151815260200191508051906020019080838360005b838110156104c05780820151818401526020810190506104a5565b50505050905090810190601f1680156104ed5780820380516001836020036101000a031916815260200191505b5094505050505060405180910390a18091505092915050565b6040516105f080610517833901905600608060405234801561001057600080fd5b506040516105f03803806105f0833981018060405281019080805190602001909291908051906020019092919080518201929190602001805182019291905050508284806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505060208273__UtilsLib______________________________631bc155b1909160016040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200183151515158152602001828103825284818151815260200191508051906020019080838360005b8381101561016c578082015181840152602081019050610151565b50505050905090810190601f1680156101995780820380516001836020036101000a031916815260200191505b50935050505060206040518083038186803b1580156101b757600080fd5b505af41580156101cb573d6000803e3d6000fd5b505050506040513d60208110156101e157600080fd5b81019080805190602001909291905050501115801561031a5750602e8173__UtilsLib______________________________631bc155b1909160016040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200183151515158152602001828103825284818151815260200191508051906020019080838360005b83811015610291578082015181840152602081019050610276565b50505050905090810190601f1680156102be5780820380516001836020036101000a031916815260200191505b50935050505060206040518083038186803b1580156102dc57600080fd5b505af41580156102f0573d6000803e3d6000fd5b505050506040513d602081101561030657600080fd5b810190808051906020019092919050505011155b151561032557600080fd5b816003908051906020019061033b929190610396565b508060049080519060200190610352929190610396565b506000600260006101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff1602179055505050505061043b565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106103d757805160ff1916838001178555610405565b82800160010185558215610405579182015b828111156104045782518255916020019190600101906103e9565b5b5090506104129190610416565b5090565b61043891905b8082111561043457600081600090555060010161041c565b5090565b90565b6101a68061044a6000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680634555d5c9146100c65780635c60da1b146100f1575b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660003660405180838380828437820191505092505050600060405180830381855af491505090506040513d6000823e81600081146100c2573d82f35b3d82fd5b3480156100d257600080fd5b506100db610148565b6040518082815260200191505060405180910390f35b3480156100fd57600080fd5b50610106610151565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60006001905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050905600a165627a7a72305820941384b464d39a03dd366e2fb4287ee11675d6a11ccac2c5f54f947c3d0203db0029a165627a7a7230582048139387686cecdd4dc048ff430b8c5899724c5033fe61945cbf62aa622731120029",
  "deployedBytecode": "0x608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632813d19d1461005c5780633efae350146100c9578063f14513f2146100f4575b600080fd5b34801561006857600080fd5b50610087600480360381019080803590602001909291905050506101e3565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156100d557600080fd5b506100de610221565b6040518082815260200191505060405180910390f35b34801561010057600080fd5b506101a1600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919291929050505061022d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000818154811015156101f257fe5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008080549050905090565b600080600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1633858561025e610506565b808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018060200180602001838103835285818151815260200191508051906020019080838360005b838110156103035780820151818401526020810190506102e8565b50505050905090810190601f1680156103305780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b8381101561036957808201518184015260208101905061034e565b50505050905090810190601f1680156103965780820380516001836020036101000a031916815260200191505b509650505050505050604051809103906000f0801580156103bb573d6000803e3d6000fd5b50905060008190806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550507f0b79b070cca3f7526581a0021b06b7f15820831124863b99e122dde9e6255a46818542604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001838152602001828103825284818151815260200191508051906020019080838360005b838110156104c05780820151818401526020810190506104a5565b50505050905090810190601f1680156104ed5780820380516001836020036101000a031916815260200191505b5094505050505060405180910390a18091505092915050565b6040516105f080610517833901905600608060405234801561001057600080fd5b506040516105f03803806105f0833981018060405281019080805190602001909291908051906020019092919080518201929190602001805182019291905050508284806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505060208273__UtilsLib______________________________631bc155b1909160016040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200183151515158152602001828103825284818151815260200191508051906020019080838360005b8381101561016c578082015181840152602081019050610151565b50505050905090810190601f1680156101995780820380516001836020036101000a031916815260200191505b50935050505060206040518083038186803b1580156101b757600080fd5b505af41580156101cb573d6000803e3d6000fd5b505050506040513d60208110156101e157600080fd5b81019080805190602001909291905050501115801561031a5750602e8173__UtilsLib______________________________631bc155b1909160016040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200183151515158152602001828103825284818151815260200191508051906020019080838360005b83811015610291578082015181840152602081019050610276565b50505050905090810190601f1680156102be5780820380516001836020036101000a031916815260200191505b50935050505060206040518083038186803b1580156102dc57600080fd5b505af41580156102f0573d6000803e3d6000fd5b505050506040513d602081101561030657600080fd5b810190808051906020019092919050505011155b151561032557600080fd5b816003908051906020019061033b929190610396565b508060049080519060200190610352929190610396565b506000600260006101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff1602179055505050505061043b565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106103d757805160ff1916838001178555610405565b82800160010185558215610405579182015b828111156104045782518255916020019190600101906103e9565b5b5090506104129190610416565b5090565b61043891905b8082111561043457600081600090555060010161041c565b5090565b90565b6101a68061044a6000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680634555d5c9146100c65780635c60da1b146100f1575b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660003660405180838380828437820191505092505050600060405180830381855af491505090506040513d6000823e81600081146100c2573d82f35b3d82fd5b3480156100d257600080fd5b506100db610148565b6040518082815260200191505060405180910390f35b3480156100fd57600080fd5b50610106610151565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60006001905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050905600a165627a7a72305820941384b464d39a03dd366e2fb4287ee11675d6a11ccac2c5f54f947c3d0203db0029a165627a7a7230582048139387686cecdd4dc048ff430b8c5899724c5033fe61945cbf62aa622731120029",
  "sourceMap": "81:811:5:-;;;323:81;8:9:-1;5:2;;;30:1;27;20:12;5:2;323:81:5;;;;;;;;;;;;;;;;;;;;;;;;;;;;;386:11;373:10;;:24;;;;;;;;;;;;;;;;;;323:81;81:811;;;;;;",
  "deployedSourceMap": "81:811:5:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;182:26;;8:9:-1;5:2;;;30:1;27;20:12;5:2;182:26:5;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;767:123;;8:9:-1;5:2;;;30:1;27;20:12;5:2;767:123:5;;;;;;;;;;;;;;;;;;;;;;;410:351;;8:9:-1;5:2;;;30:1;27;20:12;5:2;410:351:5;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;182:26;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;767:123::-;840:4;867:9;:16;;;;860:23;;767:123;:::o;410:351::-;519:7;542:15;585:10;;;;;;;;;;;597;609:5;616:9;568:58;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;568:58:5;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;568:58:5;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;568:58:5;542:85;;637:9;660:7;637:32;;39:1:-1;33:3;27:10;23:18;57:10;52:3;45:23;79:10;72:17;;0:93;637:32:5;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;685:44;708:7;718:5;725:3;685:44;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;685:44:5;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;747:7;740:14;;410:351;;;;;:::o;81:811::-;;;;;;;;;;:::o",
  "source": "pragma solidity ^0.4.24;\n\nimport './Company.sol';\nimport './CompanyProxy.sol';\n\n\ncontract CompanyFactory {\n\n    // TODO upon selfdestructing a company, remove it from the array.\n    address[] public companies;\n    Company private masterCopy;\n\n    event CompanyCreated(address _address, string _name, uint _timestamp);\n\n    constructor(Company _masterCopy) public {\n        masterCopy = _masterCopy;\n    }\n\n    function createCompany(\n        string _name,\n        string _ipfsHash\n    )\n        public\n        returns (Company)\n    {\n        Company company = Company(new CompanyProxy(masterCopy, msg.sender, _name, _ipfsHash));\n        companies.push(address(company));\n\n        emit CompanyCreated(address(company), _name, now);\n\n        return company;\n    }\n\n    function getNrOfCompanies()\n        public\n        view\n        returns (uint)\n    {\n        return companies.length;\n    }\n}",
  "sourcePath": "/media/iulian/Work/Learning/Blockchain/ConsenSysAcademy/FinalProject/recruitment-dapp/backend/contracts/CompanyFactory.sol",
  "ast": {
    "absolutePath": "/media/iulian/Work/Learning/Blockchain/ConsenSysAcademy/FinalProject/recruitment-dapp/backend/contracts/CompanyFactory.sol",
    "exportedSymbols": {
      "CompanyFactory": [
        659
      ]
    },
    "id": 660,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 583,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:5"
      },
      {
        "absolutePath": "/media/iulian/Work/Learning/Blockchain/ConsenSysAcademy/FinalProject/recruitment-dapp/backend/contracts/Company.sol",
        "file": "./Company.sol",
        "id": 584,
        "nodeType": "ImportDirective",
        "scope": 660,
        "sourceUnit": 456,
        "src": "26:23:5",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/media/iulian/Work/Learning/Blockchain/ConsenSysAcademy/FinalProject/recruitment-dapp/backend/contracts/CompanyProxy.sol",
        "file": "./CompanyProxy.sol",
        "id": 585,
        "nodeType": "ImportDirective",
        "scope": 660,
        "sourceUnit": 785,
        "src": "50:28:5",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [
          784
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 659,
        "linearizedBaseContracts": [
          659
        ],
        "name": "CompanyFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 588,
            "name": "companies",
            "nodeType": "VariableDeclaration",
            "scope": 659,
            "src": "182:26:5",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_array$_t_address_$dyn_storage",
              "typeString": "address[]"
            },
            "typeName": {
              "baseType": {
                "id": 586,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "182:7:5",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "id": 587,
              "length": null,
              "nodeType": "ArrayTypeName",
              "src": "182:9:5",
              "typeDescriptions": {
                "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                "typeString": "address[]"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 590,
            "name": "masterCopy",
            "nodeType": "VariableDeclaration",
            "scope": 659,
            "src": "214:26:5",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_contract$_Company_$455",
              "typeString": "contract Company"
            },
            "typeName": {
              "contractScope": null,
              "id": 589,
              "name": "Company",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 455,
              "src": "214:7:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Company_$455",
                "typeString": "contract Company"
              }
            },
            "value": null,
            "visibility": "private"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 598,
            "name": "CompanyCreated",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 597,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 592,
                  "indexed": false,
                  "name": "_address",
                  "nodeType": "VariableDeclaration",
                  "scope": 598,
                  "src": "268:16:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 591,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "268:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 594,
                  "indexed": false,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 598,
                  "src": "286:12:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 593,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "286:6:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 596,
                  "indexed": false,
                  "name": "_timestamp",
                  "nodeType": "VariableDeclaration",
                  "scope": 598,
                  "src": "300:15:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 595,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "300:4:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "267:49:5"
            },
            "src": "247:70:5"
          },
          {
            "body": {
              "id": 607,
              "nodeType": "Block",
              "src": "363:41:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 605,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 603,
                      "name": "masterCopy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 590,
                      "src": "373:10:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Company_$455",
                        "typeString": "contract Company"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 604,
                      "name": "_masterCopy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 600,
                      "src": "386:11:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Company_$455",
                        "typeString": "contract Company"
                      }
                    },
                    "src": "373:24:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Company_$455",
                      "typeString": "contract Company"
                    }
                  },
                  "id": 606,
                  "nodeType": "ExpressionStatement",
                  "src": "373:24:5"
                }
              ]
            },
            "documentation": null,
            "id": 608,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 601,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 600,
                  "name": "_masterCopy",
                  "nodeType": "VariableDeclaration",
                  "scope": 608,
                  "src": "335:19:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_contract$_Company_$455",
                    "typeString": "contract Company"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 599,
                    "name": "Company",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 455,
                    "src": "335:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Company_$455",
                      "typeString": "contract Company"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "334:21:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 602,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "363:0:5"
            },
            "scope": 659,
            "src": "323:81:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 648,
              "nodeType": "Block",
              "src": "532:229:5",
              "statements": [
                {
                  "assignments": [
                    618
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 618,
                      "name": "company",
                      "nodeType": "VariableDeclaration",
                      "scope": 649,
                      "src": "542:15:5",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Company_$455",
                        "typeString": "contract Company"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 617,
                        "name": "Company",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 455,
                        "src": "542:7:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_Company_$455",
                          "typeString": "contract Company"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 629,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 622,
                            "name": "masterCopy",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 590,
                            "src": "585:10:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_Company_$455",
                              "typeString": "contract Company"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 623,
                              "name": "msg",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1149,
                              "src": "597:3:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_magic_message",
                                "typeString": "msg"
                              }
                            },
                            "id": 624,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "sender",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": null,
                            "src": "597:10:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 625,
                            "name": "_name",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 610,
                            "src": "609:5:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_string_memory_ptr",
                              "typeString": "string memory"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 626,
                            "name": "_ipfsHash",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 612,
                            "src": "616:9:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_string_memory_ptr",
                              "typeString": "string memory"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_contract$_Company_$455",
                              "typeString": "contract Company"
                            },
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            {
                              "typeIdentifier": "t_string_memory_ptr",
                              "typeString": "string memory"
                            },
                            {
                              "typeIdentifier": "t_string_memory_ptr",
                              "typeString": "string memory"
                            }
                          ],
                          "id": 621,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "NewExpression",
                          "src": "568:16:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_creation_nonpayable$_t_address_$_t_address_$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$_t_contract$_CompanyProxy_$784_$",
                            "typeString": "function (address,address,string memory,string memory) returns (contract CompanyProxy)"
                          },
                          "typeName": {
                            "contractScope": null,
                            "id": 620,
                            "name": "CompanyProxy",
                            "nodeType": "UserDefinedTypeName",
                            "referencedDeclaration": 784,
                            "src": "572:12:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_CompanyProxy_$784",
                              "typeString": "contract CompanyProxy"
                            }
                          }
                        },
                        "id": 627,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "568:58:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_CompanyProxy_$784",
                          "typeString": "contract CompanyProxy"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_contract$_CompanyProxy_$784",
                          "typeString": "contract CompanyProxy"
                        }
                      ],
                      "id": 619,
                      "name": "Company",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 455,
                      "src": "560:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_contract$_Company_$455_$",
                        "typeString": "type(contract Company)"
                      }
                    },
                    "id": 628,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "560:67:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Company_$455",
                      "typeString": "contract Company"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "542:85:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 634,
                            "name": "company",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 618,
                            "src": "660:7:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_Company_$455",
                              "typeString": "contract Company"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_contract$_Company_$455",
                              "typeString": "contract Company"
                            }
                          ],
                          "id": 633,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "nodeType": "ElementaryTypeNameExpression",
                          "src": "652:7:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_address_$",
                            "typeString": "type(address)"
                          },
                          "typeName": "address"
                        },
                        "id": 635,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "652:16:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 630,
                        "name": "companies",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 588,
                        "src": "637:9:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 632,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "637:14:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 636,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "637:32:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 637,
                  "nodeType": "ExpressionStatement",
                  "src": "637:32:5"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 640,
                            "name": "company",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 618,
                            "src": "708:7:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_Company_$455",
                              "typeString": "contract Company"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_contract$_Company_$455",
                              "typeString": "contract Company"
                            }
                          ],
                          "id": 639,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "nodeType": "ElementaryTypeNameExpression",
                          "src": "700:7:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_address_$",
                            "typeString": "type(address)"
                          },
                          "typeName": "address"
                        },
                        "id": 641,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "700:16:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 642,
                        "name": "_name",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 610,
                        "src": "718:5:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory_ptr",
                          "typeString": "string memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 643,
                        "name": "now",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1151,
                        "src": "725:3:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_string_memory_ptr",
                          "typeString": "string memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 638,
                      "name": "CompanyCreated",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 598,
                      "src": "685:14:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_string_memory_ptr_$_t_uint256_$returns$__$",
                        "typeString": "function (address,string memory,uint256)"
                      }
                    },
                    "id": 644,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "685:44:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 645,
                  "nodeType": "EmitStatement",
                  "src": "680:49:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 646,
                    "name": "company",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 618,
                    "src": "747:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Company_$455",
                      "typeString": "contract Company"
                    }
                  },
                  "functionReturnParameters": 616,
                  "id": 647,
                  "nodeType": "Return",
                  "src": "740:14:5"
                }
              ]
            },
            "documentation": null,
            "id": 649,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "createCompany",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 613,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 610,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 649,
                  "src": "442:12:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 609,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "442:6:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 612,
                  "name": "_ipfsHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 649,
                  "src": "464:16:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 611,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "464:6:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "432:54:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 616,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 615,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 649,
                  "src": "519:7:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_contract$_Company_$455",
                    "typeString": "contract Company"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 614,
                    "name": "Company",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 455,
                    "src": "519:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Company_$455",
                      "typeString": "contract Company"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "518:9:5"
            },
            "scope": 659,
            "src": "410:351:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 657,
              "nodeType": "Block",
              "src": "850:40:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 654,
                      "name": "companies",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 588,
                      "src": "867:9:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$dyn_storage",
                        "typeString": "address[] storage ref"
                      }
                    },
                    "id": 655,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "length",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": null,
                    "src": "867:16:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 653,
                  "id": 656,
                  "nodeType": "Return",
                  "src": "860:23:5"
                }
              ]
            },
            "documentation": null,
            "id": 658,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getNrOfCompanies",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 650,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "792:2:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 653,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 652,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 658,
                  "src": "840:4:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 651,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "840:4:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "839:6:5"
            },
            "scope": 659,
            "src": "767:123:5",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 660,
        "src": "81:811:5"
      }
    ],
    "src": "0:892:5"
  },
  "legacyAST": {
    "absolutePath": "/media/iulian/Work/Learning/Blockchain/ConsenSysAcademy/FinalProject/recruitment-dapp/backend/contracts/CompanyFactory.sol",
    "exportedSymbols": {
      "CompanyFactory": [
        659
      ]
    },
    "id": 660,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 583,
        "literals": [
          "solidity",
          "^",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:24:5"
      },
      {
        "absolutePath": "/media/iulian/Work/Learning/Blockchain/ConsenSysAcademy/FinalProject/recruitment-dapp/backend/contracts/Company.sol",
        "file": "./Company.sol",
        "id": 584,
        "nodeType": "ImportDirective",
        "scope": 660,
        "sourceUnit": 456,
        "src": "26:23:5",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/media/iulian/Work/Learning/Blockchain/ConsenSysAcademy/FinalProject/recruitment-dapp/backend/contracts/CompanyProxy.sol",
        "file": "./CompanyProxy.sol",
        "id": 585,
        "nodeType": "ImportDirective",
        "scope": 660,
        "sourceUnit": 785,
        "src": "50:28:5",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [],
        "contractDependencies": [
          784
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 659,
        "linearizedBaseContracts": [
          659
        ],
        "name": "CompanyFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 588,
            "name": "companies",
            "nodeType": "VariableDeclaration",
            "scope": 659,
            "src": "182:26:5",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_array$_t_address_$dyn_storage",
              "typeString": "address[]"
            },
            "typeName": {
              "baseType": {
                "id": 586,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "182:7:5",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "id": 587,
              "length": null,
              "nodeType": "ArrayTypeName",
              "src": "182:9:5",
              "typeDescriptions": {
                "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                "typeString": "address[]"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 590,
            "name": "masterCopy",
            "nodeType": "VariableDeclaration",
            "scope": 659,
            "src": "214:26:5",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_contract$_Company_$455",
              "typeString": "contract Company"
            },
            "typeName": {
              "contractScope": null,
              "id": 589,
              "name": "Company",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 455,
              "src": "214:7:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Company_$455",
                "typeString": "contract Company"
              }
            },
            "value": null,
            "visibility": "private"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 598,
            "name": "CompanyCreated",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 597,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 592,
                  "indexed": false,
                  "name": "_address",
                  "nodeType": "VariableDeclaration",
                  "scope": 598,
                  "src": "268:16:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 591,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "268:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 594,
                  "indexed": false,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 598,
                  "src": "286:12:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 593,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "286:6:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 596,
                  "indexed": false,
                  "name": "_timestamp",
                  "nodeType": "VariableDeclaration",
                  "scope": 598,
                  "src": "300:15:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 595,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "300:4:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "267:49:5"
            },
            "src": "247:70:5"
          },
          {
            "body": {
              "id": 607,
              "nodeType": "Block",
              "src": "363:41:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 605,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 603,
                      "name": "masterCopy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 590,
                      "src": "373:10:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Company_$455",
                        "typeString": "contract Company"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 604,
                      "name": "_masterCopy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 600,
                      "src": "386:11:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Company_$455",
                        "typeString": "contract Company"
                      }
                    },
                    "src": "373:24:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Company_$455",
                      "typeString": "contract Company"
                    }
                  },
                  "id": 606,
                  "nodeType": "ExpressionStatement",
                  "src": "373:24:5"
                }
              ]
            },
            "documentation": null,
            "id": 608,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 601,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 600,
                  "name": "_masterCopy",
                  "nodeType": "VariableDeclaration",
                  "scope": 608,
                  "src": "335:19:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_contract$_Company_$455",
                    "typeString": "contract Company"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 599,
                    "name": "Company",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 455,
                    "src": "335:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Company_$455",
                      "typeString": "contract Company"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "334:21:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 602,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "363:0:5"
            },
            "scope": 659,
            "src": "323:81:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 648,
              "nodeType": "Block",
              "src": "532:229:5",
              "statements": [
                {
                  "assignments": [
                    618
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 618,
                      "name": "company",
                      "nodeType": "VariableDeclaration",
                      "scope": 649,
                      "src": "542:15:5",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Company_$455",
                        "typeString": "contract Company"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 617,
                        "name": "Company",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 455,
                        "src": "542:7:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_Company_$455",
                          "typeString": "contract Company"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 629,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 622,
                            "name": "masterCopy",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 590,
                            "src": "585:10:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_Company_$455",
                              "typeString": "contract Company"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 623,
                              "name": "msg",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1149,
                              "src": "597:3:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_magic_message",
                                "typeString": "msg"
                              }
                            },
                            "id": 624,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "sender",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": null,
                            "src": "597:10:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 625,
                            "name": "_name",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 610,
                            "src": "609:5:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_string_memory_ptr",
                              "typeString": "string memory"
                            }
                          },
                          {
                            "argumentTypes": null,
                            "id": 626,
                            "name": "_ipfsHash",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 612,
                            "src": "616:9:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_string_memory_ptr",
                              "typeString": "string memory"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_contract$_Company_$455",
                              "typeString": "contract Company"
                            },
                            {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            },
                            {
                              "typeIdentifier": "t_string_memory_ptr",
                              "typeString": "string memory"
                            },
                            {
                              "typeIdentifier": "t_string_memory_ptr",
                              "typeString": "string memory"
                            }
                          ],
                          "id": 621,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "NewExpression",
                          "src": "568:16:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_creation_nonpayable$_t_address_$_t_address_$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$_t_contract$_CompanyProxy_$784_$",
                            "typeString": "function (address,address,string memory,string memory) returns (contract CompanyProxy)"
                          },
                          "typeName": {
                            "contractScope": null,
                            "id": 620,
                            "name": "CompanyProxy",
                            "nodeType": "UserDefinedTypeName",
                            "referencedDeclaration": 784,
                            "src": "572:12:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_CompanyProxy_$784",
                              "typeString": "contract CompanyProxy"
                            }
                          }
                        },
                        "id": 627,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "568:58:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_CompanyProxy_$784",
                          "typeString": "contract CompanyProxy"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_contract$_CompanyProxy_$784",
                          "typeString": "contract CompanyProxy"
                        }
                      ],
                      "id": 619,
                      "name": "Company",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 455,
                      "src": "560:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_contract$_Company_$455_$",
                        "typeString": "type(contract Company)"
                      }
                    },
                    "id": 628,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "560:67:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Company_$455",
                      "typeString": "contract Company"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "542:85:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 634,
                            "name": "company",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 618,
                            "src": "660:7:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_Company_$455",
                              "typeString": "contract Company"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_contract$_Company_$455",
                              "typeString": "contract Company"
                            }
                          ],
                          "id": 633,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "nodeType": "ElementaryTypeNameExpression",
                          "src": "652:7:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_address_$",
                            "typeString": "type(address)"
                          },
                          "typeName": "address"
                        },
                        "id": 635,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "652:16:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 630,
                        "name": "companies",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 588,
                        "src": "637:9:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 632,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "637:14:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 636,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "637:32:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 637,
                  "nodeType": "ExpressionStatement",
                  "src": "637:32:5"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "id": 640,
                            "name": "company",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 618,
                            "src": "708:7:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_contract$_Company_$455",
                              "typeString": "contract Company"
                            }
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_contract$_Company_$455",
                              "typeString": "contract Company"
                            }
                          ],
                          "id": 639,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "nodeType": "ElementaryTypeNameExpression",
                          "src": "700:7:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_address_$",
                            "typeString": "type(address)"
                          },
                          "typeName": "address"
                        },
                        "id": 641,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "700:16:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 642,
                        "name": "_name",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 610,
                        "src": "718:5:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory_ptr",
                          "typeString": "string memory"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 643,
                        "name": "now",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1151,
                        "src": "725:3:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_string_memory_ptr",
                          "typeString": "string memory"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 638,
                      "name": "CompanyCreated",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 598,
                      "src": "685:14:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_string_memory_ptr_$_t_uint256_$returns$__$",
                        "typeString": "function (address,string memory,uint256)"
                      }
                    },
                    "id": 644,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "685:44:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 645,
                  "nodeType": "EmitStatement",
                  "src": "680:49:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 646,
                    "name": "company",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 618,
                    "src": "747:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Company_$455",
                      "typeString": "contract Company"
                    }
                  },
                  "functionReturnParameters": 616,
                  "id": 647,
                  "nodeType": "Return",
                  "src": "740:14:5"
                }
              ]
            },
            "documentation": null,
            "id": 649,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "createCompany",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 613,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 610,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 649,
                  "src": "442:12:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 609,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "442:6:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 612,
                  "name": "_ipfsHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 649,
                  "src": "464:16:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 611,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "464:6:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "432:54:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 616,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 615,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 649,
                  "src": "519:7:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_contract$_Company_$455",
                    "typeString": "contract Company"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 614,
                    "name": "Company",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 455,
                    "src": "519:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Company_$455",
                      "typeString": "contract Company"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "518:9:5"
            },
            "scope": 659,
            "src": "410:351:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 657,
              "nodeType": "Block",
              "src": "850:40:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 654,
                      "name": "companies",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 588,
                      "src": "867:9:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$dyn_storage",
                        "typeString": "address[] storage ref"
                      }
                    },
                    "id": 655,
                    "isConstant": false,
                    "isLValue": true,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "length",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": null,
                    "src": "867:16:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "functionReturnParameters": 653,
                  "id": 656,
                  "nodeType": "Return",
                  "src": "860:23:5"
                }
              ]
            },
            "documentation": null,
            "id": 658,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getNrOfCompanies",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 650,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "792:2:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 653,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 652,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 658,
                  "src": "840:4:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 651,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "840:4:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "839:6:5"
            },
            "scope": 659,
            "src": "767:123:5",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 660,
        "src": "81:811:5"
      }
    ],
    "src": "0:892:5"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {
    "1532716367364": {
      "events": {},
      "links": {
        "UtilsLib": "0x854d01465b83d2f9254e24bbaa1d082739816516"
      },
      "address": "0x88675e76677240177c09e36b6afd464a3a6303f4",
      "transactionHash": "0x28105ced5c172bb30c1d15845aa8b54a4a377a9d7a16ae6fd4ca4ba5ec2aafd9"
    },
    "1532718443166": {
      "events": {},
      "links": {
        "UtilsLib": "0xf101907a37bc8766408367675384a792d661ee15"
      },
      "address": "0x654045800507ae186333300399e21275dadb445f",
      "transactionHash": "0x62ad48b2736507356b764a53233986fd7a8dcc80224c3a6ea77695d06eeb7af1"
    },
    "1532784246865": {
      "events": {},
      "links": {
        "UtilsLib": "0xa724efa810f94536b7168c38fcfe78b841434fc7"
      },
      "address": "0x6b8b2c5e4e7e446d9c980579553231966d60f06f",
      "transactionHash": "0x7a0daa26dcaeffcc70b1a3b2c2492fecb235d71ab61007159148db5005394393"
    },
    "1532870996616": {
      "events": {},
      "links": {
        "UtilsLib": "0x0ab23b6f2a1e34ec1baac3949cff8bba24ba65ba"
      },
      "address": "0xd217493f6b4738030c197e01db192ffcabeb1a7b",
      "transactionHash": "0xfcee2d4dcd2e74c07d28c3c8d27d842a5c3da6f3fc6b2fec8f73dc90fc75a36b"
    },
    "1532968310642": {
      "events": {},
      "links": {
        "UtilsLib": "0xfeb597696479b6a67a5da7f7b7538989a429549b"
      },
      "address": "0xfdc1111c9f1dd393384203931c8285de5647151f",
      "transactionHash": "0x738f9ad411b19603451c96b6c71d962de23867607bb09a362aa66b2c6b05db7b"
    },
    "1532975021116": {
      "events": {},
      "links": {
        "UtilsLib": "0xfeb597696479b6a67a5da7f7b7538989a429549b"
      },
      "address": "0xfdc1111c9f1dd393384203931c8285de5647151f",
      "transactionHash": "0x546fdc9935e2cfb0d7a14cebc7602ed35e8f9e58d0e44534af67be1e7ee68c24"
    },
    "1532975452087": {
      "events": {},
      "links": {
        "UtilsLib": "0xfeb597696479b6a67a5da7f7b7538989a429549b"
      },
      "address": "0xfdc1111c9f1dd393384203931c8285de5647151f",
      "transactionHash": "0x546fdc9935e2cfb0d7a14cebc7602ed35e8f9e58d0e44534af67be1e7ee68c24"
    },
    "1532975481846": {
      "events": {},
      "links": {
        "UtilsLib": "0xfeb597696479b6a67a5da7f7b7538989a429549b"
      },
      "address": "0xfdc1111c9f1dd393384203931c8285de5647151f",
      "transactionHash": "0x546fdc9935e2cfb0d7a14cebc7602ed35e8f9e58d0e44534af67be1e7ee68c24"
    },
    "1532975853892": {
      "events": {},
      "links": {
        "UtilsLib": "0x7ed5e531cb89a9f698223c076926da028ab991a7"
      },
      "address": "0x76a8f3a511d92d39cb0602b6de662c995cc1559e",
      "transactionHash": "0xb1784fba176c568d4de07594716ac7101440ff84282381926f2a43ade727d8d8"
    },
    "1533023264015": {
      "events": {},
      "links": {
        "UtilsLib": "0x52ebef6f28b288ef0715cc30aaa203a3bc6d6ecc"
      },
      "address": "0x8f2a6688880267e3048ed4f04be9be2bf29e9f30",
      "transactionHash": "0xcae6181ecf35be122e358c75d71d9230ac3b520e94ce0036ab870a65f81fddd8"
    },
    "1533149364848": {
      "events": {},
      "links": {
        "UtilsLib": "0x0254da3353bf01e1f21127cd2406969aa1c2d07a"
      },
      "address": "0xc36986669e9d5e4a9c3b878b68704b4b49c2cd88",
      "transactionHash": "0xae0259d6a5fc0b4cdf9de0d59e5120d57a61808b8a75406524ca3a40146583ec"
    },
    "1533232658132": {
      "events": {},
      "links": {
        "UtilsLib": "0x8b88f8726982de27ffc695c1a4213bd90896c1f0"
      },
      "address": "0x252a76385c4b8348e2d2981e799e531f1c78ca5c",
      "transactionHash": "0x6cb8830cdbcf23ac907719ab333b98aee133d71dfe43bbb60a7d5937bd7d181d"
    },
    "1533310208447": {
      "events": {},
      "links": {
        "UtilsLib": "0x547d4579374a04f3a1deafbd66decf8ae44ae8a2"
      },
      "address": "0x178f55bd02ab4dfbb94d9034ffa6120cf0df968e",
      "transactionHash": "0x8483ed3e1572095d08431d86d90fd6438221877cd6cb7cedc0a1cbff23bb3b21"
    },
    "1533388822438": {
      "events": {},
      "links": {
        "UtilsLib": "0x2ee3e0d6683b66cf4083527d17772b4efcb1c298"
      },
      "address": "0x1b71938ead14a2af1529ac5b2f3d50a85b237912",
      "transactionHash": "0x040d0608715c057c362f78a107fd2865bfd90903e91001d0f397bb8411dcf85a"
    },
    "1533401435716": {
      "events": {},
      "links": {
        "UtilsLib": "0xb06e20cfa221eba20b374cde5c11f5a91d6a4d5b"
      },
      "address": "0x6cd0bba466e22c1d138ba335ff9ff9e498c0ecc1",
      "transactionHash": "0x9db48dc8629289f90f753646406445b6fea13d15ad0222d48c5119f097b672b2"
    },
    "1533456805179": {
      "events": {},
      "links": {
        "UtilsLib": "0x14d7ea62953ff83e16966ac6b4f93c6a2a7aa74d"
      },
      "address": "0x67634227784f6a1973dac1485bfdb2533a3480c1",
      "transactionHash": "0xd25f90001ea0c323bea1d3b836ece5a173827d4a9ece14ef043bcf709e7b8313"
    },
    "1533488217799": {
      "events": {},
      "links": {
        "UtilsLib": "0x3af388821c91dce238e6871109c5c4665a4fc01e"
      },
      "address": "0xfa0a3cfc8a6fcb4057d1b4d8c69adce6f7158eed",
      "transactionHash": "0xcc968b564ca1eb021ea5c011cf1a894476a264a2a7160e3f5e0f884a83de37ca"
    },
    "1533577864938": {
      "events": {},
      "links": {
        "UtilsLib": "0xaf0b36e8a703f223e5939b2e02bcd370aee9c64c"
      },
      "address": "0xadf7a3465036801d53546f0f5d5b1e465ea5fe5d",
      "transactionHash": "0x1bdb0c67ed1e4a549575f2164d74ed7464fb9c128184d74f2202b1ddc3ac6e1b"
    },
    "1533625753928": {
      "events": {},
      "links": {
        "UtilsLib": "0x9c2f60dadd3396e14f01fe4a438b334db9ce9b0e"
      },
      "address": "0xcdfafd939f6088c4a711f89dbd4b6b13ef783598",
      "transactionHash": "0x1668edc93c0709fb59f9d89d66e60567365e94334d21b4b48efb46e3739e3659"
    },
    "1533653172768": {
      "events": {},
      "links": {
        "UtilsLib": "0x0895eb64f66b13cdb9da882a85becd0312616347"
      },
      "address": "0xad31fdc6aa6962251750c56e236fbd5a34ac6086",
      "transactionHash": "0x5ce8f01f58877dd2240cc3c447c5056910d70dff43a11b12e389acd2dbf13862"
    },
    "1533995206396": {
      "events": {},
      "links": {
        "UtilsLib": "0x7ac097897145d20629b0dd6f35933d80a7410b69"
      },
      "address": "0x0c7e08a11abfb2b6f840b15815eb98a3116f13b0",
      "transactionHash": "0xadd755f92ee755520b6b7b7940297f72f8e31e6568e0ddee2cc3d776d96186e4"
    },
    "1534061144342": {
      "events": {},
      "links": {
        "UtilsLib": "0x48ecfb3d3ab5250f6c61d4bb00da467d869d471d"
      },
      "address": "0xf5dc4efa18fa14e0d844f1ccf819c4303bc8e76b",
      "transactionHash": "0xf891f0e27720b3526900399711495b43c57a25d9f9be2e400439afa9dd2e39c7"
    },
    "1534178633998": {
      "events": {},
      "links": {
        "UtilsLib": "0x14793ac12000ced80f79880cf7bc1e8598626240"
      },
      "address": "0xadb8a928f18165c17b5e473fe6f550c974d33fa0",
      "transactionHash": "0x2ad4e274ad404cdde84ee77930bebab8c3f27091ac466e52ca6260799a262265"
    },
    "1534268841363": {
      "events": {},
      "links": {
        "UtilsLib": "0x565844984346dbd09404e1c3bfec51f7e2a1dc2a"
      },
      "address": "0x3fa89d43647c199a4d2465b49a64ce8f25cb0aba",
      "transactionHash": "0x9f9b29d9068eb1feaf0644e86ea27001c57457c2c536afe141d94370eee2d6af"
    }
  },
  "schemaVersion": "2.0.1",
  "updatedAt": "2018-08-14T18:36:40.189Z"
};

export default companyFactoryAbi;