export interface LeetApiUser {
  name: string;
  email: string;
  phoneNumber: string;
  office: string;
  manager: string;
  orgUnit: string;
  mainText: string;
  gitHub: object;
  twitter: object;
  stackOverflow: object;
  linkedIn: string;
  imagePortraitUrl: string;
  imageWallOfLeetUrl: string;
  highlighted: boolean;
  published: boolean;
  primaryRole: string;
  secondaryRole: object;
  area: string;
}

export async function fetchLeetApiUserData(
  token?: string
): Promise<LeetApiUser[]> {
  if (!token) {
    throw new Error("Leet api token is not defined.");
  }

  const response = await fetch("https://api.1337co.de/v3/employees", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  return await response.json();
}
