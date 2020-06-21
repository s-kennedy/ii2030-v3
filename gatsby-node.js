const path = require("path");


// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions;

//   return new Promise((resolve, reject) => {
//       graphql(
//         `
//           {
//             allTracks {
//               edges {
//                 node {
//                   id
//                   title
//                   slug
//                   template
//                   page_type
//                   navigation {
//                     order
//                     displayTitle
//                   }
//                   content
//                 }
//               }
//             }
//           }
//         `
//       ).then(result => {
//         if (result.errors) {
//           console.log("ERROR CREATING TRACKS", result.errors);
//           reject(result.errors);
//         }

//         result.data.allTracks.edges.forEach(edge => {
//           console.log('CREATING TRACK', edge.node.title)
//           const template = path.resolve(
//             `src/templates/${edge.node.template}`
//           );
//           createPage({
//             path: edge.node.slug, // required
//             component: template,
//             context: {
//               id: edge.node.id
//             }
//           });
//         });

//         resolve();
//       })
//   });
// };


exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-rte/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}