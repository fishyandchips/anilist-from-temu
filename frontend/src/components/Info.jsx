import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { StarFilledIcon, HeartIcon, HeartFilledIcon, ChevronDownIcon, Link2Icon } from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton";
import { ScoreChart } from './ScoreChart';
import axios from 'axios';

import NavBar from './NavBar';
import SwipeCarousel from './SwipeCarousel';

const Info = () => { 
  const { medium, id, title } = useParams();
  const [header, setHeader] = useState(null);
  const [fullDescription, setFullDescription] = useState(false);
  const [showSpoilerTags, setShowSpoilerTags] = useState(false);
  const [metadata, setMetadata] = useState(null);
  const [tags, setTags] = useState(null);
  const [externalLinks, setExternalLinks] = useState(null);
  const [characters, setCharacters] = useState(null);
  const [staff, setStaff] = useState(null);
  const [recommended, setRecommended] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [stats, setStats] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setFullDescription(false);
    setShowSpoilerTags(false);
    getSeriesData();
  }, [id]);

  const getSeriesData = async () => {
    const query = `
    query Page($mediaId: Int, $page: Int, $perPage: Int, $sort: [CharacterSort], $staffPage2: Int, $staffPerPage2: Int, $staffSort2: [StaffSort], $asHtml: Boolean, $language: StaffLanguage, $voiceActorsSort2: [StaffSort], $recommendationsSort2: [RecommendationSort], $recommendationsPage2: Int, $recommendationsPerPage2: Int) {
      Media(id: $mediaId) {
        format
        episodes
        duration
        status
        startDate {
          day
          month
          year
        }
        endDate {
          day
          month
          year
        }
        season
        seasonYear
        favourites
        title {
          english
          native
          romaji
        }
        tags {
          isGeneralSpoiler
          rank
          name
        }
        externalLinks {
          icon
          site
          url
          language
          color
        }
        genres
        bannerImage
        coverImage {
          extraLarge
        }
        description(asHtml: $asHtml)
        characters(page: $page, perPage: $perPage, sort: $sort) {
          edges {
            name
            node {
              image {
                large
              }
              name {
                full
              }
            }
            role
            voiceActors(language: $language, sort: $voiceActorsSort2) {
              image {
                large
              }
              languageV2
              name {
                full
              }
            }
          }
        }
        staff(page: $staffPage2, perPage: $staffPerPage2, sort: $staffSort2) {
          edges {
            node {
              image {
                large
              }
              name {
                full
              }
            }
            role
          }
        }
        trailer {
          id
        }
        averageScore
        popularity
        rankings {
          rank
          type
          allTime
        }
        stats {
          scoreDistribution {
            amount
            score
          }
        }
        recommendations(sort: $recommendationsSort2, page: $recommendationsPage2, perPage: $recommendationsPerPage2) {
          nodes {
            mediaRecommendation {
              coverImage {
                extraLarge
              }
              title {
                english
                romaji
              }
              type
              id
            }
          }
        }
      }
    }
    `;
    const variables = {
      mediaId: id,
      page: 1,
      perPage: 6,
      sort: "ID",
      language: "JAPANESE",
      staffPage2: 1,
      staffPerPage2: 6,
      staffSort2: "RELEVANCE",
      asHtml: false,
      voiceActorRolesSort2: "RELEVANCE",
      recommendationsSort2: "RATING_DESC",
      recommendationsPage2: 1,
      recommendationsPerPage2: 10
    };

    try {
      const res = await axios.post('https://graphql.anilist.co', {
        query,
        variables
      });
      console.log(res.data);
      const { 
        title, 
        tags, 
        externalLinks, 
        genres, 
        bannerImage,
        coverImage,
        description,
        averageScore,
        popularity,
        characters,
        staff,
        trailer,
        rankings,
        stats,
        recommendations,
        ...rest 
      } = res.data.data.Media;

      setHeader({ title, genres, bannerImage, coverImage, description, averageScore, popularity, rankings });
      setMetadata({ title, ...rest });
      setTags(tags);
      setExternalLinks(externalLinks);
      setCharacters(characters);
      setStaff(staff);
      setRecommended(recommendations);
      setTrailer(trailer);
      setStats(stats);
    } catch (error) {
      console.error(error);
    }
  }

  const seriesDisplay = (count) => {
    return [...Array(count)].map((_, i) => (
      <Skeleton className="w-[12vw] h-[35vh] bg-[#3C3C3C] rounded-lg shrink-0" />
    ));
  }

  const headerDisplay = () => {
    if (!header) {
      return;
    }

    console.log(header);
    console.log(header.description);
    header.description = header.description.replace(/(<br>\s*)+/g, "\n\n");
    header.description = header.description.replace(/<.*?>/g, "");
    
    console.log(header.description);


    return (
      <div className="w-full relative">
        <div className="z-20 absolute ml-[15rem] mt-[11rem]">
          <div className="w-[13.5rem] h-[19rem] bg-cover bg-center rounded-lg" style={{backgroundImage: `url(${header.coverImage.extraLarge})`}}></div>
          {/* <Skeleton className="w-[13.5rem] h-[19rem] bg-[#999999] rounded-lg" /> */}
          <div className="mt-5 w-full flex flex-row justify-center items-center gap-5">
            <div className="flex flex-row">
              <div className="bg-[#7FC3FF] w-[7.5rem] h-[2.5rem] rounded-tl-full rounded-bl-full border-r border-[#282828] flex justify-center items-center cursor-pointer">
                <span className="text-black text-[1rem]">+ Add to List</span>
              </div>
              <div className="bg-[#7FC3FF] w-[2.5rem] h-[2.5rem] rounded-tr-full rounded-br-full flex justify-center items-center cursor-pointer">
                <ChevronDownIcon className="text-black h-[1rem] w-[1rem]"/>
              </div>
            </div>
            <HeartIcon className="text-white w-[2rem] h-[2rem] cursor-pointer"/>
          </div>
        </div>
        <div className="w-full h-[45vh] pl-[28.5rem] relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center filter blur-sm bg-linear-to-t from-cyan-500 to-blue-500" style={{backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent), url(${header.bannerImage})`}}></div>
          
          <div className="absolute bottom-0 flex flex-col gap-3 ml-10 mb-4">
            <h1 className="text-white text-[1.5rem] font-bold">{header.title.english ? header.title.english : header.title.romaji}</h1>
            <div className="flex flex-row gap-3">
              {header.genres.map(value => (
                <Button variant="outlined" size="sm" className="relative rounded-full">{value}</Button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full py-5 bg-[#1E1E1E] pl-[28.5rem] pr-[15rem]">
          <div className="h-full flex flex-col gap-3 ml-10">
            <div className="flex flex-row gap-10">
              <div className="flex flex-row gap-3 items-center">
                <StarFilledIcon className="text-[#E5C366] w-[2.5rem] h-[2.5rem]"/>
                <div className="flex flex-col">
                  <h2 className="text-white text-[1.7rem] font-bold">{header.averageScore}%</h2>
                  <h3 className="text-white text-[0.8rem] opacity-50">#{header.rankings.filter(ranking => ranking.allTime && ranking.type === "RATED").map(ranking => ranking.rank)} Highest Rated All Time</h3>
                </div>
              </div>

              <div className="flex flex-row gap-3 items-center">
                <HeartFilledIcon className="text-[#FF7F7F] w-[2.5rem] h-[2.5rem]"/>
                <div className="flex flex-col">
                  <h2 className="text-white text-[1.7rem] font-bold">{header.popularity.toLocaleString()}</h2>
                  <h3 className="text-white text-[0.8rem] opacity-50">#{header.rankings.filter(ranking => ranking.allTime && ranking.type === "POPULAR").map(ranking => ranking.rank)} Most Popular All Time</h3>
                </div>
              </div>
            </div>
            <p className="text-white text-[0.9rem] whitespace-pre-line">
              {header.description && (
                !fullDescription && header.description.length > 800 ? `${header.description.substring(0, 800)}..` : header.description
              )}

              {header.description.length > 800 && !fullDescription && (
                <span className="opacity-50 cursor-pointer" onClick={(() => setFullDescription(true))}> Read more</span>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const charactersDisplay = () => {
    if (!characters) {
      return;
    }
    console.log(characters);

    return (
      <div className="flex flex-row flex-wrap justify-between w-full gap-5">
        {characters.edges.map(({ node, role, voiceActors }) => (
          <div className="w-[48.5%] h-[6rem] bg-[#3C3C3C] rounded-lg flex justify-between">
            <div className="flex flex-row gap-5">
              <div className="w-[5rem] h-full bg-white rounded-lg bg-cover bg-center" style={{backgroundImage: `url(${node.image.large})`}}></div>
              <div className="flex flex-col gap-3 my-3 justify-between">
                <span className="text-white text-[1rem]">{node.name.full}</span>
                <span className="text-white text-[1rem]">{role.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())}</span>
                {/* <Skeleton className="w-[10rem] h-[1rem] bg-[#999999] rounded-none" />
                <Skeleton className="w-[4rem] h-[1rem] bg-[#999999] rounded-none" /> */}
              </div>
            </div>
            <div className="flex flex-row gap-5">
              <div className="flex flex-col gap-3 my-3 items-end justify-between">
                <span className="text-white text-[1rem]">{voiceActors.length !== 0 && voiceActors[0].name.full}</span>
                <span className="text-white text-[1rem]">{voiceActors.length !== 0 && voiceActors[0].languageV2}</span>
                {/* <Skeleton className="w-[4rem] h-[1rem] bg-[#999999] rounded-none" />
                <Skeleton className="w-[10rem] h-[1rem] bg-[#999999] rounded-none" /> */}
              </div>
              <div className="w-[5rem] h-full bg-white rounded-lg bg-cover bg-center" style={{backgroundImage: `url(${voiceActors.length !== 0 && voiceActors[0].image.large})`}}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const staffDisplay = () => {
    if (!staff) {
      return;
    }
    console.log(staff);

    return (
      <div className="flex flex-row flex-wrap justify-center w-full gap-5">
        {staff.edges.map(({ node, role }) => (
          <div className="w-[48.5%] h-[6rem] bg-[#3C3C3C] rounded-lg flex justify-between">
            <div className="flex flex-row gap-5">
              <div className="w-[5rem] h-full bg-white rounded-lg bg-cover bg-center" style={{backgroundImage: `url(${node.image.large})`}}></div>
              <div className="flex flex-col gap-3 my-3 justify-between">
                <span className="text-white text-[1rem]">{node.name.full}</span>
                <span className="text-white text-[1rem]">{role}</span>
                {/* <Skeleton className="w-[10rem] h-[1rem] bg-[#999999] rounded-none" />
                <Skeleton className="w-[4rem] h-[1rem] bg-[#999999] rounded-none" /> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const recommendedDisplay = () => {
    if (!recommended) {
      return seriesDisplay(10);
    }
    console.log(recommended);

    return (
      recommended.nodes.map(({ mediaRecommendation }) => (
        <div key={mediaRecommendation.id} className="w-[12vw] h-[35vh] rounded-lg shrink-0 bg-cover bg-center cursor-pointer" 
            style={{backgroundImage: `url(${mediaRecommendation.coverImage.extraLarge})`}}
            onClick={() => navigate(`/${mediaRecommendation.type.toLowerCase()}/${mediaRecommendation.id}/${mediaRecommendation.title.english ? mediaRecommendation.title.english.replaceAll(' ', '-') : mediaRecommendation.title.romaji.replaceAll(' ', '-')}`)}
        >
        </div>
      ))
    );
  }

  const minToHourMin = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours} h ${mins} mins per episode`;
    }
    return `${mins} mins per episode`;
  }

  const formatDate = ({ day, month, year }) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    return `${day} ${months[month - 1]} ${year}`;
  }

  const metadataDetails = () => {
    let { format, episodes, duration, status, startDate, endDate, season, seasonYear, favourites, title } = metadata;
    format === "TV" ? format = format : format = format.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    duration = minToHourMin(duration);
    status = status.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    const aired = `${formatDate(startDate)} - ${formatDate(endDate)}`;
    season = `${season.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())} ${seasonYear}`;
    favourites = favourites.toLocaleString();
    const { romaji, english, native } = title;

    const metadataArray = [
      { label: "Format", value: format }, 
      { label: "Episodes", value: episodes }, 
      { label: "Duration", value: duration }, 
      { label: "Status", value: status }, 
      { label: "Aired", value: aired }, 
      { label: "Season", value: season }, 
      { label: "Favourites", value: favourites }, 
      { label: "Romaji", value: romaji }, 
      { label: "English", value: english }, 
      { label: "Native", value: native }
    ];

    return metadataArray.map(({label, value}, i) => (
      <div key={i} className="text-white opacity-50">
        <h2 className="font-bold">{label}</h2>
        <h3>{value}</h3>
      </div>
    ));
  }

  const tagDetails = () => {
    console.log(tags);
    return tags.map(({ isGeneralSpoiler, rank, name }, i) => (
      !isGeneralSpoiler ? (
        <div key={i} className="flex flex-row flex-wrap justify-between items-center">
          <h3>{name}</h3>
          <h3>{rank}%</h3>
        </div>
      ) : (
        showSpoilerTags && (
          <div key={i} className="flex flex-row flex-wrap justify-between items-center">
            <h3 className="text-[#FF7F7F]">{name}</h3>
            <h3 className="text-[#FF7F7F]">{rank}%</h3>
          </div>
        )
      )
    ));
  }

  const externalLinkDetails = () => {
    return externalLinks.map(({ id, icon, site, url, language, color }) => (
      <div key={id} className="flex flex-row gap-3 items-center">
        <div className="aspect-square w-5 h-5 bg-cover bg-center p-[0.2rem] rounded-sm flex justify-center items-center" style={{backgroundColor: color ? color : "#3C3C3C"}}>
          {icon ? (
            <img src={icon}></img>
          ) : (
            <Link2Icon className="text-white h-[1rem] w-[1rem]"/>
          )}
        </div>
        <a href={url} target="_blank" className="flex flex-row gap-1">
          <span className="text-white">{site}</span>
          <span className="text-[0.7rem] mt-auto">{language === "Japanese" && "JP"}</span>
        </a>
      </div>
    ));
  }

  return (
    <>
      <NavBar />

      <div className="flex flex-row flex-wrap mt-[5rem]">
        {headerDisplay()}

        {metadata && tags && externalLinks && (
          <div className="w-[20%] bg-[#232323] flex flex-col gap-6 p-6">
            {metadataDetails()}

            <div className="text-white opacity-50 flex flex-col gap-2">
              <h2 className="font-bold">Tags</h2>

              {tagDetails()}

              {!showSpoilerTags && (
                <span 
                  className="text-[0.75rem] cursor-pointer hover:text-[#FF7F7F] transition-all duration-300 ease-in-out"
                  onClick={(() => setShowSpoilerTags(true))}
                >
                  Show spoiler tags
                </span>
              )}
            </div>

            <div className="text-white text-opacity-50 flex flex-col gap-2">
              <h2 className="font-bold">External & Streaming</h2>

              {externalLinkDetails()}
            </div>
          </div>
        )}

        <div className="transition-all duration-300 ease-in-out flex flex-col gap-10 p-10 w-[80%]">
          <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-white font-bold text-[1.2rem]">Characters</h2>
              <p className="text-white opacity-50 text-[1rem] hover:opacity-100 hover:cursor-pointer transition-all duration-300 ease-in-out">View all</p>
            </div>

            {charactersDisplay()}
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-white font-bold text-[1.2rem]">Staff</h2>
              <p className="text-white opacity-50 text-[1rem] hover:opacity-100 hover:cursor-pointer transition-all duration-300 ease-in-out">View all</p>
            </div>

            {staffDisplay()}
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="text-white font-bold text-[1.2rem]">Recommended</h2>

            <SwipeCarousel
              elements={recommended ? recommendedDisplay() : seriesDisplay(10)}
            />
          </div>

          <div className="flex flex-row">
            <div className="w-[50%] flex flex-col gap-5">
              <h2 className="text-white font-bold text-[1.2rem]">Trailer</h2>

              {trailer ? (
                <iframe 
                  className="w-[35vw] h-[40vh] rounded-lg shrink-0" 
                  src={`https://www.youtube.com/embed/${trailer.id}`} 
                  title="YouTube video player" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerpolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                >
                </iframe>
              ) : (
                <Skeleton className="w-[35vw] h-[40vh] bg-[#3C3C3C] rounded-lg shrink-0" />
              )}
            </div>
            <div className="w-[50%] flex flex-col gap-5">
              <h2 className="text-white font-bold text-[1.2rem]">Following</h2>
    
              <div className="flex flex-col gap-2">
                {[...Array(4)]
                  .map((_, i) => (
                    <div className="w-full flex flex-row justify-between items-center">
                      <div className="flex flex-row h-[4rem] gap-5">
                        <Skeleton className="aspect-square h-full bg-[#3C3C3C] rounded-lg" />
                        <div className="flex flex-col gap-3">
                          <Skeleton className="w-[10rem] h-[1rem] bg-[#3C3C3C]" />
                          <Skeleton className="w-[4rem] h-[1rem] bg-[#3C3C3C]" />
                        </div>
                      </div>

                      <div className="flex flex-row h-[4rem] w-full text-right items-center">
                        <span className="text-white font-bold opacity-50 w-[60%]">Completed</span>
                        <span className="text-white font-bold opacity-50 w-[40%]">{Math.floor(Math.random() * 10) + 1}/10</span>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="text-white font-bold text-[1.2rem]">Score Distribution</h2>
  
            {stats && <ScoreChart data={stats.scoreDistribution} />}
          </div>
        </div>
      </div>



    </>
  )
}

export default Info
