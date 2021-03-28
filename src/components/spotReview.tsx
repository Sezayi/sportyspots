import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/router";
import { useQuery, useMutation, gql } from "@apollo/client";
// import { loadIdToken } from "src/auth/firebaseAdmin";
// import Layout from "src/components/layout";
// import { useAuth } from "src/auth/useAuth";
import {
  createSpotReview,
  createSpotReviewVariables,
} from "src/generated/createSpotReview";
import { ShowSpotQuery_spot } from "src/generated/ShowSpotQuery";

const ADD_SPOTREVIEW = gql`
  mutation createSpotReview($input: SpotReviewInput!) {
    createSpotReview(input: $input) {
      id
      creator
      spotId
      rating
      comments
      spot {
        id
        reviews {
          id
        }
      }
    }
  }
`;

const SpotReview: React.FC<{ spot: ShowSpotQuery_spot }> = ({ spot }) => {
  // const [rating, setRating] = useState<number[]>([]);

  const [hover, setHover] = useState<number>(0);

  const [mutate, status] = useMutation<
    createSpotReview,
    createSpotReviewVariables
  >(ADD_SPOTREVIEW);

  //status:
  //Mutation result:
  // Property	Type	Description
  // data	TData	The data returned from your mutation. It can be undefined if ignoreResults is true.
  // loading	boolean	A boolean indicating whether your mutation is in flight
  // error	ApolloError	Any errors returned from the mutation
  // called	boolean	A boolean indicating if the mutate function has been called
  // client	ApolloClient	Your ApolloClient instance. Useful for invoking cache methods outside the context of the update function, such as client.writeData and client.readQuery.

  const addRating = (newRating: number) => {
    // setRating([...rating, newRating]);
    mutate({
      variables: {
        input: {
          comments: "comment",
          rating: newRating,
          spotId: spot.id, //?
        },
      },
    })
      .then(() => {
        alert("Thanks for submitting your review!");
      })
      .catch((e) => {
        alert("Oops, something went wrong. Try refreshing the page.");
      });
  };

  console.log(spot);

  // const reviewCount = rating.length;

  const reviewAverage: number =
    spot.reviews.length === 0
      ? 0
      : spot.reviews.reduce((a, b) => a + b.rating, 0) / spot.reviews.length;

  const roundedReviewAverage: string = reviewAverage.toFixed(1);

  return (
    <div className="flex">
      <p className="pr-2">Review this spot:</p>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i}>
            <input
              className="hidden"
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => addRating(ratingValue)}
            />

            <FaStar
              className="cursor-pointer"
              size={20}
              color={ratingValue <= hover ? "#ffc107" : "e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}

      <div className="pl-4 font-medium flex">
        <FaStar size={20} color="#ffc107" />
        <div className="pl-2">{roundedReviewAverage}</div>
        <div className="pl-2">({spot.reviews.length} reviews)</div>
      </div>
    </div>
  );
};

export default SpotReview;
