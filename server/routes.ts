import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getChatResponse, generateMenu } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // AI Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Message is required" });
      }

      const response = await getChatResponse(message);
      res.json({ response });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Không thể xử lý yêu cầu. Vui lòng thử lại sau." });
    }
  });

  // Menu Generation endpoint
  app.post("/api/generate-menu", async (req, res) => {
    try {
      const { budget, mealsPerDay, diet, skillLevel } = req.body;

      const menu = await generateMenu({
        budget,
        mealsPerDay,
        diet,
        skillLevel
      });

      res.json({ menu });
    } catch (error) {
      console.error("Menu generation error:", error);
      res.status(500).json({ error: "Không thể tạo thực đơn. Vui lòng thử lại sau." });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
