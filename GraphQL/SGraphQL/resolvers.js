const personaModel = require("./persona");

// Resolvers
const resolvers = {
  Query: {
    mostrar: async () => {
      return await personaModel.find();
    },
  },
  Mutation: {
    createPost: async (parent, args) => {
      const newPost = new personaModel(args.post);
      return await newPost.save();
    },
    updatePost: async (parent, args) => {
      const updatedPost = await personaModel.findByIdAndUpdate(
        args.id,
        args.post,
        { new: true }
      );
      return updatedPost;
    },
    deletePost: async (parent, args) => {
      await personaModel.findByIdAndDelete(args.id);
      return "Post Deleted";
    },
  },
};

module.exports = resolvers;
