import styled from "styled-components";
import { SyntheticEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

import ErrorMessage from "../../molecules/ErrorMessage";

interface TableProps {
  title: string;
  url: string;
  thumbnail: string;
  date: string;
}

const VideoItemWrapper = styled.article`
  margin-top: 30px;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, auto));
  column-gap: 10px;
  row-gap: 20px;
`;

const MatchTeams = styled.h3`
  margin-bottom: 0;
`;

const MatchDate = styled.p`
  font-weight: 600;
  color: #394867;
  margin: 0;
`;

const Img = styled.img`
  width: 300px;
  height: 200px;
`;

const FootballVideo = ({ userInput }: { userInput: string }) => {
  let [table, setTable] = useState<TableProps[]>([]);

  let [error, setError] = useState(null);

  let getAPI = async () => {
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_VIDEO_URL}`,
      headers: {
        "X-RapidAPI-Key": `${process.env.REACT_APP_KEY}`,
        "X-RapidAPI-Host": `${process.env.REACT_APP_VIDEO_HOST}`,
      },
    };

    try {
      const response = await axios.request(options);
      setTable(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        let errorStatus = error.response?.data.details;
        setError(errorStatus);
      }
    }
  };

  useEffect(() => {
    getAPI();
  }, []);

  let dateHandler = (gameDate: string) => {
    const newDate = new Date(gameDate);

    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const date = String(newDate.getDate()).padStart(2, "0");
    const hour = String(newDate.getHours()).padStart(2, "0");
    const minute = String(newDate.getMinutes()).padStart(2, "0");

    const koreaDate = `${year}-${month}-${date} ${hour}:${minute}`;

    return koreaDate;
  };

  const filteredList = table.filter((item) => {
    return item.title.toUpperCase().includes(userInput.toUpperCase());
  });

  const imageHandler = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `${process.env.PUBLIC_URL}/assets/img/football-default-img.svg`;
  };

  return error === null ? (
    <VideoItemWrapper>
      {filteredList.map((list) => (
        <section key={list.url}>
          <MatchTeams>{list.title}</MatchTeams>
          <a href={list.url} target="_blank" rel="noreferrer">
            <Img src={list.thumbnail} alt="thumbnail" onError={imageHandler} />
          </a>
          <MatchDate>{dateHandler(list.date)}</MatchDate>
        </section>
      ))}
    </VideoItemWrapper>
  ) : (
    <ErrorMessage category="VIDEO" error={error} />
  );
};

export default FootballVideo;
