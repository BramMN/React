import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
  return (
    <MeetupDetail
      image="https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg"
      title="First Meetup"
      address="Some Street"
      description="First meetup"
    />
  );
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetup_id: "m1",
        },
      },
      {
        params: {
          meetup_id: "m2",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  //fetch data for a single meetup

  const meetupid = context.params.meetup_id;
  console.log(meetupid);

  return {
    props: {
      meetupData: {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
        id: meetupid,
        title: "First Meetup",
        address: "Some Street",
        description: "First meetup",
      },
    },
  };
}

export default MeetupDetails;
