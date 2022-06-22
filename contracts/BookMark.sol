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
    string preview;
    uint tipAmount;
    uint downloadAmount;
    address payable author;
  }

  event PostCreated(
    uint id,
    string hash,
    string description,
    string preview,
    uint tipAmount,
    uint downloadAmount,
    address payable author
  );

  event PostTipped(
    uint id,
    string hash,
    string description,
    string preview,
    uint tipAmount,
    uint downloadAmount,
    address payable author
  );
  event PostDownloaded(
    uint id,
    string hash,
    string description,
    string preview,
    uint tipAmount,
    uint downloadAmount,
    address payable author
  );

  constructor()  {
    name = "BookMark";
  }
  function uploadPost(string memory _bookMarkHash, string memory _description, string memory _preview) public {
    // Make sure the bookMark hash exists
    require(bytes(_bookMarkHash).length > 0, "Image hash cannot be empty");
    // Make sure bookMark description exists
    require(bytes(_description).length > 0, "cannot be empty");
    // Make sure bookMark preview exists
    require(bytes(_preview).length > 0, "cannot be empty");
    // Make sure uploader address exists
    require(msg.sender!=address(0), "Uploader address cannot be empty");

    // Increment bookMark id
    postCount ++;

    // Add bookMark to the contract
    posts[postCount] = Post(postCount, _bookMarkHash, _description,_preview, 0, 0,payable(msg.sender));
    // Trigger an event
    emit PostCreated(postCount, _bookMarkHash, _description,_preview, 0, 0, payable(msg.sender));
  }
  function updateDownLoadAmount(uint _id) public {
    // Make sure bookMark id exists
    require(_id > 0, "BookMark id cannot be empty");  // Make sure bookMark id exists
    // Make sure uploader address exists
    require(msg.sender!=address(0), "Uploader address cannot be empty");
    // Make sure uploader can download freely
    require(posts[_id].author != msg.sender, "You are the author of this bookMark");
    // uploadeAccount Increment
    Post memory _post = posts[_id];
    
    _post.downloadAmount = _post.downloadAmount + 1;
    // Update the post
    posts[_id] = _post;
    // Trigger an event
    emit PostDownloaded(_id, posts[_id].hash, posts[_id].description, posts[_id].preview, posts[_id].tipAmount, posts[_id].downloadAmount, payable(msg.sender));
  }
  function tipPostOwner(uint _id) external payable {
    // Make sure the id is valid
    require(_id > 0 && _id <= postCount, "POST id is invalid");
    // require the post owner is not the same as the sender
    require(msg.sender != posts[_id].author, "You cannot tip your own post");
    // Fetch the bookMark
    Post memory _post = posts[_id];
    // Fetch the author
    address payable _author = _post.author;
    // Pay the author by sending them Ether
    payable(address(_author)).transfer(msg.value);
    // Increment the tip amount
    _post.tipAmount = _post.tipAmount + msg.value;
    // Update the post
    posts[_id] = _post;
    // Trigger an event
    emit PostTipped(_id, _post.hash, _post.description,_post.preview, _post.tipAmount,_post.downloadAmount, _author);
  }
   // Fetches all the posts
    function getAllPosts() external view returns (Post[] memory _posts) {
        _posts = new Post[](postCount);
        for (uint256 i = 0; i < _posts.length; i++) {
            _posts[i] = posts[i + 1];
        }
    }
}