import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import Repo from './Repo';
import { Card, Alert } from 'antd';

const Repos = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const {
          data: { items }
        } = await axios.get(
          `https://api.github.com/search/repositories?q=created:>2017-11-22&sort=stars&order=desc`
        );
        setRepos(items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setAlert({
          type: 'error',
          message: 'Une erreur est survenue '
        });
        setShowAlert(true);
      }
    };
    fetchRepos();
    // eslint-disable-next-line
  }, []);

  console.log(repos);

  const Repos = repos.map((repo) => {
    return (
      <Card key={repo.id} style={{ width: 600, height: 300 }}>
        <Repo repo={repo} />
      </Card>
    );
  });

  return (
    <React.Fragment>
      {showAlert && (
        <Alert
          banner={true}
          closable
          message={alert.message}
          type={alert.type}
          onClose={() => setShowAlert(false)}
        />
      )}
      <div>
        {loading ? (
          <Loader
            type='Oval'
            color='#606f7d'
            height={36}
            width={36}
            style={{
              width: '20px',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '20px'
            }}
          />
        ) : (
          Repos
        )}
      </div>
    </React.Fragment>
  );
};

export default Repos;
