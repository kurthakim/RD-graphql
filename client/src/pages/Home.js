import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '../graphql/queries';

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);
  const [
    fetchPosts,
    { loading: postsLoading, error: postsError, data: postsData },
  ] = useLazyQuery(GET_ALL_POSTS);

  if (loading) return <p className="p-5">Loading...</p>;
  if (error) return <p className="p-5">Error: {error}</p>;

  return (
    <div className="container">
      <div className="row p-5">
        {data.allPosts.map((p) => (
          <div key={p.id} className="col-md-4">
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  <h4>{p.title}</h4>
                </div>
                <p className="card-text">{p.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row p-5">
        <button
          onClick={() => fetchPosts()}
          className="btn btn-raised btn-primary"
        >
          Fetch posts
        </button>
      </div>
      <hr />
      {JSON.stringify(postsData)}
    </div>
  );
};

export default Home;
