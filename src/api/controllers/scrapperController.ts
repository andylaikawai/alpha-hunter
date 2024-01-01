import { Request, Response } from 'express';
import {
  scrapeLatestBinanceListingArticle,
} from '../services/scrapperService.js';

export const getLatestBinanceArticle = async (_: Request, res: Response) => {
  try {
    const posts = await scrapeLatestBinanceListingArticle()
    res.json(posts);
  } catch (error) {
    // @ts-ignore
    res.status(500).send(error.message);
  }
};