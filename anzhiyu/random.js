var posts=["2025/07/04/hello-world/","2025/07/04/test/","2025/07/04/test1/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };