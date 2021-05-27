import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  forwardRef
} from 'react';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import Repo from './Repo';
import { Card, Alert } from 'antd';

const Repos = () => {
  const [repos, setRepos] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [showAlert, setShowAlert] = useState(false);

  const observer = useRef();
  const lastRepoRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const {
          data: { items }
        } = await axios.get(
          `https://api.github.com/search/repositories?q=created:>2017-11-22&sort=stars&order=desc&page=${pageNumber}`
        );
        setRepos((prevRepos) => {
          return [...prevRepos, ...items];
        });
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
  }, [pageNumber]);

  console.log(repos);

  const Repos = repos.map((repo, index) => {
    if (repos.length === index + 1) {
      return (
        <div key={repo.id} ref={lastRepoRef}>
          <Card style={{ width: 600, height: 300 }}>
            <Repo repo={repo} />
          </Card>
        </div>
      );
    } else {
      return (
        <div key={repo.id}>
          <Card style={{ width: 600, height: 300 }}>
            <Repo repo={repo} />
          </Card>
        </div>
      );
    }
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
        {/* {loading ? (
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
        )} */}
        {Repos}
      </div>
      <div>
        {loading && (
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
        )}
      </div>
    </React.Fragment>
  );
};

export default Repos;
