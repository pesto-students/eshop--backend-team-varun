export const getAllProducts = (req, res, next) => {
  console.log("inside productController");
  res.status(200).json({ message: "route working fine." });
};
