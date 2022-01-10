const BlogList = ({blogs, title, handleDelete}) => {

  return (
    <div className="blog-list">
      <h2>{title}</h2>
      {blogs.map((element) => (
        <div className="blog-preview" key={element.id}>
          <h2>{element.title}</h2>
          <p>Written by {element.author}</p>
          <button onClick={() => handleDelete(element.id)}>Delete Blog</button>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
