import https from 'https';
import { QUANTUM_CONTEXT } from '../config/constants';

export class MistralService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(prompt: string): Promise<string> {
    const data = JSON.stringify({
      model: QUANTUM_CONTEXT.MODEL,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.mistral.ai',
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data)
        }
      };

      const req = https.request(options, (res) => {
        let responseData = '';
        res.on('data', chunk => responseData += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(responseData);
            resolve(json.choices[0].message.content);
          } catch (err) {
            reject(err);
          }
        });
      });

      req.on('error', reject);
      req.write(data);
      req.end();
    });
  }
}

