
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url || !url.includes('youtube.com/shorts')) {
    return res.status(400).json({ error: 'Invalid YouTube Shorts URL' });
  }

  try {
    // Using a proxy downloader API (placeholder)
    const apiUrl = `https://api.vevioz.com/api/button/mp3?url=${encodeURIComponent(url)}`;

    const response = await fetch(apiUrl);
    const html = await response.text();

    const match = html.match(/href="(https:\/\/[^"]+\.mp4[^"]*)"/);
    if (!match || !match[1]) {
      return res.status(400).json({ error: 'Video download link not found' });
    }

    const downloadUrl = match[1].replace(/&amp;/g, "&");
    return res.status(200).json({ downloadUrl });
  } catch (err) {
    console.error('Download error:', err);
    return res.status(500).json({ error: 'Failed to fetch download link' });
  }
}
