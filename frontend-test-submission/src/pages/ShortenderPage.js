import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";

const ShortenerPage = () => {
  const [url, setUrl] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [shortLink, setShortLink] = useState("");

  const handleShorten = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/shorturls", {
        url,
        shortcode,
        validity: 30,
      });
      setShortLink(res.data.shortLink);
    } catch (err) {
      alert("Error: " + err.response?.data?.error || err.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Shorten a URL</Typography>
      <TextField label="URL" value={url} onChange={(e) => setUrl(e.target.value)} fullWidth />
      <TextField label="Shortcode (optional)" value={shortcode} onChange={(e) => setShortcode(e.target.value)} fullWidth />
      <Button variant="contained" onClick={handleShorten}>Shorten</Button>
      {shortLink && <Typography>Shortened Link: {shortLink}</Typography>}
    </Container>
  );
};

export default ShortenerPage;
