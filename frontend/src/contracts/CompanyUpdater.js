const companyUpdaterAbi = {
  "contractName": "Company2Update",
  "abi": [
    {
      "inputs": [
        {
          "name": "_company",
          "type": "address"
        },
        {
          "name": "_company2",
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
          "name": "_status",
          "type": "bool"
        }
      ],
      "name": "EmergencyStatusUpdate",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_companyName",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "_jobTitle",
          "type": "string"
        }
      ],
      "name": "JobOfferCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_companyName",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "_jobTitle",
          "type": "string"
        }
      ],
      "name": "JobOfferUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_companyName",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "_jobTitle",
          "type": "string"
        }
      ],
      "name": "JobOfferPublished",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_companyName",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "_jobTitle",
          "type": "string"
        },
        {
          "indexed": true,
          "name": "_applicant",
          "type": "address"
        }
      ],
      "name": "JobOfferReceivedApplication",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_companyName",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "_jobTitle",
          "type": "string"
        }
      ],
      "name": "JobOfferClosed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_companyName",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "_jobTitle",
          "type": "string"
        },
        {
          "indexed": true,
          "name": "_applicant",
          "type": "address"
        }
      ],
      "name": "JobOfferCovered",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "implementationBefore",
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
      "constant": true,
      "inputs": [],
      "name": "implementationAfter",
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
      "constant": false,
      "inputs": [],
      "name": "migrateData",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b506040516040806103a88339810180604052810190808051906020019092919080519060200190929190505050600080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505081600b60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600c60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050610294806101146000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063140723f01461005c57806321ca8f61146100b357806376b12626146100ca575b600080fd5b34801561006857600080fd5b50610071610121565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156100bf57600080fd5b506100c861014b565b005b3480156100d657600080fd5b506100df610199565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000600c60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6040805190810160405280600881526020017f57656c636f6d6521000000000000000000000000000000000000000000000000815250600a90805190602001906101969291906101c3565b50565b6000600b60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061020457805160ff1916838001178555610232565b82800160010185558215610232579182015b82811115610231578251825591602001919060010190610216565b5b50905061023f9190610243565b5090565b61026591905b80821115610261576000816000905550600101610249565b5090565b905600a165627a7a723058207b10818725886d7698f2011bf930d2c9bfd182284ae6a3ece8cde8319d94f6100029",
  "deployedBytecode": "0x608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063140723f01461005c57806321ca8f61146100b357806376b12626146100ca575b600080fd5b34801561006857600080fd5b50610071610121565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156100bf57600080fd5b506100c861014b565b005b3480156100d657600080fd5b506100df610199565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000600c60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6040805190810160405280600881526020017f57656c636f6d6521000000000000000000000000000000000000000000000000815250600a90805190602001906101969291906101c3565b50565b6000600b60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061020457805160ff1916838001178555610232565b82800160010185558215610232579182015b82811115610231578251825591602001919060010190610216565b5b50905061023f9190610243565b5090565b61026591905b80821115610261576000816000905550600101610249565b5090565b905600a165627a7a723058207b10818725886d7698f2011bf930d2c9bfd182284ae6a3ece8cde8319d94f6100029",
  "sourceMap": "173:600:5:-;;;332:157;8:9:-1;5:2;;;30:1;27;20:12;5:2;332:157:5;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;417:1;231:6:10;223:5;;:14;;;;;;;;;;;;;;;;;;166:78;444:8:5;434:7;;:18;;;;;;;;;;;;;;;;;;473:9;462:8;;:20;;;;;;;;;;;;;;;;;;332:157;;173:600;;;;;;",
  "deployedSourceMap": "173:600:5:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;600:95;;8:9:-1;5:2;;;30:1;27;20:12;5:2;600:95:5;;;;;;;;;;;;;;;;;;;;;;;;;;;701:70;;8:9:-1;5:2;;;30:1;27;20:12;5:2;701:70:5;;;;;;495:99;;8:9:-1;5:2;;;30:1;27;20:12;5:2;495:99:5;;;;;;;;;;;;;;;;;;;;;;;;;;;600:95;654:7;680:8;;;;;;;;;;;673:15;;600:95;:::o;701:70::-;743:21;;;;;;;;;;;;;;;;;;:8;:21;;;;;;;;;;;;:::i;:::-;;701:70::o;495:99::-;550:7;580;;;;;;;;;;;573:14;;495:99;:::o;173:600::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o",
  "source": "pragma solidity ^0.4.24;\n\nimport './Company.sol';\nimport './Company2.sol';\nimport './Update.sol';\nimport './CompanyDataInternal.sol';\nimport './Company2DataInternal.sol';\n\n\ncontract Company2Update is\n    CompanyDataInternal,\n    Company2DataInternal,\n    Update\n{\n\n    Company internal company;\n    Company2 internal company2;\n\n    constructor(Company _company, Company2 _company2)\n        public\n        OwnableData(0)\n    {\n        company = _company;\n        company2 = _company2;\n    }\n\n    function implementationBefore() external view returns (address)\n    {\n        return company;\n    }\n\n    function implementationAfter() external view returns (address) {\n        return company2;\n    }\n\n    function migrateData() external {\n        greeting = \"Welcome!\";\n    }\n}\n",
  "sourcePath": "/media/iulian/Work/Learning/Blockchain/ConsenSysAcademy/FinalProject/recruitment-dapp/backend/contracts/Company2Update.sol",
  "ast": {
    "absolutePath": "/media/iulian/Work/Learning/Blockchain/ConsenSysAcademy/FinalProject/recruitment-dapp/backend/contracts/Company2Update.sol",
    "exportedSymbols": {
      "Company2Update": [
        872
      ]
    },
    "id": 873,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 813,
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
        "id": 814,
        "nodeType": "ImportDirective",
        "scope": 873,
        "sourceUnit": 739,
        "src": "26:23:5",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/media/iulian/Work/Learning/Blockchain/ConsenSysAcademy/FinalProject/recruitment-dapp/backend/contracts/Company2.sol",
        "file": "./Company2.sol",
        "id": 815,
        "nodeType": "ImportDirective",
        "scope": 873,
        "sourceUnit": 780,
        "src": "50:24:5",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/media/iulian/Work/Learning/Blockchain/ConsenSysAcademy/FinalProject/recruitment-dapp/backend/contracts/Update.sol",
        "file": "./Update.sol",
        "id": 816,
        "nodeType": "ImportDirective",
        "scope": 873,
        "sourceUnit": 1241,
        "src": "75:22:5",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/media/iulian/Work/Learning/Blockchain/ConsenSysAcademy/FinalProject/recruitment-dapp/backend/contracts/CompanyDataInternal.sol",
        "file": "./CompanyDataInternal.sol",
        "id": 817,
        "nodeType": "ImportDirective",
        "scope": 873,
        "sourceUnit": 939,
        "src": "98:35:5",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/media/iulian/Work/Learning/Blockchain/ConsenSysAcademy/FinalProject/recruitment-dapp/backend/contracts/Company2DataInternal.sol",
        "file": "./Company2DataInternal.sol",
        "id": 818,
        "nodeType": "ImportDirective",
        "scope": 873,
        "sourceUnit": 802,
        "src": "134:36:5",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 819,
              "name": "CompanyDataInternal",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 938,
              "src": "204:19:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CompanyDataInternal_$938",
                "typeString": "contract CompanyDataInternal"
              }
            },
            "id": 820,
            "nodeType": "InheritanceSpecifier",
            "src": "204:19:5"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 821,
              "name": "Company2DataInternal",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 801,
              "src": "229:20:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Company2DataInternal_$801",
                "typeString": "contract Company2DataInternal"
              }
            },
            "id": 822,
            "nodeType": "InheritanceSpecifier",
            "src": "229:20:5"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 823,
              "name": "Update",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 1240,
              "src": "255:6:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Update_$1240",
                "typeString": "contract Update"
              }
            },
            "id": 824,
            "nodeType": "InheritanceSpecifier",
            "src": "255:6:5"
          }
        ],
        "contractDependencies": [
          801,
          811,
          938,
          1016,
          1060,
          1065,
          1168,
          1240
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 872,
        "linearizedBaseContracts": [
          872,
          1240,
          801,
          811,
          938,
          1016,
          1168,
          1060,
          1065
        ],
        "name": "Company2Update",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 826,
            "name": "company",
            "nodeType": "VariableDeclaration",
            "scope": 872,
            "src": "269:24:5",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_contract$_Company_$738",
              "typeString": "contract Company"
            },
            "typeName": {
              "contractScope": null,
              "id": 825,
              "name": "Company",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 738,
              "src": "269:7:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Company_$738",
                "typeString": "contract Company"
              }
            },
            "value": null,
            "visibility": "internal"
          },
          {
            "constant": false,
            "id": 828,
            "name": "company2",
            "nodeType": "VariableDeclaration",
            "scope": 872,
            "src": "299:26:5",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_contract$_Company2_$779",
              "typeString": "contract Company2"
            },
            "typeName": {
              "contractScope": null,
              "id": 827,
              "name": "Company2",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 779,
              "src": "299:8:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Company2_$779",
                "typeString": "contract Company2"
              }
            },
            "value": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 846,
              "nodeType": "Block",
              "src": "424:65:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 840,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 838,
                      "name": "company",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 826,
                      "src": "434:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Company_$738",
                        "typeString": "contract Company"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 839,
                      "name": "_company",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 830,
                      "src": "444:8:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Company_$738",
                        "typeString": "contract Company"
                      }
                    },
                    "src": "434:18:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Company_$738",
                      "typeString": "contract Company"
                    }
                  },
                  "id": 841,
                  "nodeType": "ExpressionStatement",
                  "src": "434:18:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 844,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 842,
                      "name": "company2",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 828,
                      "src": "462:8:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Company2_$779",
                        "typeString": "contract Company2"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 843,
                      "name": "_company2",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 832,
                      "src": "473:9:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Company2_$779",
                        "typeString": "contract Company2"
                      }
                    },
                    "src": "462:20:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Company2_$779",
                      "typeString": "contract Company2"
                    }
                  },
                  "id": 845,
                  "nodeType": "ExpressionStatement",
                  "src": "462:20:5"
                }
              ]
            },
            "documentation": null,
            "id": 847,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "hexValue": "30",
                    "id": 835,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "number",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "417:1:5",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_rational_0_by_1",
                      "typeString": "int_const 0"
                    },
                    "value": "0"
                  }
                ],
                "id": 836,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 834,
                  "name": "OwnableData",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 1060,
                  "src": "405:11:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_type$_t_contract$_OwnableData_$1060_$",
                    "typeString": "type(contract OwnableData)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "405:14:5"
              }
            ],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 833,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 830,
                  "name": "_company",
                  "nodeType": "VariableDeclaration",
                  "scope": 847,
                  "src": "344:16:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_contract$_Company_$738",
                    "typeString": "contract Company"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 829,
                    "name": "Company",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 738,
                    "src": "344:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Company_$738",
                      "typeString": "contract Company"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 832,
                  "name": "_company2",
                  "nodeType": "VariableDeclaration",
                  "scope": 847,
                  "src": "362:18:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_contract$_Company2_$779",
                    "typeString": "contract Company2"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 831,
                    "name": "Company2",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 779,
                    "src": "362:8:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Company2_$779",
                      "typeString": "contract Company2"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "343:38:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 837,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "424:0:5"
            },
            "scope": 872,
            "src": "332:157:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 854,
              "nodeType": "Block",
              "src": "563:31:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 852,
                    "name": "company",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 826,
                    "src": "580:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Company_$738",
                      "typeString": "contract Company"
                    }
                  },
                  "functionReturnParameters": 851,
                  "id": 853,
                  "nodeType": "Return",
                  "src": "573:14:5"
                }
              ]
            },
            "documentation": null,
            "id": 855,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "implementationBefore",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 848,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "524:2:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 851,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 850,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 855,
                  "src": "550:7:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 849,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "550:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "549:9:5"
            },
            "scope": 872,
            "src": "495:99:5",
            "stateMutability": "view",
            "superFunction": 1231,
            "visibility": "external"
          },
          {
            "body": {
              "id": 862,
              "nodeType": "Block",
              "src": "663:32:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 860,
                    "name": "company2",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 828,
                    "src": "680:8:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Company2_$779",
                      "typeString": "contract Company2"
                    }
                  },
                  "functionReturnParameters": 859,
                  "id": 861,
                  "nodeType": "Return",
                  "src": "673:15:5"
                }
              ]
            },
            "documentation": null,
            "id": 863,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "implementationAfter",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 856,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "628:2:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 859,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 858,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 863,
                  "src": "654:7:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 857,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "654:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "653:9:5"
            },
            "scope": 872,
            "src": "600:95:5",
            "stateMutability": "view",
            "superFunction": 1236,
            "visibility": "external"
          },
          {
            "body": {
              "id": 870,
              "nodeType": "Block",
              "src": "733:38:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 868,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 866,
                      "name": "greeting",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 800,
                      "src": "743:8:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "57656c636f6d6521",
                      "id": 867,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "754:10:5",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_92c8d0ba8fac51542d0dc71de741b45d793b1132537de71cb9db037a8e364ae9",
                        "typeString": "literal_string \"Welcome!\""
                      },
                      "value": "Welcome!"
                    },
                    "src": "743:21:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 869,
                  "nodeType": "ExpressionStatement",
                  "src": "743:21:5"
                }
              ]
            },
            "documentation": null,
            "id": 871,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "migrateData",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 864,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "721:2:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 865,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "733:0:5"
            },
            "scope": 872,
            "src": "701:70:5",
            "stateMutability": "nonpayable",
            "superFunction": 1239,
            "visibility": "external"
          }
        ],
        "scope": 873,
        "src": "173:600:5"
      }
    ],
    "src": "0:774:5"
  },
  "legacyAST": {
    "absolutePath": "/media/iulian/Work/Learning/Blockchain/ConsenSysAcademy/FinalProject/recruitment-dapp/backend/contracts/Company2Update.sol",
    "exportedSymbols": {
      "Company2Update": [
        872
      ]
    },
    "id": 873,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 813,
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
        "id": 814,
        "nodeType": "ImportDirective",
        "scope": 873,
        "sourceUnit": 739,
        "src": "26:23:5",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/media/iulian/Work/Learning/Blockchain/ConsenSysAcademy/FinalProject/recruitment-dapp/backend/contracts/Company2.sol",
        "file": "./Company2.sol",
        "id": 815,
        "nodeType": "ImportDirective",
        "scope": 873,
        "sourceUnit": 780,
        "src": "50:24:5",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/media/iulian/Work/Learning/Blockchain/ConsenSysAcademy/FinalProject/recruitment-dapp/backend/contracts/Update.sol",
        "file": "./Update.sol",
        "id": 816,
        "nodeType": "ImportDirective",
        "scope": 873,
        "sourceUnit": 1241,
        "src": "75:22:5",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/media/iulian/Work/Learning/Blockchain/ConsenSysAcademy/FinalProject/recruitment-dapp/backend/contracts/CompanyDataInternal.sol",
        "file": "./CompanyDataInternal.sol",
        "id": 817,
        "nodeType": "ImportDirective",
        "scope": 873,
        "sourceUnit": 939,
        "src": "98:35:5",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/media/iulian/Work/Learning/Blockchain/ConsenSysAcademy/FinalProject/recruitment-dapp/backend/contracts/Company2DataInternal.sol",
        "file": "./Company2DataInternal.sol",
        "id": 818,
        "nodeType": "ImportDirective",
        "scope": 873,
        "sourceUnit": 802,
        "src": "134:36:5",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 819,
              "name": "CompanyDataInternal",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 938,
              "src": "204:19:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CompanyDataInternal_$938",
                "typeString": "contract CompanyDataInternal"
              }
            },
            "id": 820,
            "nodeType": "InheritanceSpecifier",
            "src": "204:19:5"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 821,
              "name": "Company2DataInternal",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 801,
              "src": "229:20:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Company2DataInternal_$801",
                "typeString": "contract Company2DataInternal"
              }
            },
            "id": 822,
            "nodeType": "InheritanceSpecifier",
            "src": "229:20:5"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 823,
              "name": "Update",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 1240,
              "src": "255:6:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Update_$1240",
                "typeString": "contract Update"
              }
            },
            "id": 824,
            "nodeType": "InheritanceSpecifier",
            "src": "255:6:5"
          }
        ],
        "contractDependencies": [
          801,
          811,
          938,
          1016,
          1060,
          1065,
          1168,
          1240
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 872,
        "linearizedBaseContracts": [
          872,
          1240,
          801,
          811,
          938,
          1016,
          1168,
          1060,
          1065
        ],
        "name": "Company2Update",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 826,
            "name": "company",
            "nodeType": "VariableDeclaration",
            "scope": 872,
            "src": "269:24:5",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_contract$_Company_$738",
              "typeString": "contract Company"
            },
            "typeName": {
              "contractScope": null,
              "id": 825,
              "name": "Company",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 738,
              "src": "269:7:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Company_$738",
                "typeString": "contract Company"
              }
            },
            "value": null,
            "visibility": "internal"
          },
          {
            "constant": false,
            "id": 828,
            "name": "company2",
            "nodeType": "VariableDeclaration",
            "scope": 872,
            "src": "299:26:5",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_contract$_Company2_$779",
              "typeString": "contract Company2"
            },
            "typeName": {
              "contractScope": null,
              "id": 827,
              "name": "Company2",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 779,
              "src": "299:8:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Company2_$779",
                "typeString": "contract Company2"
              }
            },
            "value": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 846,
              "nodeType": "Block",
              "src": "424:65:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 840,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 838,
                      "name": "company",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 826,
                      "src": "434:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Company_$738",
                        "typeString": "contract Company"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 839,
                      "name": "_company",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 830,
                      "src": "444:8:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Company_$738",
                        "typeString": "contract Company"
                      }
                    },
                    "src": "434:18:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Company_$738",
                      "typeString": "contract Company"
                    }
                  },
                  "id": 841,
                  "nodeType": "ExpressionStatement",
                  "src": "434:18:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 844,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 842,
                      "name": "company2",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 828,
                      "src": "462:8:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Company2_$779",
                        "typeString": "contract Company2"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 843,
                      "name": "_company2",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 832,
                      "src": "473:9:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Company2_$779",
                        "typeString": "contract Company2"
                      }
                    },
                    "src": "462:20:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Company2_$779",
                      "typeString": "contract Company2"
                    }
                  },
                  "id": 845,
                  "nodeType": "ExpressionStatement",
                  "src": "462:20:5"
                }
              ]
            },
            "documentation": null,
            "id": 847,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "hexValue": "30",
                    "id": 835,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": true,
                    "kind": "number",
                    "lValueRequested": false,
                    "nodeType": "Literal",
                    "src": "417:1:5",
                    "subdenomination": null,
                    "typeDescriptions": {
                      "typeIdentifier": "t_rational_0_by_1",
                      "typeString": "int_const 0"
                    },
                    "value": "0"
                  }
                ],
                "id": 836,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 834,
                  "name": "OwnableData",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 1060,
                  "src": "405:11:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_type$_t_contract$_OwnableData_$1060_$",
                    "typeString": "type(contract OwnableData)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "405:14:5"
              }
            ],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 833,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 830,
                  "name": "_company",
                  "nodeType": "VariableDeclaration",
                  "scope": 847,
                  "src": "344:16:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_contract$_Company_$738",
                    "typeString": "contract Company"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 829,
                    "name": "Company",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 738,
                    "src": "344:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Company_$738",
                      "typeString": "contract Company"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 832,
                  "name": "_company2",
                  "nodeType": "VariableDeclaration",
                  "scope": 847,
                  "src": "362:18:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_contract$_Company2_$779",
                    "typeString": "contract Company2"
                  },
                  "typeName": {
                    "contractScope": null,
                    "id": 831,
                    "name": "Company2",
                    "nodeType": "UserDefinedTypeName",
                    "referencedDeclaration": 779,
                    "src": "362:8:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Company2_$779",
                      "typeString": "contract Company2"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "343:38:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 837,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "424:0:5"
            },
            "scope": 872,
            "src": "332:157:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 854,
              "nodeType": "Block",
              "src": "563:31:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 852,
                    "name": "company",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 826,
                    "src": "580:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Company_$738",
                      "typeString": "contract Company"
                    }
                  },
                  "functionReturnParameters": 851,
                  "id": 853,
                  "nodeType": "Return",
                  "src": "573:14:5"
                }
              ]
            },
            "documentation": null,
            "id": 855,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "implementationBefore",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 848,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "524:2:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 851,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 850,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 855,
                  "src": "550:7:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 849,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "550:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "549:9:5"
            },
            "scope": 872,
            "src": "495:99:5",
            "stateMutability": "view",
            "superFunction": 1231,
            "visibility": "external"
          },
          {
            "body": {
              "id": 862,
              "nodeType": "Block",
              "src": "663:32:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 860,
                    "name": "company2",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 828,
                    "src": "680:8:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_Company2_$779",
                      "typeString": "contract Company2"
                    }
                  },
                  "functionReturnParameters": 859,
                  "id": 861,
                  "nodeType": "Return",
                  "src": "673:15:5"
                }
              ]
            },
            "documentation": null,
            "id": 863,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "implementationAfter",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 856,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "628:2:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 859,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 858,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 863,
                  "src": "654:7:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 857,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "654:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "653:9:5"
            },
            "scope": 872,
            "src": "600:95:5",
            "stateMutability": "view",
            "superFunction": 1236,
            "visibility": "external"
          },
          {
            "body": {
              "id": 870,
              "nodeType": "Block",
              "src": "733:38:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 868,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 866,
                      "name": "greeting",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 800,
                      "src": "743:8:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage",
                        "typeString": "string storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "57656c636f6d6521",
                      "id": 867,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "754:10:5",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_92c8d0ba8fac51542d0dc71de741b45d793b1132537de71cb9db037a8e364ae9",
                        "typeString": "literal_string \"Welcome!\""
                      },
                      "value": "Welcome!"
                    },
                    "src": "743:21:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage",
                      "typeString": "string storage ref"
                    }
                  },
                  "id": 869,
                  "nodeType": "ExpressionStatement",
                  "src": "743:21:5"
                }
              ]
            },
            "documentation": null,
            "id": 871,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "migrateData",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 864,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "721:2:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 865,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "733:0:5"
            },
            "scope": 872,
            "src": "701:70:5",
            "stateMutability": "nonpayable",
            "superFunction": 1239,
            "visibility": "external"
          }
        ],
        "scope": 873,
        "src": "173:600:5"
      }
    ],
    "src": "0:774:5"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {
    "1534785347435": {
      "events": {},
      "links": {},
      "address": "0x4bb4dec335155fa8210c86d64af3777593c9d4e2",
      "transactionHash": "0x4aee40145721284e5ddd3a9db15bcb346c96841003d74308ef3a8ba49facd7ae"
    }
  },
  "schemaVersion": "2.0.1",
  "updatedAt": "2018-08-26T09:29:15.962Z"
};

export default companyUpdaterAbi;