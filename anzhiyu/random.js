var posts=["2025/07/05/hello-world/","2025/07/04/test/","2025/07/04/test1/","2025/07/04/test2/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };