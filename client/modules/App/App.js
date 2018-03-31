import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import SearchBox from './components/SearchBox/SearchBox';

// Import Actions
import { toggleAddPost } from './AppActions';
import { makeSearch } from './AppActions';
import SearchList from './components/SearchList';

// Import Selectors
import { getSearchResults } from './AppReducer';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({ isMounted: true }); // eslint-disable-line
  }

  handleMakeSearch = (searchQuery) => {
    this.props.dispatch(makeSearch({ searchQuery }));
  };

  render() {
    console.log('heres App.js. this.props = ', this.props, 'this.state = ', this.state);
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="RedditSearch"
            titleTemplate="%s - RedditSearch"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <h1 className={styles.title}>RedditSearch</h1>
          <SearchBox 
            name="SearchBox"
            makeSearch={this.handleMakeSearch}
          />
          <SearchList
            searchItems={this.props.searchItems} 
            intlYo={this.props.intl}
          />
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
    searchItems: getSearchResults(store),
  };
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  searchItem: PropTypes.arrayOf(PropTypes.shape({
    data: {
      thumbnail: PropTypes.string.isRequired,
      autor: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      subreddit_name_prefixed: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      cuid: PropTypes.string.isRequired,
    }
  })).isRequired,
};

App.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(App);
