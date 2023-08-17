import styled from "styled-components";
import { SyntheticEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

import ErrorMessage from "../../molecules/ErrorMessage";

interface LeagueName {
  name: string;
}

interface TableProps {
  title: string;
  embed: string;
  url: string;
  thumbnail: string;
  date: string;
  competition: LeagueName;
}

const VideoItemWrapper = styled.article`
  margin-top: 30px;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, auto));
  column-gap: 10px;
  row-gap: 20px;
`;

const MatchTeams = styled.p`
  font-weight: 600;
  font-size: 1.2rem;
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

  const imgHandler = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `${process.env.PUBLIC_URL}/assets/img/football-default-img.svg`;
  };

  return error === null ? (
    <VideoItemWrapper>
      {filteredList.map((list, idx) => (
        <div key={idx}>
          <MatchTeams>{list.title}</MatchTeams>
          <div>
            <a href={list.url} target="_blank" rel="noreferrer">
              <Img src={list.thumbnail} alt="thumbnail" onError={imgHandler} />
            </a>
          </div>
          <MatchDate>{dateHandler(list.date)}</MatchDate>
        </div>
      ))}
    </VideoItemWrapper>
  ) : (
    <ErrorMessage category="VIDEO" error={error} />
  );
};

export default FootballVideo;
