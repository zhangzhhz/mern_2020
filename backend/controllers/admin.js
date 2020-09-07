const Anime = require('../models/Anime');

exports.getIndex = async (req, res) => {
  try {
    const anime = await Anime.find();
    // console.log(anime);
    res.status(200).render('index', { anime })
  } catch (error) {
    console.error(error);
  }
};

exports.getAnime = async (req, res) => {
  try {
    const animeId = req.params.animeId;
    const anime = await Anime.findById(animeId);
    // console.log(anime);
    res.status(200).render('anime', { anime })
  } catch (error) {
    console.error(error);
  }
};

exports.getAddAnime = (req, res) => {
  res.status(200).render('edit-anime');
};

exports.postAnime = async (req, res) => {
  const { name, image, description } = req.body;

  const anime = new Anime({ name: name, image: image, description: description });
  try {
    await anime.save();
    console.log('Anime Added to the database');
    res.status(201).redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).redirect('/');
  }
};
