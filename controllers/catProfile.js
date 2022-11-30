const cloudinary = require("../middleware/cloudinary");
const Cat = require("../models/Cat");

module.exports = {
  getAdmin: async (req, res) => {
    try {
      const cats = await Cat.find({ user: req.user.id });
      res.render("admin.ejs", { cats: cats, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  showMenu: async (req, res) => {
    try {
      res.render("menu.ejs", { user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  addCat: async (req, res) => {
    try {
      res.render("addCat.ejs", { user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  allCats: async (req, res) => {
    try {
      const cats = await Cat.find().sort({ createdAt: "desc" }).lean();
      res.render("index.ejs", { cats: cats });
    } catch (err) {
      console.log(err);
    }
  },
  showMatches: async (req, res) => {
    try {
      const cats = await Cat.find().sort({ createdAt: "desc" }).lean();
      res.render("index.ejs", { cats: cats });
    } catch (err) {
      console.log(err);
    }
  },
  getCat: async (req, res) => {
    try {
      const cat = await Cat.findById(req.params.id);
      res.render("cat.ejs", { cat: cat, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createCat: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Cat.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/fosters");
    } catch (err) {
      console.log(err);
    }
  },
  
  deleteCat: async (req, res) => {
    try {
      // Find post by id
      let cat = await Cat.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Cat.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
