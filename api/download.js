export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url || !url.includes('youtube.com/shorts')) {
    return res.status(400).json({ error: 'Invalid YouTube Shorts URL' });
  }

  const encodedUrl = encodeURIComponent(url);
  const apiUrl = `https://youtube-shorts-downloader1.p.rapidapi.com/download?url=${encodedUrl}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '45e5a53a7dmshff265f1aac87f9bp131b90jsn0d6ab0da2ff4,
        'X-RapidAPI-Host': 'youtube-shorts-downloader1.p.rapidapi.com'
      }
    });

    const data = await response.json();

    if (!data.download || !data.download.url) {
      return res.status(400).json({ error: 'Video download link not found' });
    }

    return res.status(200).json({ downloadUrl: data.download.url });
  } catch (err) {
    console.error('Download error:', err);
    return res.status(500).json({ error: 'Failed to fetch download link' });
  }
}
