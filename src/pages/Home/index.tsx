import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>homepage</h1>

      <Link to="/about">About page</Link>
    </div>
  );
};

export default Home;
