import React from "react";
import Container from "@material-ui/core/Container";

export default (props) => {
  return (
    <section {...props}>
      <Container maxWidth="lg">
      { props.children }
      </Container>
    </section>
  );
};


