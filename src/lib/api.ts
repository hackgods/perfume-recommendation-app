/**
 * API Configuration and Utilities
 * API client for perfume recommendation system
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * API Error class for better error handling
 */
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = "APIError";
  }
}

/**
 * API Response wrapper
 */
export interface APIResponse<T> {
  data: T;
  error?: {
    message: string;
    code?: string;
  };
}

/**
 * Perfume type definition
 */
export interface Perfume {
  id: number;
  name: string;
  brand: string;
  image: string;
}

/**
 * Pagination metadata
 */
export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  has_more: boolean;
}

/**
 * Search results response
 */
export interface SearchResultsResponse {
  results: Perfume[];
  pagination: Pagination;
}

/**
 * Search perfumes request parameters
 */
export interface SearchPerfumesParams {
  query: string;
  gender?: "male" | "female" | "unisex";
  limit?: number;
  offset?: number;
}

/**
 * Recommendation request payload
 */
export interface RecommendationRequest {
  perfume_ids: number[];
  type?: "male" | "female" | "unisex" | "any";
}

/**
 * Recommendation result
 */
export interface Recommendation {
  id: number;
  name: string;
  brand: string;
  image: string;
  score: number;
  explanation?: string;
  shared_notes?: string[];
  shared_accords?: string[];
}

/**
 * Recommendation response
 */
export interface RecommendationResponse {
  recommendations: Recommendation[];
  taste_fingerprint?: {
    dominant_families: string[];
    preferred_accords: string[];
    common_notes: string[];
  };
}

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.message || `API request failed: ${response.statusText}`,
        response.status,
        errorData.code
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new APIError(
        "Network error: Unable to connect to the server",
        0,
        "NETWORK_ERROR"
      );
    }
    throw new APIError(
      error instanceof Error ? error.message : "An unknown error occurred",
      undefined,
      "UNKNOWN_ERROR"
    );
  }
}

/**
 * Search for perfumes by query string
 * @param params - Search parameters
 * @returns Promise with search results
 */
export async function searchPerfumes(
  params: SearchPerfumesParams
): Promise<SearchResultsResponse> {
  const { query, gender, limit = 15, offset = 0 } = params;

  if (!query || query.trim().length < 2) {
    return {
      results: [],
      pagination: {
        total: 0,
        limit,
        offset,
        has_more: false,
      },
    };
  }

  const queryParams = new URLSearchParams({
    q: query.trim(),
    limit: limit.toString(),
    offset: offset.toString(),
  });

  // Only add gender parameter if it's specified
  if (gender) {
    queryParams.append("gender", gender);
  }

  const response = await fetchAPI<{ data: SearchResultsResponse }>(
    `/perfumes/search?${queryParams.toString()}`
  );

  return response.data;
}

/**
 * Get perfume recommendations based on selected perfumes
 * @param request - Recommendation request payload
 * @returns Promise with recommendations
 */
export async function getRecommendations(
  request: RecommendationRequest
): Promise<RecommendationResponse> {
  if (!request.perfume_ids || request.perfume_ids.length === 0) {
    throw new APIError("At least one perfume ID is required", 400, "INVALID_REQUEST");
  }

  const response = await fetchAPI<{ data: RecommendationResponse }>(
    "/recommendations",
    {
      method: "POST",
      body: JSON.stringify(request),
    }
  );

  return response.data;
}

/**
 * Get perfume details by ID
 * @param id - Perfume ID
 * @returns Promise with perfume details
 */
export async function getPerfumeById(id: number): Promise<Perfume> {
  if (!id || id <= 0) {
    throw new APIError("Invalid perfume ID", 400, "INVALID_ID");
  }

  const response = await fetchAPI<{ data: Perfume }>(`/perfumes/${id}`);
  return response.data;
}

/**
 * Export API base URL for reference
 */
export { API_BASE_URL };
