import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../lib/appContext";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import { onError } from "../lib/errorLib";
import { API } from "aws-amplify";
import "./Home.css";

export default function Home() {
  const [gifts, setGifts] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
  
      try {
        const gifts = await loadGifts();
        setGifts(gifts);
      } catch (e) {
        onError(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [isAuthenticated]);
  
  function loadGifts() {
    return API.get("gifts", "/gifts");
  }

  function renderGiftsList(gifts) {
    return (
        <>
          <LinkContainer to="/gifts/new">
            <ListGroup.Item action className="py-3 text-nowrap text-truncate">
              <BsPencilSquare size={17} />
              <span className="ml-2 font-weight-bold">Create a new gift</span>
            </ListGroup.Item>
          </LinkContainer>
          {gifts.map(({ giftId, content, createdAt }) => (
            <LinkContainer key={giftId} to={`/gifts/${giftId}`}>
              <ListGroup.Item action>
                <span className="font-weight-bold">
                  {content.trim().split("\n")[0]}
                </span>
                <br />
                <span className="text-muted">
                  Created: {new Date(createdAt).toLocaleString()}
                </span>
              </ListGroup.Item>
            </LinkContainer>
          ))}
        </>
      );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Gift</h1>
        <p className="text-muted">A simple gift taking app</p>
      </div>
    );
  }

  function renderGifts() {
    return (
      <div className="gifts">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Gifts</h2>
        <ListGroup>{!isLoading && renderGiftsList(gifts)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderGifts() : renderLander()}
    </div>
  );
}