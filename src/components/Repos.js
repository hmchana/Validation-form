import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Repo from './Repo';
import { Card } from 'antd';

const Repos = () => {
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const {
          data: { items }
        } = await axios.get(
          `https://api.github.com/search/repositories?q=created:>2017-11-22&sort=stars&order=desc`
        );
        setRepos(items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRepos();
    // eslint-disable-next-line
  }, []);

  console.log(repos);

  return (
    <div>
      {repos.length > 0
        ? repos.map((repo) => {
            return (
              <Card key={repo.id} style={{ width: 600, height: 300 }}>
                <Repo repo={repo} />
              </Card>
            );
          })
        : null}
    </div>
  );
};

export default Repos;
