/**
 * The top-level routing of the App.
 */

import CommunityLoader from 'containers/tc-communities/Loader';
import ContentfulRoute from 'components/Contentful/Route';
import Content from 'components/Content';
import Footer from 'components/TopcoderFooter';
import React from 'react';
import { Helmet } from 'react-helmet';

import {
  Switch, Route, withRouter, Redirect,
} from 'react-router-dom';
import { MetaTags, config } from 'topcoder-react-utils';

import PT from 'prop-types';

import { connect } from 'react-redux';

import socialImage from 'assets/images/social.jpg';

import Communities from './Communities';
import Examples from './Examples';
import Sandbox from './Sandbox';
import Topcoder from './Topcoder';
import TrackHomePages from './TrackHomePages';
import PolicyPages from './PolicyPages';
import GigsPages from './GigsPages';

function Routes({ communityId }) {
  const metaTags = (
    <MetaTags
      description="Topcoder is a crowdsourcing marketplace that connects businesses with hard-to-find expertise. The Topcoder Community includes more than one million of the world’s top designers, developers, data scientists, and algorithmists. Global enterprises and startups alike use Topcoder to accelerate innovation, solve challenging problems, and tap into specialized skills on demand."
      image={socialImage}
      siteName="Topcoder"
      title="Topcoder"
    />
  );
  if (communityId) {
    return (
      <div>
        {metaTags}
        <CommunityLoader
          communityComponent={({ member, meta }) => (
            <Communities
              communityId={communityId}
              member={member}
              meta={meta}
            />
          )}
          communityId={communityId}
        />
      </div>
    );
  }
  return (
    <div>
      {metaTags}
      <Switch>
        <Route
          render={() => (
            <ContentfulRoute
              baseUrl="/"
              id="4Ie8cLj2OvuFqbU46HBGQM"
            />
          )}
          path="/"
        />
      </Switch>
      <Helmet>
        <link rel="icon" type="image/png" href="https://www.wipro.com/content/dam/nexus/en/favicon.png#v2" />
      </Helmet>
    </div>
  );
}

Routes.propTypes = {
  communityId: PT.string.isRequired,
};

export default withRouter(connect(state => ({
  communityId: state.subdomainCommunity,
}))(Routes));
