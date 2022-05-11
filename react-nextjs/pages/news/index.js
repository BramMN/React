import { Fragment } from "react";
import Link from "next/link";

function Homepage() {
  return (
    <Fragment>
      <h1>The News Page</h1>
      <ul>
        <li>
          <Link href="/news/test">NextJS Is Great</Link>
        </li>
        <li>Something Else</li>
      </ul>
    </Fragment>
  );
}

export default Homepage;
