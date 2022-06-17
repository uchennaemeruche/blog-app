import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("uchenna");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const blog = { title, body, author };
    setIsLoading(true);

    setTimeout(() => {
      fetch("http://localhost:8000/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
      })
        .then((res) => {
          console.log("New blog created", res);
          setIsLoading(false);
          navigate(-1);
        })
        .catch((err) => {
          setIsLoading(false);
          console.error(err);
        });
    }, 1000);
  };

  return (
    <div className="create">
      <h2>Add a new Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog Author</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="uchenna">uchenna</option>
          <option value="emeruche">emeruche</option>
        </select>
        <button disabled={isLoading}>
          {!isLoading ? "Add Blog" : "Adding Blog..."}
        </button>
        <p> {title}</p>
        <p> {body}</p>
        <p>{author}</p>
      </form>
    </div>
  );
};

export default Create;
