//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;

contract BookMark {
  string public name;
  uint public postCount = 0;
  mapping(uint => Post) public posts;

  struct Post {
    uint id;
    string hash;
    string description;
    uint tipAmount;
    address payable author;
  }

  event PostCreated(
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address payable author
  );

  event PostTipped(
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address payable author
  );

  constructor()  {
    name = "BookMark";
  }
  function uploadPost(string memory _bookMarkHash, string memory _description) public {
    // Make sure the bookMark hash exists
    require(bytes(_bookMarkHash).length > 0, "Image hash cannot be empty");
    // Make sure bookMark description exists
    require(bytes(_description).length > 0, "cannot be empty");
    // Make sure uploader address exists
    require(msg.sender!=address(0), "Uploader address cannot be empty");

    // Increment bookMark id
    postCount ++;

    // Add bookMark to the contract
    posts[postCount] = Post(postCount, _bookMarkHash, _description, 0, payable(msg.sender));
    // Trigger an event
    emit PostCreated(postCount, _bookMarkHash, _description, 0, payable(msg.sender));
  }

  function tipImageOwner(uint _id) external payable {
    // Make sure the id is valid
    require(_id > 0 && _id <= postCount, "POST id is invalid");
    // Fetch the bookMark
    Post memory _post = posts[_id];
    // Fetch the author
    address payable _author = _post.author;
    // Pay the author by sending them Ether
    payable(address(_author)).transfer(msg.value);
    // Increment the tip amount
    _post.tipAmount = _post.tipAmount + msg.value;
    // Update the image
    posts[_id] = _post;
    // Trigger an event
    emit PostTipped(_id, _post.hash, _post.description, _post.tipAmount, _author);
  }
   // Fetches all the posts
    function getAllPosts() external view returns (Post[] memory _posts) {
        _posts = new Post[](postCount);
        for (uint256 i = 0; i < _posts.length; i++) {
            _posts[i] = posts[i + 1];
        }
    }
}