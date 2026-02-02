import { PHPost } from '../types';

const API_KEY = "7F2ibwHqAZ82bsGNiIhZADWvF7sc2pqt3QQK-gAs55c";
const API_SECRET = "bQ7BWD2gdTSy1e1LCg-1b2eGYqFfWKaf0Jn3adYI2RI";
const GRAPHQL_ENDPOINT = "https://api.producthunt.com/v2/api/graphql";
const TOKEN_ENDPOINT = "https://api.producthunt.com/v2/oauth/token";

let accessToken: string | null = null;

export interface PHPageInfo {
    endCursor: string;
    hasNextPage: boolean;
}

export interface PHFetchResult {
    posts: PHPost[];
    pageInfo: PHPageInfo;
}

export interface PHTopic {
    id: string;
    name: string;
    slug: string;
    description?: string;
}

async function getAccessToken(): Promise<string> {
  if (accessToken) return accessToken;

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: API_KEY,
        client_secret: API_SECRET,
        grant_type: "client_credentials",
      }),
    });

    const data = await response.json();
    if (data.access_token) {
      accessToken = data.access_token;
      return data.access_token;
    }
    throw new Error("Failed to get access token");
  } catch (error) {
    console.error("Product Hunt Auth Error:", error);
    return "";
  }
}

// Helper to execute GraphQL queries
async function phQuery(query: string, variables: any = {}) {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables }),
    });
    return await response.json();
  } catch (error) {
    console.error("Product Hunt Query Error:", error);
    return null;
  }
}

export async function fetchToolsByTopic(topicSlug: string, cursor?: string): Promise<PHFetchResult> {
  const query = `
    query getPostsByTopic($topic: String!, $cursor: String) {
      posts(topic: $topic, first: 20, order: VOTES, after: $cursor) {
        pageInfo {
            endCursor
            hasNextPage
        }
        edges {
          node {
            id
            name
            tagline
            description
            url
            website
            votesCount
            thumbnail {
              url
            }
            topics {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await phQuery(query, { topic: topicSlug, cursor });
  return {
      posts: data?.data?.posts?.edges?.map((edge: any) => edge.node) || [],
      pageInfo: data?.data?.posts?.pageInfo || { endCursor: '', hasNextPage: false }
  };
}

export async function fetchTrendingTools(cursor?: string): Promise<PHFetchResult> {
    const query = `
      query getTrendingPosts($cursor: String) {
        posts(first: 20, order: RANKING, after: $cursor) {
          pageInfo {
              endCursor
              hasNextPage
          }
          edges {
            node {
              id
              name
              tagline
              description
              url
              website
              votesCount
              thumbnail {
                url
              }
              topics {
                edges {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;
  
    const data = await phQuery(query, { cursor });
    return {
        posts: data?.data?.posts?.edges?.map((edge: any) => edge.node) || [],
        pageInfo: data?.data?.posts?.pageInfo || { endCursor: '', hasNextPage: false }
    };
}

export async function fetchToolDetails(id: string): Promise<PHPost | null> {
  const query = `
    query getPost($id: ID!) {
      post(id: $id) {
        id
        name
        tagline
        description
        url
        website
        votesCount
        thumbnail {
          url
        }
        topics {
          edges {
            node {
              name
            }
          }
        }
      }
    }
  `;

  const data = await phQuery(query, { id });
  return data?.data?.post || null;
}

export async function fetchTopics(): Promise<PHTopic[]> {
    const query = `
      query getTopics {
        topics(first: 50, order: FOLLOWERS_COUNT) {
          edges {
            node {
              id
              name
              slug
              description
            }
          }
        }
      }
    `;
  
    const data = await phQuery(query);
    return data?.data?.topics?.edges?.map((edge: any) => edge.node) || [];
}
