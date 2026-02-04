
import { PHPost } from '../types';

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

// Helper to execute GraphQL queries via our Vercel API Proxy
async function phQuery(query: string, variables: any = {}) {
  try {
    const response = await fetch("/api/ph", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });
    
    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

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
            slug
            website
            votesCount
            thumbnail {
              url
            }
            topics {
              edges {
                node {
                  name
                  slug
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
              slug
              website
              votesCount
              thumbnail {
                url
              }
              topics {
                edges {
                  node {
                    name
                    slug
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

export async function fetchToolDetails(idOrSlug: string): Promise<PHPost | null> {
  // Determine query variable based on format
  // If it's a numeric string, assume ID (though V2 IDs are strings/base64, numeric might work for legacy).
  // If it has hyphens or letters, assume slug.
  const isSlug = isNaN(Number(idOrSlug));

  const query = `
    query getPost($id: ID, $slug: String) {
      post(id: $id, slug: $slug) {
        id
        name
        tagline
        description
        url
        slug
        website
        votesCount
        thumbnail {
          url
        }
        topics {
          edges {
            node {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const variables = isSlug ? { slug: idOrSlug } : { id: idOrSlug };
  const data = await phQuery(query, variables);
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
