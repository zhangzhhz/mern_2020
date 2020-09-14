import React, { Fragment, useEffect, useState } from 'react';

const App = () => {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAPI = async () => {
      const response = await fetch('http://localhost:8080');
      const data = await response.json();
      console.log(data);
      try {
        console.log(data);
        setLoading(false);
        setAnime(data);
      } catch (error) {
        console.error(error);
      }
    };
    getAPI();
  }, []);

  return (
    <Fragment>
      <h1>Anime Home</h1>
      <div>
        {loading ? (
          <div>Loading</div>
        ) : (
            <div>
              {anime.map((data) => (
                <div key={data._id}>
                  <ul>
                    <li>
                      <h1>
                        <a href={`http://localhost:8080/${data._id}`}>{data.name}</a>
                      </h1>
                    </li>
                    <li>
                      <img src={data.image} width="30" height={30} alt={data.name}/>   
                    </li>
                    <li>
                      <p>{data.description}</p>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          )}
      </div>
      <div>
        <h1>Add New Anime</h1>
        <form method='POST' action="http://localhost:8080/add-anime">
          <div>
            <label>Name</label>
            <input type="text" name="name" required />
          </div>
          <div>
            <label>Image</label>
            <input type="text" name="image" required />
          </div>
          <div>
            <label>Description</label>
            <input type="text" name="description" required />
          </div>
          <div>
            <button type="submit">Add Anime</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default App;