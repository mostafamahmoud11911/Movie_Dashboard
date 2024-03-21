import List from "../Models/List.js";
import createError from "../utils/createError.js";

// CREATE LIST
export const createList = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const newList = new List(req.body);
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "Admin only can create a new list!"));
  }
};

// UPDATE LIST
export const updateList = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const updatedList = await List.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json(updatedList);
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "Admin only can update a list!"));
  }
};


// DELETE LIST
export const deleteList = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
       await List.findByIdAndDelete(req.params.id)
      res.status(200).json('List has been deleted!');
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "Admin only can update a list!"));
  }
};


// GET ALL LISTS
export const getAllLists = async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
      if (typeQuery) {
        if (genreQuery) {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery, genre: genreQuery } },
          ]);
        } else {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: typeQuery } },
          ]);
        }
      } else {
        list = await List.aggregate([{ $sample: { size: 10 } }]);
      }
      res.status(200).json(list);
    } catch (err) {
      res.status(500).json(err);
    }
  };
