// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract EXAMPLEToken is Context, Ownable, ERC1155Burnable, ERC1155Supply {
    using SafeMath for uint256;

    string private _name;
    string private _symbol;
    string private _contractURI;

    constructor(string memory uri_) public ERC1155(uri_) {
        _name = "EXAMPLE NFT 1155";
        _symbol = "EXAMPLE1155";
        _setURI(uri_);
        setContractURI(uri_);
    }

    /**
     * @dev Returns the name of the token.
     */
    function name() public view virtual returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view virtual returns (string memory) {
        return _symbol;
    }

    function setURI(string memory uri_) public virtual onlyOwner {
        _setURI(uri_);
    }

    function contractURI() public view virtual returns (string memory) {
        return _contractURI;
    }

    function setContractURI(string memory contractURI_)
        public
        virtual
        onlyOwner
    {
        _contractURI = contractURI_;
    }

    /**
     * @dev Creates `amount` new tokens for `to`, of token type `id`.
     *
     * See {ERC1155-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the `MINTER_ROLE`.
     */
    function mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual onlyOwner {
        _mint(to, id, amount, data);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
