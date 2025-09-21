import axios from 'axios';

export const fetchSeriesData = async (id) => {
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
      countryOfOrigin
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
    return res.data.data.Media;
  } catch (error) {
    console.error(error);
  }
}