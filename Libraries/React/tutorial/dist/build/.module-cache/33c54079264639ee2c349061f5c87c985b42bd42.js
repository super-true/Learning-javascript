// tutorial1
/*
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, World! I am a CommentBox.
      </div>
    );
  }
});

React.render(
  <CommentBox />,
  document.getElementById('content')
);

*/

// tutorial4
// props を使う
var Comment = React.createClass({displayName: "Comment",
  render: function() {
    return (
      React.createElement("div", {className: "comment"}, 
        React.createElement("h2", {className: "commentAuthor"}, 
          this.props.author
        ), 
        React.createElement("p", null, React.createElement("b", null, this.props.children))
      )
    );
  }
});


// tutorial2 + tutorial5
var CommentList = React.createClass({displayName: "CommentList",
  render: function() {
    return (
      React.createElement("div", {className: "commentList"}, 
        React.createElement(Comment, {author: "Pete Hunt"}, "This is one comment"), 
        React.createElement(Comment, {author: "Jordan Walke"}, "This is *another* a comment")
      )
    );
  }
});

var CommentForm = React.createClass({displayName: "CommentForm",
  render: function() {
    return (
      React.createElement("div", {className: "commentForm"}, 
        "Hello, World! I am a CommentForm."
      )
    );
  }
});

// tutorial3
// CommentList + CommentForm
var CommentBox = React.createClass({displayName: "CommentBox",
  render: function() {
    return (
      React.createElement("div", {className: "commentBox"}, 
        React.createElement("h1", null, "Comments"), 
        React.createElement(CommentList, null), 
        React.createElement(CommentForm, null)
      )
    );
  }
});





// rendering
React.render(
  React.createElement(CommentBox, null),
  document.getElementById('content')
);