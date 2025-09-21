import axios from 'axios';

export const fetchHomeSeries = async () => {
  const query = `
  query HomeSeries(
    $forYouPage: Int, $forYouPerPage: Int, $forYouSort: [RecommendationSort],
    $trendingPage: Int, $trendingPerPage: Int, $trendingSort: [MediaSort], $trendingType: MediaType,
    $popularSeasonPage: Int, $popularSeasonPerPage: Int, $popularSeasonSort: [MediaSort], $popularSeasonType: MediaType, $popularSeason: MediaSeason, $popularSeasonYear: Int,
    $upcomingPage: Int, $upcomingPerPage: Int, $upcomingSort: [MediaSort], $upcomingType: MediaType, $upcomingSeason: MediaSeason, $upcomingSeasonYear: Int,
    $allTimePage: Int, $allTimePerPage: Int, $allTimeSort: [MediaSort], $allTimeType: MediaType
  ) {
    forYou: Page(page: $forYouPage, perPage: $forYouPerPage) {
      recommendations(sort: $forYouSort) {
        media {
          id
          title { english romaji }
          coverImage { large }
          type
        }
      }
    }
    trendingNow: Page(page: $trendingPage, perPage: $trendingPerPage) {
      media(sort: $trendingSort, type: $trendingType) {
        id
        title { english romaji }
        coverImage { large }
        type
      }
    }
    popularThisSeason: Page(page: $popularSeasonPage, perPage: $popularSeasonPerPage) {
      media(sort: $popularSeasonSort, type: $popularSeasonType, season: $popularSeason, seasonYear: $popularSeasonYear) {
        id
        title { english romaji }
        coverImage { large }
        type
      }
    }
    upcomingNextSeason: Page(page: $upcomingPage, perPage: $upcomingPerPage) {
      media(sort: $upcomingSort, type: $upcomingType, season: $upcomingSeason, seasonYear: $upcomingSeasonYear) {
        id
        title { english romaji }
        coverImage { large }
        type
      }
    }
    allTimePopular: Page(page: $allTimePage, perPage: $allTimePerPage) {
      media(sort: $allTimeSort, type: $allTimeType) {
        id
        title { english romaji }
        coverImage { large }
        type
      }
    }
  }
  `;

  const variables = {
    forYouPage: 1,
    forYouPerPage: 10,
    forYouSort: "RATING_DESC",

    trendingPage: 1,
    trendingPerPage: 10,
    trendingSort: "TRENDING_DESC",
    trendingType: "ANIME",

    popularSeasonPage: 1,
    popularSeasonPerPage: 10,
    popularSeasonSort: "POPULARITY_DESC",
    popularSeasonType: "ANIME",
    popularSeason: "SUMMER",
    popularSeasonYear: 2025,

    upcomingPage: 1,
    upcomingPerPage: 10,
    upcomingSort: "POPULARITY_DESC",
    upcomingType: "ANIME",
    upcomingSeason: "FALL",
    upcomingSeasonYear: 2025,

    allTimePage: 1,
    allTimePerPage: 10,
    allTimeSort: "POPULARITY_DESC",
    allTimeType: "ANIME"
  };

  try {
    const res = await axios.post('https://graphql.anilist.co', {
      query,
      variables,
    });

    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};