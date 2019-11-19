import React, { Fragment, Component } from 'react';
import Spinner from '../layouts/Spinner';
import Repos from '../repos/Repos';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class User extends Component {
  componentDidMount() {
    const login = this.props.match.params.login;
    this.props.getUser(login);
    this.props.getUserRepos(login);
  }
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired
  };
  render() {
    const {
      user: {
        name,
        avatar_url,
        location,
        bio,
        blog,
        company,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
      },
      repos,
      loading
    } = this.props;

    if (loading) {
      return <Spinner />;
    } else {
      return (
        <Fragment>
          <Link to='/' className='btn btn-light'>
            Back to Seatch
          </Link>
          Hirebale:{''}
          {hireable ? (
            <i className='fas fa-check text-success'></i>
          ) : (
            <i className='fas fa-times-circle text-danger'></i>
          )}
          <div className='card grid-2'>
            <div className='all-center'>
              <img
                src={avatar_url}
                alt='avatar'
                className='round-img'
                style={{ width: '150px' }}
              />
              <h1>{name}</h1>
              <p>{location}</p>
            </div>
            <div>
              {bio && (
                <Fragment>
                  <h3>Bio</h3>
                  <p>{bio}</p>
                </Fragment>
              )}
              <a href={html_url} className='btn btn-dark my-1 '>
                Visit GitHub Profile
              </a>
              <ul>
                <li>
                  {login && (
                    <Fragment>
                      <strong>Username: </strong>
                      {login}
                    </Fragment>
                  )}
                </li>
                <li>
                  {company && (
                    <Fragment>
                      <strong>Company: </strong>
                      {company}
                    </Fragment>
                  )}
                </li>
                <li>
                  {blog && (
                    <Fragment>
                      <strong>WebSite: </strong>
                      {blog}
                    </Fragment>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className='card text-center'>
            <div className='badge badge-primary'>Followers: {followers}</div>
            <div className='badge badge-success'>Following: {following}</div>
            <div className='badge badge-light'>
              Public Repos: {public_repos}
            </div>
            <div className='badge badge-dark'>Public gists: {public_gists}</div>
          </div>
          <Repos repos={repos} />
        </Fragment>
      );
    }
  }
}

export default User;
