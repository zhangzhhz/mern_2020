const Anime = require('../models/Anime');

exports.getIndex = async (req, res) => {
  try {
    const anime = await Anime.find(data=>data);
    res.json(anime);
    // res.status(200).render('index', { anime })
  } catch (error) {
    console.error(error);
  }
};

exports.getAnime = async (req, res) => {
  const animeId = req.params.animeId;
  try {
    const anime = await Anime.findById(animeId);
    // console.log(anime);
    res.status(200).render('anime', { anime })
  } catch (error) {
    console.error(error);
  }
};

exports.getAddAnime = (req, res) => {
  res.status(200).render('edit-anime', { editing: false });
};

exports.getEditAnime = async (req, res) => {
  console.log(req);
  const animeId = req.params.animeId;
  const editMode = req.query.edit;

  if (!animeId) {
    return res.redirect('/');
  }
  if (!editMode) {
    return res.redirect('/');
  }

  try {
    const anime = await Anime.findById(animeId);
    console.log(anime);
    res.status(200).render('edit-anime', { anime: anime, editing: editMode });
  } catch (error) {
    console.log(error);
  }
};

exports.postAnime = async (req, res) => {
  const { name, image, description } = req.body;

  const anime = new Anime({ name: name, image: image, description: description });
  try {
    await anime.save();
    console.log('Anime Added to the database');
    // res.status(201).redirect('/');
    res.status(201).redirect('http://localhost:3000');
  } catch (error) {
    console.error(error);
    // res.status(500).redirect('/');
    res.status(500).redirect('http://localhost:3000');
  }
};

exports.postEditAnime = async (req, res) => {
  const animeId = req.body.animeId;
  const { name, image, description } = req.body;

  try {
    let anime = await Anime.findById(animeId);
    anime.name = name;
    anime.image = image;
    anime.description = description;
    await anime.save();
    console.log("Item updated");
    res.status(201).redirect('/');
  } catch (error) {
    console.error(error);
  }
};

exports.postDelete = async (req, res) => {
  const animeId = req.body.animeId;
  const anime = await Anime.findById(animeId);
  console.log(anime);
  try {
    await anime.remove();
    console.log("Item deleted");
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).redirect('/');
  }
};
