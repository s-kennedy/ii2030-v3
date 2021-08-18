
let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

console.log(`Using environment config: '${activeEnv}'`)

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

const firebaseConfig = require(`./config/firebase-config.${process.env.GATSBY_FIREBASE_ENVIRONMENT}.json`)

module.exports = {
  siteMetadata: {
    title: `Inclusive Innovation 2030`,
    description: "ii2030 is a catalytic process that begins with a problem and an opportunity and ends with the implementation of the prototype of a systemic solution. It catalyzes collaboration amongst innovators from corporates, startups, the public sector, NGOs and science.",
    image: "https://www.ii2030.com/share-image.png",
    url: "https://www.ii2030.com",
  },
  pathPrefix: `/`,
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Inclusive Innovation 2030",
        short_name: "ii2030",
        start_url: "/",
        background_color: "#FFFFFF",
        theme_color: "#2F4858", // dark blue
        display: "minimal-ui",
        icon: "static/icon.png" // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-source-firebase-nl",
      options: {
        credential: firebaseConfig.serviceAccountKey,
        databaseURL: firebaseConfig.databaseURL,
        types: [
          {
            type: "Tracks",
            path: "tracks",
            map: node => {
              node.content = JSON.stringify(node.content);

              return node
            },
          },
          {
            type: "Pages",
            path: "pages",
            map: node => {
              node.content = JSON.stringify(node.content);

              return node
            },
          },
        ]
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        precision: 8,
      },
    }
  ]
};
