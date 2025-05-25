import axios from 'axios';
import { jsPDF } from 'jspdf';

const OLLAMA_API_URL = 'http://localhost:11434/api/generate';
const MODEL_NAME = 'deepseek-r1';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

export class AIService {
  private static async generateResponse(prompt: string): Promise<string> {
    try {
      console.log('Sending request to Ollama API:', {
        url: OLLAMA_API_URL,
        model: MODEL_NAME,
        prompt
      });

      const response = await axios.post(OLLAMA_API_URL, {
        model: MODEL_NAME,
        prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          top_k: 40
        }
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Received response from Ollama API');
      const data = response.data;
      return data.response;
    } catch (error) {
      console.error('Error generating AI response:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
      }
      throw new Error('Failed to generate AI response');
    }
  }

  static async generateChatResponse(messages: Message[]): Promise<string> {
    const formattedPrompt = messages
      .map(msg => `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`)
      .join('\n') + '\nAssistant:';
    
    return this.generateResponse(formattedPrompt);
  }

  static async generateStudyPlan(subject: string, duration: string, goals: string): Promise<{ text: string; pdf: Blob }> {
    const prompt = `Create a detailed study plan for the following:
Subject: ${subject}
Duration: ${duration}
Learning Goals: ${goals}

Please provide a structured plan including:
1. Daily/weekly schedule
2. Key topics to cover
3. Recommended resources
4. Practice exercises
5. Milestones and progress tracking`;

    const response = await this.generateResponse(prompt);
    
    // Generate PDF
    const pdf = new jsPDF();
    const title = `Study Plan: ${subject}`;
    
    // Add title
    pdf.setFontSize(20);
    pdf.text(title, 20, 20);
    
    // Add content
    pdf.setFontSize(12);
    const splitText = pdf.splitTextToSize(response, 170); // 170 is the max width
    pdf.text(splitText, 20, 40);
    
    // Get the PDF as blob
    const pdfBlob = pdf.output('blob');
    
    return {
      text: response,
      pdf: pdfBlob
    };
  }
} 