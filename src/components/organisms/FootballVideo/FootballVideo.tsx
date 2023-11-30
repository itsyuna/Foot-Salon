import styled from "styled-components";
import { SyntheticEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

import ErrorMessage from "../../molecules/ErrorMessage";
import LoadingMessage from "../../molecules/LoadingMessage";
import { media } from "../../../ui/MediaQuery/mediaQuery";

interface VideoProps {
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

  ${media.small`
    grid-template-columns: repeat(auto-fill, minmax(50%, auto));
  `}

  ${media.medium`
    grid-template-columns: repeat(auto-fill, minmax(40%, auto));
  `}
`;

const MatchTeams = styled.p`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0;

  ${media.small`
    font-size: 0.8rem;
  `}
`;

const MatchDate = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
  color: #394867;
  margin: 0;

  ${media.small`
    font-size: 0.7rem;
  `}
`;

const Img = styled.img`
  width: 300px;
  height: 200px;
`;

const FootballVideo = ({ userInput }: { userInput: string }) => {
  let [video, setVideo] = useState<VideoProps[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
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

    setLoading(true);

    try {
      const response = await axios.request(options);
      setVideo(response.data);
      setLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        let errorStatus = error.response?.data.details;
        setError(errorStatus);
        setLoading(false);
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

  const filteredList = video.filter((item) => {
    return item.title.toUpperCase().includes(userInput.toUpperCase());
  });

  const thumbnailHandler = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `${process.env.PUBLIC_URL}/assets/images/thumbnail-default.jpg`;
  };

  return error === null ? (
    loading ? (
      <LoadingMessage contents="하이라이트 영상" size="large" />
    ) : (
      <VideoItemWrapper>
        {filteredList.map((list) => (
          <section key={list.url}>
            <MatchTeams>{list.title}</MatchTeams>
            <a href={list.url} target="_blank" rel="noreferrer">
              <Img
                src={list.thumbnail}
                alt="Football match thumbnail"
                onError={thumbnailHandler}
              />
            </a>
            <MatchDate>{dateHandler(list.date)}</MatchDate>
          </section>
        ))}
      </VideoItemWrapper>
    )
  ) : (
    <ErrorMessage category="VIDEO" error={error} />
  );
};

export default FootballVideo;
