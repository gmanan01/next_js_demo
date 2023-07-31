import axios, { AxiosRequestConfig } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getBooks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const axiosConfig: AxiosRequestConfig = {
    method: req.method,
    url: "http://15.165.74.54:3000",
    params: req.query,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios(axiosConfig);
  res.status(response.status).json(response.data);
}
