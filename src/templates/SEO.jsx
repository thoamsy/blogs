import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

function SEO({
  image: metaImage,
  title,
  description,
  slug = '',
  lang = 'zh-cn',
}) {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const { siteMetadata } = data.site;
        const metaDescription = description || siteMetadata.description;
        const url = `${siteMetadata.siteUrl}${slug}`;

        const metaAttributes = [
          {
            name: 'description',
            content: metaDescription,
          },
          {
            property: 'og:url',
            content: url,
          },
          {
            property: 'og:title',
            content: title || siteMetadata.title,
          },
          {
            property: 'og:description',
            content: metaDescription,
          },
        ].concat(
          metaImage
            ? [
                {
                  property: 'og:image',
                  content: metaImage,
                },
                {
                  name: 'twitter:image',
                  content: metaImage,
                },
              ]
            : []
        );

        return (
          <Helmet
            htmlAttributes={{ lang }}
            {...(title
              ? {
                  titleTemplate: `%s — ${siteMetadata.title}`,
                  title,
                }
              : {
                  title: `${siteMetadata.title} — A blog by thoamsy`,
                })}
            meta={metaAttributes}
          />
        );
      }}
    />
  );
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        title
        author
        description
        siteUrl
      }
    }
  }
`;

export default SEO;
SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
};
SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  pathname: null,
  article: false,
};
