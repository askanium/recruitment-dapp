pragma solidity ^0.4.24;


library UtilsLib {

    /// @dev Taken and adjusted from https://ethereum.stackexchange.com/a/13886/41771
    function utfStringLength(string _str, bool _computeByteLength)
        pure
        public
        returns (uint length)
    {
        uint i = 0;
        bytes memory string_rep = bytes(_str);

        if (_computeByteLength) {
            length = string_rep.length;
        } else {
            while (i < string_rep.length) {
                if (string_rep[i] >> 5 == 0x6)
                    i+=2;
                else if (string_rep[i] >> 4 == 0xE)
                    i+=3;
                else if (string_rep[i] >> 3 == 0x1E)
                    i+=4;
                else
                    i+=1;

                length++;
            }
        }
    }
}