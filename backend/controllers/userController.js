import User from "../models/User.js";

export const getUsers = async (req, res) => {

  try {

    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};
export const updateUserStatus = async (req, res) => {

  try {

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(user);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};
